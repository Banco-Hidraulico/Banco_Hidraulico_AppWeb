window.addEventListener('load', onload);
const iParada = document.getElementById("indicador-parada");
const iMarcha = document.getElementById("indicador-marcha");
const iFalla = document.getElementById("indicador-falla");
function onload(event){
    var pathIndicator = 'RDdata/Panel';
    var dbIndicator = firebase.database().ref(pathIndicator);
    dbIndicator.on('value',snapshot=>{
        var data=snapshot.val();
        var marcha = data.Arranque_General;
        var falla = data.Parada_Emergencia_General;
        console.log(marcha,falla);
        if(marcha===1){
            iMarcha.style.display = 'block';
            iParada.style.display = 'none';
            iFalla.style.display = 'none';
        }else{
            iParada.style.display = 'block';
            iMarcha.style.display = 'none';
            iFalla.style.display = 'none';
        }
        if(falla===1){
            iFalla.style.display = 'block';
            iMarcha.style.display = 'none';
            iParada.style.display = 'none';
        }
    });
}
