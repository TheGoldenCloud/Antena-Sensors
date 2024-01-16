const fs = require('fs');
const crypto = require('crypto');

function getLoggedInUser(req){
    if (req.session.user){
        return req.session.user;
    } else {
        return undefined;
    }
}

function getPasswordHash(password) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

function loadConfiguredUsers(configPath) {
    try {
        fs.accessSync(configPath);

        return JSON.parse(fs.readFileSync(configPath));
    } catch (err) {
        var defaultUsers = [{
            "name":"Admin",
            "lastname":"Admin",
            "username":"Admin",
            "password":"Admin123"
        }];

        fs.writeFileSync(configPath, JSON.stringify(defaultUsers));

        return defaultUsers;
    }
}

function loadAlarms(configPath) {   
    fs.accessSync(configPath);
    return JSON.parse(fs.readFileSync(configPath));
    
}

function saveConfiguredEmails(configPath, users){
    var emails = '';
    for (var user of users){
        if (user.email){
            if (user.email.trim() !== ''){
                emails += ' ' + user.email.trim();
            }
        }
    }
    emails = emails.trim();

    fs.writeFileSync(configPath, emails);
}

function saveConfiguredUsers(configPath, users) {
    var userlist = [];
    for (var user of users){
        userlist.push({username: user.username, email: user.email, password: user.password});
    }

    saveConfiguredEmails('./users/allusers.txt', userlist);

    fs.writeFileSync(configPath, JSON.stringify(userlist));
}

