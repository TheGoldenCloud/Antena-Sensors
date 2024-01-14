const axios = require('axios');

function disablujDugme(dugme){
    document.getElementById(dugme).style.pointerEvents = "none"
    document.getElementById(dugme).style.background = "rgb(242, 242, 242)"
    document.getElementById(dugme).style.border = "rgb(242, 242, 242)"
    document.getElementById(dugme).style.color = "black"
}

document.addEventListener('DOMContentLoaded', () => {

//Ocitavanje stalno ukupnog napona i spoljsnje temperature
setInterval(()=>{
    axios.get('http://10.13.204.3:8080/state').then(function(result){
            
            //Sis. ocitavanje
            document.getElementById('spoljasnjaTemp').innerHTML = result.data["spoljasnja_temp"];
            
            //Ormani/Proveri
            if(result.data["ospoljasnjaTempUorm"] < -270){
            document.getElementById('spoljasnjaTempUorm').innerHTML = '';
            }else{
            document.getElementById('spoljasnjaTempUorm').innerHTML = result.data["ospoljasnjaTempUorm"];
            }

            if(result.data["otestMer"] < -270){
            document.getElementById('testMer').innerHTML = '';
            }else{
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

    //Grejac 6
    if(result.data['strujagrejaca_6st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca6").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace6").setAttribute("src","/radio.png");
    document.getElementById('nnv6').innerHTML = result.data["oNom6"];
    document.getElementById("strujagrejaca6").innerHTML = result.data["strujagrejaca_6"];
    document.getElementById("napongrejaca6").innerHTML = result.data["napongrejaca_6"];

    if(result.data['strujagrejaca_6stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca6").innerHTML = 'Auto';
        disablujDugme("btnRucI6");
        disablujDugme("btnRucU6");
        
    }else if(result.data['strujagrejaca_6stA'] == 0){
        document.getElementById("rezimGrejaca6").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_6rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca6").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_6rucno'] == 0){
        document.getElementById("stanjeGrejaca6").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_6st'] == 0){
    document.getElementById("statusGrejaca6").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca6").innerHTML = '';
    document.getElementById("stanjeGrejaca6").innerHTML = '';
    document.getElementById("strujagrejaca6").innerHTML = '';
    document.getElementById("napongrejaca6").innerHTML = '';
    document.getElementById('nnv6').innerHTML = '';
    }

    //Grejac 7
    if(result.data['strujagrejaca_7st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca7").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace7").setAttribute("src","/radio.png");
    document.getElementById('nnv7').innerHTML = result.data["oNom7"];
    document.getElementById("strujagrejaca7").innerHTML = result.data["strujagrejaca_7"];
    document.getElementById("napongrejaca7").innerHTML = result.data["napongrejaca_7"];

    if(result.data['strujagrejaca_7stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca7").innerHTML = 'Auto';
        disablujDugme("btnRucI7");
        disablujDugme("btnRucU7");
        
    }else if(result.data['strujagrejaca_7stA'] == 0){
        document.getElementById("rezimGrejaca7").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_7rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca7").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_7rucno'] == 0){
        document.getElementById("stanjeGrejaca7").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_7st'] == 0){
    document.getElementById("statusGrejaca7").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca7").innerHTML = '';
    document.getElementById("stanjeGrejaca7").innerHTML = '';
    document.getElementById("strujagrejaca7").innerHTML = '';
    document.getElementById("napongrejaca7").innerHTML = '';
    document.getElementById('nnv7').innerHTML = '';
    }


    //Grejac 8
    if(result.data['strujagrejaca_8st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca8").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace8").setAttribute("src","/radio.png");
    document.getElementById('nnv8').innerHTML = result.data["oNom8"];
    document.getElementById("strujagrejaca8").innerHTML = result.data["strujagrejaca_8"];
    document.getElementById("napongrejaca8").innerHTML = result.data["napongrejaca_8"];

    if(result.data['strujagrejaca_8stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca8").innerHTML = 'Auto';
        disablujDugme("btnRucI8");
        disablujDugme("btnRucU8");
        
    }else if(result.data['strujagrejaca_8stA'] == 0){
        document.getElementById("rezimGrejaca8").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_8rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca8").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_8rucno'] == 0){
        document.getElementById("stanjeGrejaca8").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_8st'] == 0){
    document.getElementById("statusGrejaca8").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca8").innerHTML = '';
    document.getElementById("stanjeGrejaca8").innerHTML = '';
    document.getElementById("strujagrejaca8").innerHTML = '';
    document.getElementById("napongrejaca8").innerHTML = '';
    document.getElementById('nnv8').innerHTML = '';
    }


    //Grejac 9
    if(result.data['strujagrejaca_9st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca9").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace9").setAttribute("src","/radio.png");
    document.getElementById('nnv9').innerHTML = result.data["oNom9"];
    document.getElementById("strujagrejaca9").innerHTML = result.data["strujagrejaca_9"];
    document.getElementById("napongrejaca9").innerHTML = result.data["napongrejaca_9"];

    if(result.data['strujagrejaca_9stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca9").innerHTML = 'Auto';
        disablujDugme("btnRucI9");
        disablujDugme("btnRucU9");
        
    }else if(result.data['strujagrejaca_9stA'] == 0){
        document.getElementById("rezimGrejaca9").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_9rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca9").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_9rucno'] == 0){
        document.getElementById("stanjeGrejaca9").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_9st'] == 0){
    document.getElementById("statusGrejaca9").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca9").innerHTML = '';
    document.getElementById("stanjeGrejaca9").innerHTML = '';
    document.getElementById("strujagrejaca9").innerHTML = '';
    document.getElementById("napongrejaca9").innerHTML = '';
    document.getElementById('nnv9').innerHTML = '';
    }


    //Grejac 10
    if(result.data['strujagrejaca_10st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca10").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace10").setAttribute("src","/radio.png");
    document.getElementById('nnv10').innerHTML = result.data["oNom10"];
    document.getElementById("strujagrejaca10").innerHTML = result.data["strujagrejaca_10"];
    document.getElementById("napongrejaca10").innerHTML = result.data["napongrejaca_10"];

    if(result.data['strujagrejaca_10stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca10").innerHTML = 'Auto';
        disablujDugme("btnRucI10");
        disablujDugme("btnRucU10");
        
    }else if(result.data['strujagrejaca_10stA'] == 0){
        document.getElementById("rezimGrejaca10").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_10rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca10").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_10rucno'] == 0){
        document.getElementById("stanjeGrejaca10").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_10st'] == 0){
    document.getElementById("statusGrejaca10").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca10").innerHTML = '';
    document.getElementById("stanjeGrejaca10").innerHTML = '';
    document.getElementById("strujagrejaca10").innerHTML = '';
    document.getElementById("napongrejaca10").innerHTML = '';
    document.getElementById('nnv10').innerHTML = '';
    }


    //Grejac 11
    if(result.data['strujagrejaca_11st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca11").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace11").setAttribute("src","/radio.png");
    document.getElementById('nnv11').innerHTML = result.data["oNom11"];
    document.getElementById("strujagrejaca11").innerHTML = result.data["strujagrejaca_11"];
    document.getElementById("napongrejaca11").innerHTML = result.data["napongrejaca_11"];

    if(result.data['strujagrejaca_11stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca11").innerHTML = 'Auto';
        disablujDugme("btnRucI11");
        disablujDugme("btnRucU11");
        
    }else if(result.data['strujagrejaca_11stA'] == 0){
        document.getElementById("rezimGrejaca11").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_11rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca11").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_11rucno'] == 0){
        document.getElementById("stanjeGrejaca11").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_11st'] == 0){
    document.getElementById("statusGrejaca11").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca11").innerHTML = '';
    document.getElementById("stanjeGrejaca11").innerHTML = '';
    document.getElementById("strujagrejaca11").innerHTML = '';
    document.getElementById("napongrejaca11").innerHTML = '';
    document.getElementById('nnv11').innerHTML = '';
    }


    //Grejac 12
    if(result.data['strujagrejaca_12st'] == 1){  //u UPOTREBI
    document.getElementById("statusGrejaca12").innerHTML = 'U upotrebi';
    document.getElementById("imgPlace12").setAttribute("src","/radio.png");
    document.getElementById('nnv12').innerHTML = result.data["oNom12"];
    document.getElementById("strujagrejaca12").innerHTML = result.data["strujagrejaca_12"];
    document.getElementById("napongrejaca12").innerHTML = result.data["napongrejaca_12"];

    if(result.data['strujagrejaca_12stA'] == 1){ //RUCNO / AUTOMACKI
        document.getElementById("rezimGrejaca12").innerHTML = 'Auto';
        disablujDugme("btnRucI12");
        disablujDugme("btnRucU12");
        
    }else if(result.data['strujagrejaca_12stA'] == 0){
        document.getElementById("rezimGrejaca12").innerHTML = 'Rucno';
    }

    if(result.data['strujagrejaca_12rucno'] == 1){ //uKLJUCENA RUCNO
        document.getElementById("stanjeGrejaca12").innerHTML = 'Ukljucen';
    }else if(result.data['strujagrejaca_12rucno'] == 0){
        document.getElementById("stanjeGrejaca12").innerHTML = 'Iskljucen';
    }
    
    }else if(result.data['strujagrejaca_12st'] == 0){
    document.getElementById("statusGrejaca12").innerHTML = 'Nije u upotrebi';
    document.getElementById("rezimGrejaca12").innerHTML = '';
    document.getElementById("stanjeGrejaca12").innerHTML = '';
    document.getElementById("strujagrejaca12").innerHTML = '';
    document.getElementById("napongrejaca12").innerHTML = '';
    document.getElementById('nnv12').innerHTML = '';
    }

    
    //==================================================================================

}).catch(function (error) {
    console.error(error);
});
},1000);
})
