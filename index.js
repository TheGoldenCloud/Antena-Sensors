const express = require('express');
const session = require('express-session');
const func = require('./functions.js');
const body_parser = require('body-parser');
const exec = require('child_process').exec;
const fs = require('fs');
const app = express();
const PORT = 8080;

app.use(session({
    'cookie': {
        'path': '/',
        'secure': false,
        'httpOnly': false,
        'maxAge': null
    },
    'secret': 'as!j*hbfgb124/assdghyg!',
    'resave': false,
    'saveUninitialized': true
}))

var users = [];
var alarmsH = [];
var systemState = {"time": new Date().toString()}

// app.use(body_parser.json())
app.use(express.urlencoded({extended: false}));
app.use(body_parser.json())
app.use(body_parser.urlencoded({'extended': true}))
app.use(express.static('styles'))   //Staticke slike

app.get('/login',(req,res)=>{
    let user = func.getLoggedInUser(req);
    if (user) {
        res.sendFile(__dirname + '/public/antene.html');
    } else {       
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/',(req,res)=>{
    let user = func.getLoggedInUser(req);
    if (user) {
        res.sendFile(__dirname + '/public/antene.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/antene', (req, res) => {
    let user = func.getLoggedInUser(req);
    if (user) {
        res.sendFile(__dirname + '/public/antene.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/korisnici', (req, res) => {
    let user = func.getLoggedInUser(req);
    if (user) {
        res.sendFile(__dirname + '/public/korisnici.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/odjava', (req, res) => {
    req.session.destroy();
    res.sendFile(__dirname + '/public/login.html');
})

app.get('/alarmi', (req, res) => {
    let user = func.getLoggedInUser(req);
    if (user) {
        res.sendFile(__dirname + '/public/alarmi.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.post('/login',(req,res)=>{
    let username_ = req.body.username_input;
    // let pass_ = func.getPasswordHash(req.body.pass_input);
    let pass_ = req.body.pass_input;

    // let temp_user = users.find(x => x.username == username_ && x.password == func.getPasswordHash(req.body.pass_input));
    let temp_user = users.find(x => x.username == username_ && x.password == pass_);  //req.body.pass_input
    req.session.user = username_;   //Saving user to session storage

    if(temp_user == undefined){
        res.sendFile(__dirname + '/public/login.html');
    }else{
        res.sendFile(__dirname + '/public/antene.html');
    }
    
})

app.get('/get_users', (req, res) => {
    var user = func.getLoggedInUser(req);
    if (user) {
        var userlist = [];
        for (var userpass of users){
            if (userpass.username !== 'Admin')
            userlist.push(userpass);
        }
        res.header("c", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(userlist);
    } else {
        res.sendFile(__dirname + '/public/login.html')
    }
})

app.get('/alarmsHistory', (req, res) => {
    
    alarmsH = func.loadAlarms("./users/alarms.json");
})

app.post('/save_users', (req, res) => {
    var user = func.getLoggedInUser(req);
    if (user) {
        var userlist = req.body.userlist;
        func.saveConfiguredUsers("./users/allusers.json", userlist);    //Relativna putanja...
        users = func.loadConfiguredUsers("./users/allusers.json");
        res.sendFile(__dirname + '/public/korisnici.html')
    } else {
        res.sendFile(__dirname + '/public/login.html')
    }
})


app.post('/delete_user', (req, res) => {
    var user = func.getLoggedInUser(req);
    if (user) {
        let deletedUser = req.body.usertodelete;

        let leftusers = users.filter(x => x.username != deletedUser.username);

        func.saveConfiguredUsers("./users/allusers.json", leftusers);
        users = func.loadConfiguredUsers("./users/allusers.json");
        res.sendFile(__dirname + '/public/korisnici.html');

    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/state', (req, res) => {
    var user = func.getLoggedInUser(req);
    if (user) {
        res.json(systemState)
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/monitor/write/:field/:value', (req, res) => {
    var user = func.getLoggedInUser(req);
     //var status = 5;
     //if (req.query.status) {
      //   status = req.query.status;
    // }
     if (user) {
        var subprocess = exec("/opt/IMP-RTU/bin/field_set -b " + req.params.field + " -s " + 1 + " -v " + req.params.value, (error, stdout, stderr) => {

        });
 
     subprocess.on('exit', (code) => {
        subprocess.kill();
     });
         res.sendFile(__dirname + '/public/antene.html')
     } else {
         res.sendFile(__dirname + '/public/login.html')
     }
})

app.get('/monitor/write_r/:field/:value', (req, res) => {
    var user = func.getLoggedInUser(req);
     //var status = 5;
     //if (req.query.status) {
      //   status = req.query.status;
    // }
     if (user) {
        var subprocess = exec("/opt/IMP-RTU/bin/field_set -b " + req.params.field + " -s " + 1 +" -d -v " + req.params.value, (error, stdout, stderr) => {
            console.log(req.params.field)
            console.log(req.params.value)
        });
 
     subprocess.on('exit', (code) => {
        subprocess.kill();
     });
         res.sendFile(__dirname + '/public/antene.html')
     } else {
         res.sendFile(__dirname + '/public/login.html')
     }
})


app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT);

    users = func.loadConfiguredUsers('./users/allusers.json');

    //Sa uredjaja
    setInterval(function() {
        var subprocess1 = exec("/opt/IMP-RTU/bin/proba_get_area -b 10000 -e 10042 -s 1 -t 1;/opt/IMP-RTU/bin/proba_get_area -b 6478 -e 6582 -s 1 -t 1;", (error, stdout, stderr) => {
            systemState = func.getSystemStateFromStdout('' + stdout);

            var alarmX = systemState['Alarm - Nestanak napona 10kV'];

            var sub_subprocess = exec("/opt/IMP-RTU/bin/field_set -b 1117 -e 1118 -v "+alarmX+" -s 1");
            //var sub_subprocess = exec("/opt/IMP-RTU/bin/proba_get_area -b 6475 -e 6478 -s 1 -t 1;");
        sub_subprocess.on('exit', (code) => {sub_subprocess.kill();});
        });
    //subprocess1.on('exit', (code) => {subprocess.kill();});
    }, 1000);
});

/*app.get('/monitor/write/:field/:value', (req, res) => { //VIDI PARAMETRE I NASTAVI DALJE!!!
    var user = func.getLoggedInUser(req);
     //var status = 5;
     //if (req.query.status) {
      //   status = req.query.status;
    // }
     if (user) {
 
         var subprocess = exec("/opt/IMP-RTU/bin/field_set -b " + req.params.field + " -s " + 1 + " -v " + req.params.value, (error, stdout, stderr) => {
                 console.log(req.params.field)
                 console.log(req.params.value)
         });
 
     //subprocess.on('exit', (code) => {
       //  subprocess.kill();
     //});
 
         res.sendFile(__dirname + '/public/antene.html')
     } else {
         res.sendFile(__dirname + '/public/login.html')
     }
 })*/