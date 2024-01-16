var alarmBrS = []
//Alam placeholder!!!
var antene_placeholder = document.getElementById('alarmlist');

setInterval(()=>{
axios.get('http://10.13.204.3:8080/state').then(function(result){
antene_placeholder.innerHTML = '';

//Za greske iskljucenja
  if(result.data['AlarmiGreskeIsklj'] != undefined){
      for(let i = 0;i<= result.data['AlarmiGreskeIsklj'].length; i++){
      if(result.data['AlarmiGreskeIsklj'][i] == 1){
        antene_placeholder.innerHTML += `<div class='card bg-warning'> <div class='card-body'>Antena ${i+1}, greška u isključenju</div></div><br>`;
        alarmBrS.push({ime:`Antena ${i+1} greška u isključenju`,vreme:prikaz()});
      }
    }
  }

  //Za greske u radu
  if(result.data['AlarmiGreskeUradu'] != undefined){
    for(let i = 0;i<= result.data['AlarmiGreskeUradu'].length;i++){
      if(result.data['AlarmiGreskeUradu'][i] == 1){
        antene_placeholder.innerHTML += `<div class='card bg-warning'> <div class='card-body'>Antena ${i+1}, greška u radu</div><div><br>`;
          alarmBrS.push({ime:`Antena ${i+1} greška u radu`,vreme:prikaz()});
      }
    }
  }

  if(result.data['AlarmGrejacist'] == 1){
    antene_placeholder.innerHTML += `<div class='card bg-danger'> <div class='card-body'>Alarm greška grejača</div> </div><br>`;
    alarmBrS.push({ime:"Alarm greška grejača",vreme:prikaz()});
  }

  if(result.data['AlarmGrejacinap'] == 1){
    antene_placeholder.innerHTML += `<div class='card bg-danger'> <div class='card-body'>Alarm greška ukupnog napona </div></div><br>`;
    alarmBrS.push({ime:"Alarm greška ukupnog napona",vreme:prikaz()});
  }

  if(result.data['AlarmGrejacigreskaSis'] == 1){
    antene_placeholder.innerHTML += `<div class='card bg-danger'> <div class='card-body'>Alarm greška sistema</div> </div><br>`;
    alarmBrS.push({ime:"Alarm greška u radu",vreme:prikaz()});
  }


  }).catch(function(error){
      console.log(error);
});

},1000);
