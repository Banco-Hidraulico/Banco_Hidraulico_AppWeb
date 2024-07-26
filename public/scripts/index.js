// convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime){
    return new Date(epochTime*1000);
  }
  
  // convert time to human-readable format YYYY/MM/DD HH:MM:SS
  function epochToDateTime(epochTime){
    var epochDate = new Date(epochToJsDate(epochTime));
    var dateTime = epochDate.getFullYear() + "/" +
      ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
      ("00" + epochDate.getDate()).slice(-2) + " " +
      ("00" + epochDate.getHours()).slice(-2) + ":" +
      ("00" + epochDate.getMinutes()).slice(-2) + ":" +
      ("00" + epochDate.getSeconds()).slice(-2);
    return dateTime;
  }
  
  // function to plot values on charts
  function plotValues(chart, timestamp, value){
    var x = epochToJsDate(timestamp).getTime();
    var y = Number (value);
    if(chart.series[0].data.length > 40) {
      chart.series[0].addPoint([x, y], true, true, true);
    } else {
      chart.series[0].addPoint([x, y], true, false, true);
    }
  }
  
  // DOM elements
  const loginElement = document.querySelector('#login-form');
  const contentElement = document.querySelector("#content-sign-in");
  const userDetailsElement = document.querySelector('#user-details');
  const authBarElement = document.querySelector('#authentication-bar');
  const deleteButtonElement = document.getElementById('delete-button');
  const deleteModalElement = document.getElementById('delete-modal');
  const deleteDataFormElement = document.querySelector('#delete-data-form');
  const viewDataButtonElement = document.getElementById('view-data-button');
  const hideDataButtonElement = document.getElementById('hide-data-button');
  const tableContainerElement = document.querySelector('#table-container');
  const chartsRangeInputElement = document.getElementById('charts-range');
  const loadDataButtonElement = document.getElementById('load-data');
  const cardsCheckboxElement = document.querySelector('input[name=cards-checkbox]');
  const gaugesCheckboxElement = document.querySelector('input[name=gauges-checkbox]');
  const chartsCheckboxElement = document.querySelector('input[name=charts-checkbox]');
  const requestRemoteButton = document.getElementById('request-remote-button');
  const waitingConfirmationElement = document.getElementById('waiting-confirmation');
  const remoteControlMenuElement = document.getElementById('remote-control-menu');
  const manualControlElement = document.getElementById('manual-control');
  const automaticControlElement = document.getElementById('automatic-control');
  const confirmSettingsButton = document.getElementById('confirm-settings-button');
  const closeRemoteButton = document.getElementById('close-remote-button');
  const gaugeFlow = document.getElementById('gauge-caudal');
  const gaugePosition = document.getElementById('guage-posicion-valvula');
  const gaugeLevel = document.getElementById('gauge-nivel-tanque');
  const toggleManualBombaButton = document.getElementById('toggle-manual-bomba');
  const toggleManualCalentadorButton = document.getElementById('toggle-manual-calentador');
  const toggleAutomaticoButton = document.getElementById('toggle-automatico');
  
  // DOM elements for sensor readings
  const cardsReadingsElement = document.querySelector("#cards-div");
  const gaugesReadingsElement = document.querySelector("#gauges-div");
  const chartsDivElement = document.querySelector('#charts-div');
  const tempElement = document.getElementById("temp");
  const humElement = document.getElementById("hum");
  const presElement = document.getElementById("pres");
  const updateElement = document.getElementById("lastUpdate")

  // MANAGE LOGIN/LOGOUT UI
  const setupUI = (user) => {
    if (user) {
      //toggle UI elements
      loginElement.style.display = 'none';
      contentElement.style.display = 'block';
      authBarElement.style.display ='block';
      userDetailsElement.style.display ='block';
      userDetailsElement.innerHTML = user.email;
  
      // get user UID to get data from database
      var uid = user.uid;
      console.log(uid);
  
      // Database paths (with user UID)
      var dbPath = 'RDdata' ;
      var chartPath = 'RDdata/Sensores';
  
      // Database references
      var dbRef = firebase.database().ref(dbPath);
      var chartRef = firebase.database().ref(chartPath);
  
      // CHARTS
      // Number of readings to plot on charts
      var chartRange = 0;
      // Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
      chartRef.on('value', snapshot =>{
        chartRange = Number(snapshot.val());
        console.log(chartRange);
        // Delete all data from charts to update with new values when a new range is selected
        chartT.destroy();
        chartH.destroy();
        chartP.destroy();
        // Render new charts to display new range of data
        chartT = createTemperatureChart();
        chartH = createHumidityChart();
        chartP = createPressureChart();
        // Update the charts with the new range
        // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
        dbRef.orderByKey().limitToLast(chartRange).on('child_added', snapshot =>{
          var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
          // Save values on variables
          var temperature = jsonData.temperature;
          var humidity = jsonData.humidity;
          var pressure = jsonData.pressure;
          var timestamp = jsonData.timestamp;
          // Plot the values on the charts
          plotValues(chartT, timestamp, temperature);
          plotValues(chartH, timestamp, humidity);
          plotValues(chartP, timestamp, pressure);
        });
      });
  
      // Update database with new range (input field)
      chartsRangeInputElement.onchange = () =>{
        chartRef.set(chartsRangeInputElement.value);
      };
  
      //CHECKBOXES
      // Checbox (cards for sensor readings)
      cardsCheckboxElement.addEventListener('change', (e) =>{
        if (cardsCheckboxElement.checked) {
          cardsReadingsElement.style.display = 'block';
        }
        else{
          cardsReadingsElement.style.display = 'none';
        }
      });
      // Checbox (gauges for sensor readings)
      gaugesCheckboxElement.addEventListener('change', (e) =>{
        if (gaugesCheckboxElement.checked) {
          gaugesReadingsElement.style.display = 'block';
        }
        else{
          gaugesReadingsElement.style.display = 'none';
        }
      });
      // Checbox (charta for sensor readings)
      chartsCheckboxElement.addEventListener('change', (e) =>{
        if (chartsCheckboxElement.checked) {
          chartsDivElement.style.display = 'block';
        }
        else{
          chartsDivElement.style.display = 'none';
        }
      });
  
      // CARDS
      // Get the latest readings and display on cards
      dbRef.orderByKey().limitToLast(1).on('child_added', snapshot =>{
        var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
        var temperature = jsonData.TemperaturaTanque;
        var humidity = jsonData.TemperaturaCaneria;
        var pressure = jsonData.NivelTanque;
        // Update DOM elements
        tempElement.innerHTML = temperature;
        humElement.innerHTML = humidity;
        presElement.innerHTML = pressure;
        updateElement.innerHTML = epochToDateTime(timestamp);
      });
      
      //CONTROL REMOTO
      requestRemoteButton.addEventListener('click', () => {
        // Escribe 1 en la variable solicitudRemoto en Firebase
        var solicitudRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Solicitud_Remoto_NR');
        solicitudRemotoRef.set(1);
        // Muestra el mensaje de esperando confirmación
        waitingConfirmationElement.style.display = 'block';
        // Espera la confirmación
        var confirmarRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Acceso_Remoto_NR');
        confirmarRemotoRef.on('value', (snapshot) => {
          if (snapshot.val() === 1) {
            // Escribe 1 en la variable accesoRemoto en Firebase
            //var accesoRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Acceso_Remoto_NR');
            //accesoRemotoRef.set(1);
            // Escribe 0 en la variable solicitudRemoto en Firebase
            var solicitudRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Solicitud_Remoto_NR');
            solicitudRemotoRef.set(0);
            // Oculta el mensaje de esperando confirmación y muestra el menú de control remoto
            waitingConfirmationElement.style.display = 'none';
            remoteControlMenuElement.style.display = 'block';
            // Lee la variable modoOperacion
            var modoOperacionRef = firebase.database().ref('RDdata/ControlRemoto/Modo_Operacion_NR');
            modoOperacionRef.once('value', (snapshot) => {
              var modoOperacion = snapshot.val();
              if (modoOperacion === 'manual') {
                manualControlElement.style.display = 'block';
                automaticControlElement.style.display = 'none';
              } 
              else if (modoOperacion === 'automatico') {
                manualControlElement.style.display = 'none';
                automaticControlElement.style.display = 'block';
              }
            });
          }
        });
      });

      confirmSettingsButton.addEventListener('click', () => {
        // Escribe los valores editados en Firebase
        var updates = {};
        if (manualControlElement.style.display === 'block') {
          updates['RDdata/ControlRemoto/Set_M_Temperatura_Tanque_NR'] = parseFloat(document.getElementById('setMTempTanque').value);
          updates['RDdata/ControlRemoto/Set_M_Posicion_Valvula_NR'] = parseFloat(document.getElementById('setMPosValv').value);
          updates['RDdata/ControlRemoto/Set_M_Velocidad_Bomba_NR'] = parseFloat(document.getElementById('setMVelBom').value);
          var confSetM = firebase.database().ref('RDdata/ControlRemoto/Confirmar_Seteo_M_NR');
          confSetM.set(1);
        } 
        else if (automaticControlElement.style.display === 'block') {
          updates['RDdata/ControlRemoto/Set_A_Temperatura_Tanque_NR'] = parseFloat(document.getElementById('setATempTanque').value);
          updates['RDdata/ControlRemoto/Set_A_Presion_NR'] = parseFloat(document.getElementById('setAPresion').value);
          var confSetA = firebase.database().ref('RDdata/ControlRemoto/Confirmar_Seteo_A_NR');
          confSetA.set(1);
        }
        firebase.database().ref().update(updates);
      });
      
      closeRemoteButton.addEventListener('click', () => {
        // Escribe 0 en la variable accesoRemoto en Firebase
        var accesoRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Acceso_Remoto_NR');
        accesoRemotoRef.set(0);
        // Cierra el menú de control remoto
        remoteControlMenuElement.style.display = 'none';
      });
      
      // Monitorea la variable accesoRemoto para cerrar el menú si se pone en 0
      var accesoRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Acceso_Remoto_NR');
      accesoRemotoRef.on('value', (snapshot) => {
        if (snapshot.val() === 0) {
          remoteControlMenuElement.style.display = 'none';
        }
      });
      // Alternar estado botón on-off
      function toggleButton(button, variable) {
        button.classList.toggle('on');
        button.classList.toggle('off');
        let newValue = button.classList.contains('on') ? 1 : 0;
        dbRef.child(variable).set(newValue);
    }

    // Inicializar estado botones on-off
    function initializeToggleButton(button, variable) {
        dbRef.child(variable).on('value', snapshot => {
            if (snapshot.val() === 1) {
                button.classList.add('on');
                button.classList.remove('off');
            } else {
                button.classList.add('off');
                button.classList.remove('on');
            }
        });

        button.addEventListener('click', () => {
            toggleButton(button, variable);
        });
    }

    // Inicializar botones on-off
    initializeToggleButton(toggleManualBombaButton, 'ControlRemoto/Star_M_Bomba_NR');
    initializeToggleButton(toggleManualCalentadorButton, 'ControlRemoto/Star_M_Calentador_NR');
    initializeToggleButton(toggleAutomaticoButton, 'ControlRemoto/Star_A_NR');

      // GAUGES
      // Get the latest readings and display on gauges
      dbRef.orderByKey().limitToLast(1).on('child_added', snapshot =>{
        var jsonData = snapshot.toJSON();
        var temperaturaTanque = jsonData.TemperaturaTanque;
        var temperaturaCaneria = jsonData.TemperaturaCaneria;
        var presionJumo = jsonData.PresionJumo;
        var presionDelta = jsonData.PresionDelta;
        var velocidadBomba = jsonData.LecturaVelocidadBomba;
        var lecturaValvula = jsonData.LecturaValvula;
        var nivelTanque = jsonData.NivelTanque;
        var caudal = jsonData.Caudal;
        // Update DOM elements
        var gaugeTT = createTemperaturaTanqueGauge();
        var gaugeTC = createTemperaturaCaneriaGauge();
        var gaugePJ = createPresionJumoGauge();
        var gaugePD = createPresionDeltaGauge();
        var gaugeVB = createVelocidadBombaGauge();
        gaugeTT.draw();
        gaugeTC.draw();
        gaugePJ.draw();
        gaugePD.draw();
        gaugeVB.draw();
        gaugeTT.value = temperaturaTanque;
        gaugeTC.value = temperaturaCaneria;
        gaugePJ.value = presionJumo;
        gaugePD.value = presionDelta;
        gaugeVB.value = velocidadBomba;
        gaugePosition.setAttribute('value',lecturaValvula);
        gaugeLevel.setAttribute('value',nivelTanque);
        gaugeFlow.setAttribute('value',caudal);
      });
      
      // DELETE DATA
      // Add event listener to open modal when click on "Delete Data" button
      deleteButtonElement.addEventListener('click', e =>{
        console.log("Remove data");
        e.preventDefault;
        deleteModalElement.style.display="block";
      });
  
      // Add event listener when delete form is submited
      deleteDataFormElement.addEventListener('submit', (e) => {
        // delete data (readings)
        dbRef.remove();
      });
  
      // TABLE
      var lastReadingTimestamp; //saves last timestamp displayed on the table
      // Function that creates the table with the first 100 readings
      function createTable(){
        // append all data to the table
        var firstRun = true;
        dbRef.orderByKey().limitToLast(100).on('child_added', function(snapshot) {
          if (snapshot.exists()) {
            var jsonData = snapshot.toJSON();
            console.log(jsonData);
            var temperature = jsonData.temperature;
            var humidity = jsonData.humidity;
            var pressure = jsonData.pressure;
            var timestamp = jsonData.timestamp;
            var content = '';
            content += '<tr>';
            content += '<td>' + epochToDateTime(timestamp) + '</td>';
            content += '<td>' + temperature + '</td>';
            content += '<td>' + humidity + '</td>';
            content += '<td>' + pressure + '</td>';
            content += '</tr>';
            $('#tbody').prepend(content);
            // Save lastReadingTimestamp --> corresponds to the first timestamp on the returned snapshot data
            if (firstRun){
              lastReadingTimestamp = timestamp;
              firstRun=false;
              console.log(lastReadingTimestamp);
            }
          }
        });
      };
  
      // append readings to table (after pressing More results... button)
      function appendToTable(){
        var dataList = []; // saves list of readings returned by the snapshot (oldest-->newest)
        var reversedList = []; // the same as previous, but reversed (newest--> oldest)
        console.log("APEND");
        dbRef.orderByKey().limitToLast(100).endAt(lastReadingTimestamp).once('value', function(snapshot) {
          // convert the snapshot to JSON
          if (snapshot.exists()) {
            snapshot.forEach(element => {
              var jsonData = element.toJSON();
              dataList.push(jsonData); // create a list with all data
            });
            lastReadingTimestamp = dataList[0].timestamp; //oldest timestamp corresponds to the first on the list (oldest --> newest)
            reversedList = dataList.reverse(); // reverse the order of the list (newest data --> oldest data)
  
            var firstTime = true;
            // loop through all elements of the list and append to table (newest elements first)
            reversedList.forEach(element =>{
              if (firstTime){ // ignore first reading (it's already on the table from the previous query)
                firstTime = false;
              }
              else{
                var temperature = element.temperature;
                var humidity = element.humidity;
                var pressure = element.pressure;
                var timestamp = element.timestamp;
                var content = '';
                content += '<tr>';
                content += '<td>' + epochToDateTime(timestamp) + '</td>';
                content += '<td>' + temperature + '</td>';
                content += '<td>' + humidity + '</td>';
                content += '<td>' + pressure + '</td>';
                content += '</tr>';
                $('#tbody').append(content);
              }
            });
          }
        });
      }
  
      viewDataButtonElement.addEventListener('click', (e) =>{
        // Toggle DOM elements
        tableContainerElement.style.display = 'block';
        viewDataButtonElement.style.display ='none';
        hideDataButtonElement.style.display ='inline-block';
        loadDataButtonElement.style.display = 'inline-block'
        createTable();
      });
  
      loadDataButtonElement.addEventListener('click', (e) => {
        appendToTable();
      });
  
      hideDataButtonElement.addEventListener('click', (e) => {
        tableContainerElement.style.display = 'none';
        viewDataButtonElement.style.display = 'inline-block';
        hideDataButtonElement.style.display = 'none';
      });
  
      // Agregar configuración para control remoto
      requestRemoteButton.style.display = 'block';
      closeRemoteButton.addEventListener('click', (e) => {
        remoteControlMenuElement.style.display = 'none';
      });
    
      // Monitorea la variable accesoRemoto para mostrar el botón de solicitud
      var accesoRemotoRef = firebase.database().ref('RDdata/ControlRemoto/Acceso_Remoto_NR');
      accesoRemotoRef.on('value', (snapshot) => {
        if (snapshot.val() === 0) {
          requestRemoteButton.style.display = 'block';
        } 
        else {
          requestRemoteButton.style.display = 'none';
        }
      });
    // IF USER IS LOGGED OUT  
    } else{
      // toggle UI elements
      loginElement.style.display = 'block';
      authBarElement.style.display ='none';
      userDetailsElement.style.display ='none';
      contentElement.style.display = 'none';
    }
  }