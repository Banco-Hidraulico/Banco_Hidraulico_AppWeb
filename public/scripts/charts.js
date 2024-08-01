// CHARTS
    var pathChart = 'RDdata/Graficos';
    var pathSets = 'RDdata/Seteos';

    var dbChart = firebase.database().ref(pathChart);
    var dbSets = firebase.database().ref(pathSets);
    
    dbSets.on('value',snapshot=>{
      var data=snapshot.val();
      var smpv = data.SetPosicionValvula;
      var sape = data.Set_Presion_Delta;
      console.log(sape)
      dbChart.on('value', snapshot =>{
        var data = snapshot.val(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
              // Save values on variables
        var feedbackValvula = data.LecturaValvula;
        var feedbackPresion = data.PresionDelta;
        var timestamp = data.timestamp;
        plotValues(chartPid, timestamp,sape,feedbackPresion,smpv,feedbackValvula);
      });
    });