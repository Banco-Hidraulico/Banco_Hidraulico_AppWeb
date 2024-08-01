// CHARTS
    var pathChart = 'RDdata/Graficos';
    var pathRange = 'RDdata/range';
    var dbChart = firebase.database().ref(pathChart);
    var chartRef = firebase.database().ref(pathRange);

      // Number of readings to plot on charts
      var chartRange = 0;
      // Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
      chartRef.on('value', snapshot =>{
        chartRange = Number(snapshot.val());
        console.log(chartRange);
        chartPid.destroy();
        chartPid = createPidChart();
        // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
        dbChart.on('value', snapshot =>{
          var data = snapshot.val(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
          // Save values on variables
          var feedback = data.LecturaValvula;
          var presion = data.PresionDelta;
          var caudal = data.CaudalGrafico;
          var timestamp = data.timestamp;
          // Plot the values on the charts
          plotValues(chartPid, timestamp, feedback,presion,caudal);
        });
      });
      // Update database with new range (input field)
      chartsRangeInputElement.onchange = () =>{
        chartRef.set(chartsRangeInputElement.value);
      };