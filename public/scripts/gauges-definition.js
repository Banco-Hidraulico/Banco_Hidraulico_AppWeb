// Create Temperatura Tanque Gauge
function createTemperaturaTanqueGauge() {
    var gauge = new LinearGauge({
        renderTo: 'gauge-temperatura-tanque',
        width: 120,
        height: 400,
        units: "Temperature Tanque °C",
        minValue: 0,
        startAngle: 90,
        ticksAngle: 180,
        maxValue: 100,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueDec: 2,
        valueInt: 2,
        majorTicks: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100"
        ],
        minorTicks: 4,
        strokeTicks: true,
        highlights: [
            {
                "from": 80,
                "to": 100,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        colorBarProgress: "#CC2936",
        colorBarProgressEnd: "#049faa",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        barWidth: 10,
    });
    return gauge;
}
// Create Temperatura Caneria Gauge
function createTemperaturaCaneriaGauge() {
    var gauge = new LinearGauge({
        renderTo: 'gauge-temperatura-caneria',
        width: 120,
        height: 400,
        units: "Temperatura Caneria °C",
        minValue: 0,
        startAngle: 90,
        ticksAngle: 180,
        maxValue: 100,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueDec: 2,
        valueInt: 2,
        majorTicks: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100"
        ],
        minorTicks: 4,
        strokeTicks: true,
        highlights: [
            {
                "from": 80,
                "to": 100,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        colorBarProgress: "#CC2936",
        colorBarProgressEnd: "#049faa",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        barWidth: 10,
    });
    return gauge;
}
// Create Nivel Tanque Gauge
function createNivelTanqueGauge() {
    var gauge = new LinearGauge({
        renderTo: 'gauge-nivel-tanque',
        width: 120,
        height: 400,
        units: "Nivel Tanque %",
        minValue: 0,
        maxValue: 100,
        majorTicks: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 90,
                "to": 100,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        animationDuration: 1500,
        animationRule: "linear",
        tickSide: "left",
        numberSide: "left",
        needleSide: "left",
        barStrokeWidth: 7,
        barBeginCircle: false,
        value: 75
    });
    return gauge;
}
// Create Presion Jumo
function createPresionJumoGauge(){
    var gauge = new RadialGauge({
        renderTo: 'gauge-presion-jumo',
        width: 220,
        height: 220,
        units: "Presion Jumo (PSI)",
        minValue: 0,
        maxValue: 8,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueInt: 2,
        majorTicks: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8"
    
        ],
        minorTicks: 4,
        strokeTicks: true,
        highlights: [
            {
                "from": 6,
                "to": 8,
                "color": "#03C0C1"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "line",
        colorNeedle: "#007F80",
        colorNeedleEnd: "#007F80",
        needleWidth: 2,
        needleCircleSize: 3,
        colorNeedleCircleOuter: "#007F80",
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
    });
    return gauge;
}
// Create Presion Delta
function createPresionDeltaGauge(){
    var gauge = new RadialGauge({
        renderTo: 'gauge-presion-delta',
        width: 220,
        height: 220,
        units: "Presion Delta (PSI)",
        minValue: 0,
        maxValue: 8,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueInt: 2,
        majorTicks: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8"
    
        ],
        minorTicks: 4,
        strokeTicks: true,
        highlights: [
            {
                "from": 6,
                "to": 8,
                "color": "#03C0C1"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "line",
        colorNeedle: "#007F80",
        colorNeedleEnd: "#007F80",
        needleWidth: 2,
        needleCircleSize: 3,
        colorNeedleCircleOuter: "#007F80",
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
    });
    return gauge;
}
// Create Velocidad Bomba
function createVelocidadBombaGauge(){
    var gauge = new RadialGauge({
        renderTo: 'gauge-bomba',
        width: 220,
        height: 220,
        units: "%",
        title: "Bomba",
        minValue: 0,
        maxValue: 100,
        majorTicks: [
            0,
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 80,
                "to": 100,
                "color": "rgba(255, 0, 0, .3)"
            }
        ],
        ticksAngle: 225,
        startAngle: 67.5,
        colorMajorTicks: "#ddd",
        colorMinorTicks: "#ddd",
        colorTitle: "#eee",
        colorUnits: "#ccc",
        colorNumbers: "#eee",
        colorPlate: "#222",
        borderShadowWidth: 0,
        borders: true,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        colorBorderOuter: "#333",
        colorBorderOuterEnd: "#111",
        colorBorderMiddle: "#222",
        colorBorderMiddleEnd: "#111",
        colorBorderInner: "#111",
        colorBorderInnerEnd: "#333",
        colorNeedleShadowDown: "#333",
        colorNeedleCircleOuter: "#333",
        colorNeedleCircleOuterEnd: "#111",
        colorNeedleCircleInner: "#111",
        colorNeedleCircleInnerEnd: "#222",
        valueBoxBorderRadius: 0,
        colorValueBoxRect: "#222",
        colorValueBoxRectEnd: "#333"
    });
    return gauge;
}
// Create Posicion Valvula Gauge
function createPosicionValvulaGauge() {
    var gauge = new LinearGauge({
        renderTo: 'gauge-posicion-valvula',
        width: 120,
        height: 400,
        units: "Valvula %",
        minValue: 0,
        maxValue: 100,
        majorTicks: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 0,
                "to": 100,
                "color": "rgba(255, 0, 0, .3)"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        animationDuration: 1500,
        animationRule: "linear",
        tickSide: "left",
        numberSide: "left",
        needleSide: "left",
        barStrokeWidth: 7,
        barBeginCircle: false,
        value: 75
    });
    return gauge;
}
// Create Caudal
function createCaudalGauge(){
    var gauge = new LinearGauge({
        renderTo: 'gauge-caudal',
        width: 120,
        height: 400,
        units: "Caudal L/min",
        minValue: 0,
        maxValue: 30,
        majorTicks: [
            "0",
            "10",
            "20",
            "30"
        ],
        minorTicks: 2,
        strokeTicks: true,
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        animationDuration: 1500,
        animationRule: "linear",
        tickSide: "left",
        numberSide: "left",
        needleSide: "left",
        barStrokeWidth: 7,
        barBeginCircle: false,
        value: 75
    });
    return gauge;
}