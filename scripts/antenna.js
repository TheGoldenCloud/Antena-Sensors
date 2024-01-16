const axios = require('axios');

let disablujDugme = (dugme) => {
    document.getElementById(dugme).style.pointerEvents = "none"
    document.getElementById(dugme).style.background = "rgb(242, 242, 242)"
    document.getElementById(dugme).style.border = "rgb(242, 242, 242)"
    document.getElementById(dugme).style.color = "black"
}

let setValue = (element,value) => {
    document.getElementById(element).innerHTML = value;
}

document.addEventListener('DOMContentLoaded', () => {

//Ocitavanje stalno ukupnog napona i spoljsnje temperature
setInterval(()=>{
    axios.get('http://10.13.204.3:8080/state').then(function(result){
            
            //Sis. ocitavanje
            setValue('spoljasnjaTemp','spoljasnja_temp');

            //Ormani/Proveri
            if(result.data["ospoljasnjaTempUorm"] < -270){
                setValue('spoljasnjaTempUorm','');
            }else{
                setValue('spoljasnjaTempUorm','ospoljasnjaTempUorm');
            }

            if(result.data["otestMer"] < -270){
                setValue('spoljasnjaTempUorm','');
            document.getElementById('testMer').innerHTML = '';
            }else{
                setValue('spoljasnjaTempUorm','');
            document.getElementById('testMer').innerHTML = result.data["otestMer"];
            }
            
            

            //Gornja, donja
            document.getElementById('outGornjaT').innerHTML = result.data["oGornja"];
            document.getElementById('outDonjaT').innerHTML = result.data["oDonja"];
            document.getElementById('outHist').innerHTML = result.data["oHist"];

            document.getElementById('outSat').innerHTML = result.data["oSat"];
            document.getElementById('outRadMin').innerHTML = result.data["oRadMin"];

            //Napon123
            document.getElementById("oNap1").innerHTML = result.data["napongrejaca_1"];
            document.getElementById("oNap2").innerHTML = result.data["napongrejaca_2"];
            document.getElementById("oNap3").innerHTML = result.data["napongrejaca_3"];
            
        
        }).catch(function(error){
            console.log(error);
        });
    },1000)

setInterval(()=>{
axios.get('http://10.13.204.3:8080/state').then(function (result) {
    
    //Grejac 1
    if(result.data['strujagrejaca_1st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca1").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace1").setAttribute("src","/radio.png");
    document.getElementById('nnv1').innerHTML = result.data["oNom1"];
    document.getElementById("strujagrejaca1").innerHTML = result.data["strujagrejaca_1"];
    document.getElementById("napongrejaca1").innerHTML = result.data["napongrejaca_1"];
    

    if(result.data['strujagrejaca_1stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca1").innerHTML = 'Auto';
        disablujDugme("btnRucI1");
        disablujDugme("btnRucU1");
        
    }else if(result.data['strujagrejaca_1stA'] == 0){
        document.getElementById("rezimGrejaca1").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_1rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca1").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_1rucno'] == 0){
        document.getElementById("stanjeGrejaca1").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_1st'] == 0){
        document.getElementById("statusGrejaca1").innerHTML = 'Nije u upotrebi';
        document.getElementById("rezimGrejaca1").innerHTML = '';
        document.getElementById("stanjeGrejaca1").innerHTML = '';
        document.getElementById("strujagrejaca1").innerHTML = '';
        document.getElementById("napongrejaca1").innerHTML = '';
        document.getElementById('nnv1').innerHTML = '';
    }




    //Grejac 2
    if(result.data['strujagrejaca_2st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca2").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace2").setAttribute("src","/radio.png");
    document.getElementById('nnv2').innerHTML = result.data["oNom2"];
    document.getElementById("strujagrejaca2").innerHTML = result.data["strujagrejaca_2"];
    document.getElementById("napongrejaca2").innerHTML = result.data["napongrejaca_2"];

    if(result.data['strujagrejaca_2stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca2").innerHTML = 'Auto';
        disablujDugme("btnRucI2");
        disablujDugme("btnRucU2");
        
    }else if(result.data['strujagrejaca_2stA'] == 0){
        document.getElementById("rezimGrejaca2").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_2rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca2").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_2rucno'] == 0){
        document.getElementById("stanjeGrejaca2").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_2st'] == 0){
    document.getElementById("statusGrejaca2").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca2").innerHTML = '';
    document.getElementById("stanjeGrejaca2").innerHTML = '';
    document.getElementById("strujagrejaca2").innerHTML = '';
    document.getElementById("napongrejaca2").innerHTML = '';
    document.getElementById('nnv2').innerHTML = '';
    }


    //Grejac 3
    if(result.data['strujagrejaca_3st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca3").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace3").setAttribute("src","/radio.png");
    document.getElementById('nnv3').innerHTML = result.data["oNom3"];
    document.getElementById("strujagrejaca3").innerHTML = result.data["strujagrejaca_3"];
    document.getElementById("napongrejaca3").innerHTML = result.data["napongrejaca_3"];

    if(result.data['strujagrejaca_3stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca3").innerHTML = 'Auto';
        disablujDugme("btnRucI3");
        disablujDugme("btnRucU3");
        
    }else if(result.data['strujagrejaca_3stA'] == 0){
        document.getElementById("rezimGrejaca3").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_3rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca3").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_3rucno'] == 0){
        document.getElementById("stanjeGrejaca3").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_3st'] == 0){
    document.getElementById("statusGrejaca3").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca3").innerHTML = '';
    document.getElementById("stanjeGrejaca3").innerHTML = '';
    document.getElementById("strujagrejaca3").innerHTML = '';
    document.getElementById("napongrejaca3").innerHTML = '';
    document.getElementById('nnv3').innerHTML = '';
    }


    //Grejac 4
    if(result.data['strujagrejaca_4st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca4").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace4").setAttribute("src","/radio.png");
    document.getElementById('nnv4').innerHTML = result.data["oNom4"];
    document.getElementById("strujagrejaca4").innerHTML = result.data["strujagrejaca_4"];
    document.getElementById("napongrejaca4").innerHTML = result.data["napongrejaca_4"];

    if(result.data['strujagrejaca_4stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca4").innerHTML = 'Auto';
        disablujDugme("btnRucI4");
        disablujDugme("btnRucU4");
        
    }else if(result.data['strujagrejaca_4stA'] == 0){
        document.getElementById("rezimGrejaca4").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_4rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca4").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_4rucno'] == 0){
        document.getElementById("stanjeGrejaca4").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_4st'] == 0){
    document.getElementById("statusGrejaca4").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca4").innerHTML = '';
    document.getElementById("stanjeGrejaca4").innerHTML = '';
    document.getElementById("strujagrejaca4").innerHTML = '';
    document.getElementById("napongrejaca4").innerHTML = '';
    document.getElementById('nnv4').innerHTML = '';
    }

    //Grejac 5
    if(result.data['strujagrejaca_5st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca5").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace5").setAttribute("src","/radio.png");
    document.getElementById('nnv5').innerHTML = result.data["oNom5"];
    document.getElementById("strujagrejaca5").innerHTML = result.data["strujagrejaca_5"];
    document.getElementById("napongrejaca5").innerHTML = result.data["napongrejaca_5"];

    if(result.data['strujagrejaca_5stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca5").innerHTML = 'Auto';
        disablujDugme("btnRucI5");
        disablujDugme("btnRucU5");
        
    }else if(result.data['strujagrejaca_5stA'] == 0){
        document.getElementById("rezimGrejaca5").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_5rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca5").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_5rucno'] == 0){
        document.getElementById("stanjeGrejaca5").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_5st'] == 0){
    document.getElementById("statusGrejaca5").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca5").innerHTML = '';
    document.getElementById("stanjeGrejaca5").innerHTML = '';
    document.getElementById("strujagrejaca5").innerHTML = '';
    document.getElementById("napongrejaca5").innerHTML = '';
    document.getElementById('nnv5').innerHTML = '';
    }

    
    //==================================================================================

}).catch(function (error) {
    console.error(error);
});
},1000);
})