function getSystemStateFromStdout(stdout){
    var state = {time: new Date().toString()};
    var parts = stdout.split('\n')

    //Uzimanje float vrednosti grejaca
    var temp_state = {}
    for (var line of parts) {
        if (line.trim() != '' && line.trim() != '\r\n' && line.trim() != '\n') {
            temp_state[line.split('Idx=')[1].split('Stat=')[0].trim()] = line.split('fVal=')[1].split('=')[0].trim() //Prebaci projekat na uredjaj i vidi podatke
        }
    }

    //Uzimanje stanja grejaca
    var temp_state1 = {}
    for (var line of parts) {
        if (line.trim() != '' && line.trim() != '\r\n' && line.trim() != '\n') {
            temp_state1[line.split('Idx=')[1].split('Stat=')[0].trim()] = line.split('Val=')[1].split('=')[0].trim() //Prebaci projekat na uredjaj i vidi podatke
        }
    }

    state['raw_data'] = stdout

    // Spoljasnja temp
    state['spoljasnja_temp'] = temp_state['10024'].split(".")[0] + "." + temp_state['10024'].split(".")[1].slice(0,1);    //Na jednoj decimali
    
    //Updejtuj fildove, pitaj Ogija
    state['ospoljasnjaTempUorm'] = temp_state['10041'].split(".")[0] + "." + temp_state['10041'].split(".")[1].slice(0,1);
    state['otestMer'] = temp_state['10025'].split(".")[0] + "." + temp_state['10025'].split(".")[1].slice(0,1);
    
    //Struja grejaca ocitavanje na ekranu
    state['strujagrejaca_1'] = temp_state['10000'].split(".")[0] + "." + temp_state['10000'].split(".")[1].slice(0,2);    //Na dve decimale
    state['strujagrejaca_2'] = temp_state['10001'].split(".")[0] + "." + temp_state['10001'].split(".")[1].slice(0,2);
    state['strujagrejaca_3'] = temp_state['10002'].split(".")[0] + "." + temp_state['10002'].split(".")[1].slice(0,2);

    state['strujagrejaca_4'] = temp_state['10006'].split(".")[0] + "." + temp_state['10006'].split(".")[1].slice(0,2);
    state['strujagrejaca_5'] = temp_state['10007'].split(".")[0] + "." + temp_state['10007'].split(".")[1].slice(0,2);
    state['strujagrejaca_6'] = temp_state['10008'].split(".")[0] + "." + temp_state['10008'].split(".")[1].slice(0,2);

    state['strujagrejaca_7'] = temp_state['10012'].split(".")[0] + "." + temp_state['10012'].split(".")[1].slice(0,2);
    state['strujagrejaca_8'] = temp_state['10013'].split(".")[0] + "." + temp_state['10013'].split(".")[1].slice(0,2);
    state['strujagrejaca_9'] = temp_state['10014'].split(".")[0] + "." + temp_state['10014'].split(".")[1].slice(0,2);

    state['strujagrejaca_10'] = temp_state['10018'].split(".")[0] + "." + temp_state['10018'].split(".")[1].slice(0,2);
    state['strujagrejaca_11'] = temp_state['10019'].split(".")[0] + "." + temp_state['10019'].split(".")[1].slice(0,2);
    state['strujagrejaca_12'] = temp_state['10020'].split(".")[0] + "." + temp_state['10020'].split(".")[1].slice(0,2);  

    //Struja grejaca stanje
    state['strujagrejaca_1st'] = temp_state1['6478']    //Ili 6480
    
    state['strujagrejaca_2'] = temp_state['10001'].split(".")[0] + "." + temp_state['10001'].split(".")[1].slice(0,2);
    state['strujagrejaca_3'] = temp_state['10002'].split(".")[0] + "." + temp_state['10002'].split(".")[1].slice(0,2);

    state['strujagrejaca_4'] = temp_state['10006'].split(".")[0] + "." + temp_state['10006'].split(".")[1].slice(0,2);
    state['strujagrejaca_5'] = temp_state['10007'].split(".")[0] + "." + temp_state['10007'].split(".")[1].slice(0,2);
    state['strujagrejaca_6'] = temp_state['10008'].split(".")[0] + "." + temp_state['10008'].split(".")[1].slice(0,2);

    state['strujagrejaca_7'] = temp_state['10012'].split(".")[0] + "." + temp_state['10012'].split(".")[1].slice(0,2);
    state['strujagrejaca_8'] = temp_state['10013'].split(".")[0] + "." + temp_state['10013'].split(".")[1].slice(0,2);
    state['strujagrejaca_9'] = temp_state['10014'].split(".")[0] + "." + temp_state['10014'].split(".")[1].slice(0,2);

    state['strujagrejaca_10'] = temp_state['10018'].split(".")[0] + "." + temp_state['10018'].split(".")[1].slice(0,2);
    state['strujagrejaca_11'] = temp_state['10019'].split(".")[0] + "." + temp_state['10019'].split(".")[1].slice(0,2);
    state['strujagrejaca_12'] = temp_state['10020'].split(".")[0] + "." + temp_state['10020'].split(".")[1].slice(0,2); 
    
    //Napon sistema citanje
    let n1 = Number(temp_state['10003'].split(".")[0]) + Number(temp_state['10004'].split(".")[0]) + Number(temp_state['10005'].split(".")[0]);
    let n2 = Number(temp_state['10009'].split(".")[0]) + Number(temp_state['10010'].split(".")[0]) + Number(temp_state['10011'].split(".")[0]);
    let n3 = Number(temp_state['10015'].split(".")[0]) + Number(temp_state['10016'].split(".")[0]) + Number(temp_state['10017'].split(".")[0]);
    let n4 = Number(temp_state['10021'].split(".")[0]) + Number(temp_state['10022'].split(".")[0]) + Number(temp_state['10023'].split(".")[0]);
    let skupnapona = n1 + n2 + n3 + n4

    state['napon_sistema'] = skupnapona.toString(); //Ceo broj

    //Napon grejaca citanje
    state['napongrejaca_1'] = temp_state['10003'].split(".")[0];
    state['napongrejaca_2'] = temp_state['10004'].split(".")[0];
    state['napongrejaca_3'] = temp_state['10005'].split(".")[0];

    state['napongrejaca_4'] = temp_state['10009'].split(".")[0];
    state['napongrejaca_5'] = temp_state['10010'].split(".")[0];
    state['napongrejaca_6'] = temp_state['10011'].split(".")[0];

    state['napongrejaca_7'] = temp_state['10015'].split(".")[0];
    state['napongrejaca_8'] = temp_state['10016'].split(".")[0];
    state['napongrejaca_9'] = temp_state['10017'].split(".")[0];

    state['napongrejaca_10'] = temp_state['10021'].split(".")[0];
    state['napongrejaca_11'] = temp_state['10022'].split(".")[0];
    state['napongrejaca_12'] = temp_state['10023'].split(".")[0];


    //Struja u upotrebi
    state['strujagrejaca_1st'] = temp_state1['6478']
    state['strujagrejaca_2st'] = temp_state1['6486']
    state['strujagrejaca_3st'] = temp_state1['6494']
    state['strujagrejaca_4st'] = temp_state1['6502']

    state['strujagrejaca_5st'] = temp_state1['6510']
    state['strujagrejaca_6st'] = temp_state1['6518']
    state['strujagrejaca_7st'] = temp_state1['6526']
    state['strujagrejaca_8st'] = temp_state1['6534']
    state['strujagrejaca_9st'] = temp_state1['6542']
    state['strujagrejaca_10st'] = temp_state1['6550']
    state['strujagrejaca_11st'] = temp_state1['6558']
    state['strujagrejaca_12st'] = temp_state1['6566']


    //Struja ukljuceno rucno
    state['strujagrejaca_1rucno'] = temp_state1['6480']
    state['strujagrejaca_2rucno'] = temp_state1['6488']
    state['strujagrejaca_3rucno'] = temp_state1['6496']
    state['strujagrejaca_4rucno'] = temp_state1['6504']

    state['strujagrejaca_5rucno'] = temp_state1['6512']
    state['strujagrejaca_6rucno'] = temp_state1['6520']
    state['strujagrejaca_7rucno'] = temp_state1['6528']
    state['strujagrejaca_8rucno'] = temp_state1['6536']
    state['strujagrejaca_9rucno'] = temp_state1['6544']
    state['strujagrejaca_10rucno'] = temp_state1['6552']
    state['strujagrejaca_11rucno'] = temp_state1['6560']
    state['strujagrejaca_12rucno'] = temp_state1['6568']


    //Struja stanje Automacki / Rucno
    state['strujagrejaca_1stA'] = temp_state1['6479']
    state['strujagrejaca_2stA'] = temp_state1['6487']
    state['strujagrejaca_3stA'] = temp_state1['6495']
    state['strujagrejaca_4stA'] = temp_state1['6503']

    state['strujagrejaca_5stA'] = temp_state1['6511']
    state['strujagrejaca_6stA'] = temp_state1['6519']
    state['strujagrejaca_7stA'] = temp_state1['6527']
    state['strujagrejaca_8stA'] = temp_state1['6535']
    state['strujagrejaca_9stA'] = temp_state1['6543']
    state['strujagrejaca_10stA'] = temp_state1['6551']
    state['strujagrejaca_11stA'] = temp_state1['6559']
    state['strujagrejaca_12stA'] = temp_state1['6502']

    //Ocitavanja Hist, donja, gornja...
    state['oHist'] = temp_state['10026'].split(".")[0] + "." + temp_state['10026'].split(".")[1].slice(0,1);
    state['oGornja'] = temp_state['10027'].split(".")[0] + "." + temp_state['10027'].split(".")[1].slice(0,1);
    state['oDonja'] = temp_state['10028'].split(".")[0] + "." + temp_state['10028'].split(".")[1].slice(0,1);

    state['oSat'] = temp_state1['6577'];
    state['oRadMin'] = temp_state1['6578'];
    
    //Nominalne struje
    state['oNom1'] = temp_state['10029'].split(".")[0] + "." + temp_state['10029'].split(".")[1].slice(0,2);    //Na dve decimale
    state['oNom2'] = temp_state['10030'].split(".")[0] + "." + temp_state['10030'].split(".")[1].slice(0,2);
    state['oNom3'] = temp_state['10031'].split(".")[0] + "." + temp_state['10031'].split(".")[1].slice(0,2);

    state['oNom4'] = temp_state['10032'].split(".")[0] + "." + temp_state['10032'].split(".")[1].slice(0,2);
    state['oNom5'] = temp_state['10033'].split(".")[0] + "." + temp_state['10033'].split(".")[1].slice(0,2);
    state['oNom6'] = temp_state['10034'].split(".")[0] + "." + temp_state['10034'].split(".")[1].slice(0,2);

    state['oNom7'] = temp_state['10035'].split(".")[0] + "." + temp_state['10035'].split(".")[1].slice(0,2);
    state['oNom8'] = temp_state['10036'].split(".")[0] + "." + temp_state['10036'].split(".")[1].slice(0,2);
    state['oNom9'] = temp_state['10037'].split(".")[0] + "." + temp_state['10037'].split(".")[1].slice(0,2);

    state['oNom10'] = temp_state['10038'].split(".")[0] + "." + temp_state['10038'].split(".")[1].slice(0,2);
    state['oNom11'] = temp_state['10039'].split(".")[0] + "." + temp_state['10039'].split(".")[1].slice(0,2);
    state['oNom12'] = temp_state['10040'].split(".")[0] + "." + temp_state['10040'].split(".")[1].slice(0,2);  

    
    //Alarmi
    //PROVERI PONOVO PREVENTIVNO I ODRADI SISTEMSKE ALARME
    state['AlarmiGreskeIsklj'] = [temp_state1['6482'],temp_state1['6490'],temp_state1['6498'],temp_state1['6506'],temp_state1['6514'],temp_state1['6522'],temp_state1['6530'],temp_state1['6538'],temp_state1['6546'],temp_state1['6554'],temp_state1['6562'],temp_state1['6570']]
    state['AlarmiGreskeUradu'] = [temp_state1['6481'],temp_state1['6489'],temp_state1['6497'],temp_state1['6505'],temp_state1['6513'],temp_state1['6521'],temp_state1['6529'],temp_state1['6537'],temp_state1['6545'],temp_state1['6553'],temp_state1['6561'],temp_state1['6569']]
    
    //Sistemski alarmi
    state['AlarmGrejacist'] = temp_state1['6579'];
    state['AlarmGrejacinap'] = temp_state1['6580'];
    state['AlarmGrejacigreskaSis'] = temp_state1['6581'];


    return state
}

function is_set(x, n) {
    return (((x>>n) % 2 != 0) ? 1 : 0);
}

module.exports = { getLoggedInUser, loadConfiguredUsers, saveConfiguredEmails, getPasswordHash, getSystemStateFromStdout }
