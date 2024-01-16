const axios = require('axios');

let disablujDugme = (dugme) => {
    document.getElementById(dugme).style.pointerEvents = "none";
    document.getElementById(dugme).style.background = "rgb(242, 242, 242)";
    document.getElementById(dugme).style.border = "rgb(242, 242, 242)";
    document.getElementById(dugme).style.color = "black";
}

let setValue = (element,value) => {
    document.getElementById(element).innerHTML = value;
}

let setImage = (element) => {
    document.getElementById(element).setAttribute("src","/radio.png");   
}

document.addEventListener('DOMContentLoaded', () => {

//Ocitavanje stalno ukupnog napona i spoljsnje temperature
setInterval(()=>{
    axios.get('http://10.13.204.3:8080/state').then(function(result){
            
            //Sis. ocitavanje
            setValue('spoljasnjaTemp','spoljasnja_temp');

            //Ormani Provera
            result.data["ospoljasnjaTempUorm"] < -270 ? setValue('spoljasnjaTempUorm','') : setValue('spoljasnjaTempUorm','ospoljasnjaTempUorm');
            result.data["otestMer"] < -270 ? etValue('testMer','') : setValue('testMer','otestMer');
        
            //Gornja, donja
            setValue('outGornjaT',result.data["oGornja"]);
            setValue('outDonjaT',result.data["oDonja"]);
            setValue('outHist',result.data["oHist"]);
            setValue('outSat',result.data["oSat"]);
            setValue('outRadMin',result.data["oRadMin"]);

            //Napon123
            setValue('oNap1',result.data["napongrejaca_1"]);
            setValue('oNap2',result.data["napongrejaca_2"]);
            setValue('oNap3',result.data["napongrejaca_3"]);
            
        
        }).catch(function(error){
            console.log(error);
        });
    },1000);

setInterval(()=>{
axios.get('http://10.13.204.3:8080/state').then(function (result) {
    
    //Grejac 1
    if(result.data['strujagrejaca_1st'] == 1){  //U upotrebi
        setValue('statusGrejaca1','U upotrebi');
        setImage('imgPlace1');
        setValue('nnv1',result.data["oNom1"]);
        setValue('strujagrejaca1',result.data["strujagrejaca_1"]);
        setValue('napongrejaca1',result.data["napongrejaca_1"]);
    
    if(result.data['strujagrejaca_1stA'] == 1){ //Rucno | Automacki
        setValue('rezimGrejaca1','Auto');
        disablujDugme("btnRucI1");
        disablujDugme("btnRucU1");
        
    }else if(result.data['strujagrejaca_1stA'] == 0){
        setValue('rezimGrejaca1','Rucno');
    }

    if(result.data['strujagrejaca_1rucno'] == 1){ //Ukljucena rucno
        setValue('stanjeGrejaca1','Ukljucen');
    }else if(result.data['strujagrejaca_1rucno'] == 0){
        setValue('stanjeGrejaca1','Iskljucen');
    }

    }else if(result.data['strujagrejaca_1st'] == 0){
        setValue('statusGrejaca1','');
        setValue('rezimGrejaca1','');
        setValue('stanjeGrejaca1','');
        setValue('strujagrejaca1','');
        setValue('napongrejaca1','');
        setValue('nnv1','');
    }

    //Grejac 2
    if(result.data['strujagrejaca_2st'] == 1){  //U upotrebi
        setValue('statusGrejaca2','U upotrebi');
        setImage('imgPlace2');
        setValue('nnv2',result.data["oNom2"]);
        setValue('strujagrejaca2',result.data["strujagrejaca_2"]);
        setValue('napongrejaca2',result.data["napongrejaca_2"]);

    if(result.data['strujagrejaca_2stA'] == 1){ //Rucno / Automacki
        setValue('rezimGrejaca2','Auto');
        disablujDugme("btnRucI2");
        disablujDugme("btnRucU2");
        
    }else if(result.data['strujagrejaca_2stA'] == 0){
        setValue('rezimGrejaca2','Rucno');
    }

    if(result.data['strujagrejaca_2rucno'] == 1){ //Ukljucena rucno
        setValue('stanjeGrejaca2','Ukljucen');
    }else if(result.data['strujagrejaca_2rucno'] == 0){
        setValue('stanjeGrejaca2','Iskljucen');
    }
    
    }else if(result.data['strujagrejaca_2st'] == 0){
        setValue('statusGrejaca2','Nije u upotrebi');
        setValue('rezimGrejaca2','');
        setValue('stanjeGrejaca2','');
        setValue('strujagrejaca2','');
        setValue('napongrejaca2','');
        setValue('nnv2','');
    }

    //Grejac 3
    if(result.data['strujagrejaca_3st'] == 1){  //U upotrebi
        setValue('statusGrejaca3','U upotrebi');
        setImage('imgPlace3')
        setValue('nnv3',result.data["oNom3"]);
        setValue('strujagrejaca3',result.data["strujagrejaca_3"]);
        setValue('napongrejaca3',result.data["napongrejaca_3"]);

    if(result.data['strujagrejaca_3stA'] == 1){ //Rucno / Automacki
        setValue('rezimGrejaca3','Auto');
        disablujDugme("btnRucI3");
        disablujDugme("btnRucU3");
        
    }else if(result.data['strujagrejaca_3stA'] == 0){
        setValue('rezimGrejaca3','Rucno');
    }

    if(result.data['strujagrejaca_3rucno'] == 1){ //Ukljucena rucno
        setValue('stanjeGrejaca3','Ukljucen');
    }else if(result.data['strujagrejaca_3rucno'] == 0){
        setValue('stanjeGrejaca3','Iskljucen');
    }
    
    }else if(result.data['strujagrejaca_3st'] == 0){
        setValue('statusGrejaca3','Nije u upotrebi');
        setValue('rezimGrejaca3','');
        setValue('stanjeGrejaca3','');
        setValue('strujagrejaca3','');
        setValue('napongrejaca3','');
        setValue('nnv3','');
    }

    //Grejac 4
    if(result.data['strujagrejaca_4st'] == 1){  //U upotrebi
        setValue('statusGrejaca4','U upotrebi');
        setImage('imgPlace4');
        setValue('nnv4',result.data["oNom4"]);
        setValue('strujagrejaca4',result.data["strujagrejaca_4"]);
        setValue('napongrejaca4',result.data["napongrejaca_4"]);

    if(result.data['strujagrejaca_4stA'] == 1){ //Rucno / Automacki
        setValue('rezimGrejaca4','Auto');
        disablujDugme("btnRucI4");
        disablujDugme("btnRucU4");
        
    }else if(result.data['strujagrejaca_4stA'] == 0){
        setValue('rezimGrejaca4','Rucno');
    }

    if(result.data['strujagrejaca_4rucno'] == 1){ //Ukljuceno rucno 
        setValue('stanjeGrejaca4','Ukljucen');
    }else if(result.data['strujagrejaca_4rucno'] == 0){
        setValue('stanjeGrejaca4','Iskljucen');
    }
    
    }else if(result.data['strujagrejaca_4st'] == 0){
        setValue('statusGrejaca4','Nije u upotrebi');
        setValue('rezimGrejaca4','');
        setValue('stanjeGrejaca4','');
        setValue('strujagrejaca4','');
        setValue('napongrejaca4','');
        setValue('nnv4','');
    }

    //Grejac 5
    if(result.data['strujagrejaca_5st'] == 1){  //U upotrebi
        setValue('statusGrejaca5','U upotrebi');
        setImage('imgPlace5');
        setValue('nnv5',result.data["oNom5"]);
        setValue('strujagrejaca5',result.data["strujagrejaca_5"]);
        setValue('napongrejaca5',result.data["napongrejaca_5"]);

    if(result.data['strujagrejaca_5stA'] == 1){ //Rucno / Automacki
        setValue('rezimGrejaca5','Auto');
        disablujDugme("btnRucI5");
        disablujDugme("btnRucU5");
        
    }else if(result.data['strujagrejaca_5stA'] == 0){
        setValue('rezimGrejaca5','Rucno');
    }

    if(result.data['strujagrejaca_5rucno'] == 1){ //Ukljuceno rucno
        setValue('stanjeGrejaca5','Ukljucen');
    }else if(result.data['strujagrejaca_5rucno'] == 0){
        setValue('stanjeGrejaca5','Iskljucen');
    }
    
    }else if(result.data['strujagrejaca_5st'] == 0){
        setValue('statusGrejaca5','Nije u upotrebi');
        setValue('rezimGrejaca5','');
        setValue('stanjeGrejaca5','');
        setValue('strujagrejaca5','');
        setValue('napongrejaca5','');
        setValue('nnv5','');
    }

}).catch(function (error) {
    console.error(error);
});
},1000);
})
