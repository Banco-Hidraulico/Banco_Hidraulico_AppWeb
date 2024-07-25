// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartPid = createPidChart();
}

// Create Temperature Chart
function createPidChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-temperature',
      type: 'spline' 
    },
    series: [
      {
        name: 'Valvula'
      },{
        name: 'Presion'
      },{
        name: 'Caudal'
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