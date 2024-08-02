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
    title: { 
      text: undefined
    },
    tooltip: {
      xDateFormat: '%d-%m-%Y',
      pointFormat: '{series.name}: <b>{point.y}</b><br/>',
        shared: true,
      positioner: function () {
          return { x: 280, y: 50 };
      },
      shadow: false,
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.8)'
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
        text: 'Valores' 
      }
    },
    credits: { 
      enabled: false 
    },
    legend: {
      symbolPadding: 50,
      symbolWidth: 20
    },
    series: [{
        name: 'Set Presion'
      },{
        name: 'Presion Proceso'
      },{
        name: 'Set Valvula',
        visible:false
      },{
        name: 'Posicion Valvula',
        visible: false
      }
    ]
  });
  return chart;
}