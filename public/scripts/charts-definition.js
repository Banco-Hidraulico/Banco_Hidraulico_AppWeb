// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartPid = createPidChart();
}

// Create PID Chart
function createPidChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-temperature',
      type: 'spline' 
    },
    series: [
      {
        name: 'Set Presion'
      },{
        name: 'Presion Proceso'
      },{
        name: 'Set Valvula'
      },{
        name: 'Posicion Valvula'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'PID' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}