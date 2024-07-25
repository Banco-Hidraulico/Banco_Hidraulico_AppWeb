
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");


var dbSensors = 'RDdata/Sensores';
var dbRefSensors = firebase.database().ref(dbSensors);

dbRefSensors.on('value', snapshot =>{
    var data = snapshot.val();
    var temperature = data.TemperaturaTanque;
    // Update DOM elements
    tempElement.innerHTML = temperature;
});