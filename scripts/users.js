
var userlist = [];

axios.get('/get_users', {timeout: 10000}).then(function (result) {
    let users = result.data;
    let el = document.getElementById('userlist');
    let html = '<table id="userTable" class="table" style="width:100%">' +
        '<thead>' +
        '<tr>' +
        '<th>Br</th>' +
        '<th>Korisnik</th>' +
        '<th>Email</th>' +
        '<th>Lozinka</th>' +
        '<th></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';
    let index = 0;
    for (let user of users) {
        index++;
        userlist.push(user);
        html += '<tr>' +
            '<td>'+index+'</td>' +
            '<td><input class="input" type="text" placeholder="korisničko ime" old_username="' + user.username + '" value="' + user.username + '"></td>' +
            '<td><input class="input" type="email" placeholder="email" value="' + user.email.replaceAll(' ', ', ') + '"></td>' +
            '<td class="is-flex is-flex-direction-row is-justify-content-end is-align-content-center"><input class="input" type="password" placeholder="neizmenjena" old_password="' + user.password + '"><input class="input" type="password" placeholder="neizmenjena"></td>' +
        '<td><div class="is-flex is-flex-direction-row is-justify-content-end is-align-content-center"><button class="btn btn-danger" onclick="removeUser(this)">Obriši</button></div></td>' +
        '</tr>'
    }
    html += '<tr id="newUserRow" user_count="'+index+'"><td colspan="5"><button style="width: 100%" class="btn btn-primary" onclick="addNewUser()">+ Novi korisnik</button></td></tr>' +
        '<tr><td colspan="5"><button style="width: 100%" class="btn btn-success" onclick="saveState()">Sačuvaj promene</button></td></tr>' +
        '<tr><td colspan="5"><a href="/monitor/write/15999/1?status=1"><button style="width: 100%" class="button is-info" onclick="areYouSure(event, \'Test email-a\')">Pošalji test email</button></a></td></tr>' +
        '</tbody></table>';
    el.innerHTML = html;
}).catch(function (err) {
    alert('Greska pri ucitavanju korisnika zbog lose konekcije, pokusajte kasnije!');
});

function areYouSure(event, operation) {
    let confirmation = confirm('Kliknuli ste na dugme ' + operation + ', želite li da nastavite?');
    if (confirmation) {
        confirmation = confirm('Da li ste sigurni da želite izvšiti operaciju ' + operation + '?');
    }
    if (!confirmation) {
        event.preventDefault();
    }
}

function removeUser(clickedBtn) {
    let confirmation = confirm("Da li ste sigurni da želite obrisati odabranog korisnika?");

    if (confirmation) {
        let userRow = clickedBtn.parentNode.parentNode.parentNode;
        let sibling = userRow.nextElementSibling;
        let usename,pass;
        while (sibling != null){
            if (sibling.id === 'newUserRow'){
                sibling.setAttribute('user_count', '' + (Number(sibling.getAttribute('user_count')) - 1));
                sibling = null;
            } else {
                sibling.getElementsByTagName('td')[0].innerText = "" + (Number(sibling.getElementsByTagName('td')[0].innerText) - 1);
                sibling = sibling.nextElementSibling;
            }
        }

        //Uzimanje uzer podataka
        let usernameDel = userRow.childNodes[1].childNodes[0].getAttribute('old_username');
        let passDel = userRow.childNodes[3].childNodes[0].getAttribute('old_password')

        let usertodelete = {username: usernameDel, password: passDel};

        axios.post('/delete_user', {usertodelete}, {timeout: 1000}).then(function (result) {
            window.location.reload();
        }).catch(function (err) {
            alert('Greska pri brisnju! Molimo pokusajte ponovo kasnije!');
        });

        //
        userRow.remove();
    }
}

function addNewUser() {
    let lastRow = document.getElementById('newUserRow');
    let index = Number(lastRow.getAttribute('user_count')) + 1;
    lastRow.setAttribute('user_count', index);

    let el = document.createElement('tr');
    el.innerHTML = '<td>'+index+'</td><td><input class="input" type="text" placeholder="korisničko ime"></td>' +
        '<td><input class="input" type="email" placeholder="email"></td>' +
        '<td class="is-flex is-flex-direction-row is-justify-content-end is-align-content-center"><input class="input" type="password" placeholder="lozinka"> <input class="input" type="password" placeholder="ponovljena lozinka"></td>' +
        '<td><div class="is-flex is-flex-direction-row is-justify-content-end is-align-content-center"><button class="btn btn-danger" onclick="removeUser(this)">Obriši</button></div></td>';

    lastRow.parentNode.insertBefore(el, lastRow);
}

function saveState() {
    let el = document.getElementById('userTable');

    let local_userlist = [];

    let error = undefined;
    let index = 0;
    let len = el.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
    for (let userRow of el.getElementsByTagName('tbody')[0].getElementsByTagName('tr')) {
        index++;
        if (index <= len - 3){
            let username = userRow.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value.trim();
            let email = userRow.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value.trim().replaceAll(', ', ' ').replaceAll(',', ' ').trim();
            let password = userRow.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value.trim();
            let is_old = userRow.getElementsByTagName('td')[3].getElementsByTagName('input')[0].hasAttribute('old_password');
            let old_username = undefined;
            let old_password = undefined;

            while (email.includes('  ')){
                email = email.replaceAll('  ', ' ');
            }

            // Ako user nema username - error
            if (username === ''){
                // ERROR
                error = 'Greška! Korisnik br. ' + index + ' mora imati korisničko ime!';
                break;
            }

            if (is_old){
                old_username = userRow.getElementsByTagName('td')[1].getElementsByTagName('input')[0].getAttribute('old_username');
                old_password = userRow.getElementsByTagName('td')[3].getElementsByTagName('input')[0].getAttribute('old_password');
            }

            // Ako user nema password proveri da li je samo ne promenjena
            if (password === ''){
                if (is_old){
                    password = old_password;
                }
            } else {
                // 
                if (password !== userRow.getElementsByTagName('td')[3].getElementsByTagName('input')[1].value.trim()){
                    // ERROR
                    error = 'Greška! Korisnik br. ' + index + ' ima lozinke koje se razlikuju!';
                    break;
                }
            }

            // I dalje nema password
            if (password === ''){
                // ERROR
                error = 'Greška! Korisnik br. ' + index + ' mora imati lozinku!';
                break;
            }

            local_userlist.push({username: username, password: password, email: email, is_old: is_old, old_username: old_username, old_password: old_password});
        }
    }

    if (error){
        alert(error);
    } else {
        axios.post('/save_users', {userlist: local_userlist}, {timeout: 10000}).then(function (result) {
            window.location.reload();
        }).catch(function (err) {
            alert('Greska pri cuvanju! Molimo pokusajte ponovo kasnije!');
        });
    }
}

