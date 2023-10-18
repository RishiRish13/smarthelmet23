
/*const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const { getDatabase, ref, onValue } = require('firebase/database');
const fs = require('fs');
const http = require('http');
const notifier = require('node-notifier');
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC8UGpsGX4wsyu_-HfXrPI6FoAxScymVMk",
    authDomain: "smarthelm-26028.firebaseapp.com",
    databaseURL: "https://smarthelm-26028-default-rtdb.firebaseio.com",
    projectId: "smarthelm-26028",
    storageBucket: "smarthelm-26028.appspot.com",
    messagingSenderId: "496110278360",
    appId: "1:496110278360:web:9d9bfcc6f8eac5f60aa9ad",
    measurementId: "G-H7HWQRSZJC"
})

const auth =getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
db.collection('todos').getDocs();
const snapshot =await getDocs(todosCol);

onAuthStateChanged(auth,user =>{
    if(user != null){
        console.log('logged in');
    }else
    console.log('no user');

})

let panicButtonStatus = 0;
let panicButtonPressedTime = 0;
let heartDangerStatus =0;
let heartDangerStartTime= 0;

//const firebaseApp = initializeApp(firebaseConfig);

// Reference to your data in the database
const database = getDatabase(firebaseApp);
const dataRef = ref(database, 'test');
function generateHTML(data) {
    const htmlContent = `            
    <!DOCTYPE html>             
    <html>
    <head>
        <title>Firebase Data</title>
        <style>
        body {
            background-color: black;
            color: white; 
        }
       
    </style>
    
</head>
    </head>
    <body>
        <h1>Real-time Data from Firebase</h1>
        <p>Heart Sensor Value: <span id="heart-sensor-value">${data.heartsensor} BPM</span><p>
        <p>Gas Sensor Value: <span id="gas-sensor-value">${data.gassensor} PPM</span></p>
        <p>Helmet Id :<span id="helmet -id">${data.helm_id}</span></p>
        <p>Panic Button: <span id="panic-button-status">${data.panic === 1 ? 'BUTTON PRESSED ,ALERT!' : 'Safe'}</span></p>
        <p>HEART Danger: <span id="danger-duration">${heartDangerStatus === 1 ? 'HEART RISK , ALERT!' : 'Safe'}</span></p>
        <p>HEARTSENSOR EXCEEDING  DURATION : <span id="heart-duration">${heartDangerStatus === 1 ? (Date.now() - heartDangerStartTime) / 1000 + ' seconds' : 'N/A'}</span></p>
        
        
    
    </html>
    <script>
        setInterval(function() {
            location.reload();
        }, 100); 
    </script>

    `;

    fs.writeFileSync('firebase_data.html', htmlContent);
  }//
  


function updateData(data) {
    console.log('Heart Sensor Value:', data.heartsensor);
    console.log('Gas Sensor Value:', data.gassensor);
    console.log('Panic Button Status:', data.panic);
    console.log('helmet id :', data.helm_id);
    

if (data.panic === 1 && panicButtonStatus === 0) {
    // Panic button is pressed, start the timer
    panicButtonStatus = 1;
    panicButtonPressedTime = Date.now();
    console.log('Panic Button Status: Danger!');
} else if (data.panic === 0 && panicButtonStatus === 1) {
   
    const duration = (Date.now() - panicButtonPressedTime) / 1000;
    console.log(`Panic Button Released after ${duration} seconds.`);
    panicButtonStatus = 0;
}

if (data.heartsensor < 50 || data.heartsensor > 200) {
    // Heart BPM is out of the normal range, start tracking the duration
    if (heartDangerStatus === 0) {
        heartDangerStatus = 1;
        heartDangerStartTime = Date.now();
        console.log('Heart Rate Danger Status: Heart Rate Alert!');
        //window.alert('Heart Rate Danger!');
        notifier.notify({
            title: 'Alert!',
            message: 'Heart Rate Danger!',
            });
    
    }
} else {
    // Heart BPM is back to normal, stop tracking the duration
    if (heartDangerStatus === 1) {
        const duration = (Date.now() - heartDangerStartTime) / 1000;
        console.log(`Heart Rate Alert ended after ${duration} seconds.`);
        heartDangerStatus = 0;
    }
}

}

setInterval(() => {
// Listen for real-time data changes
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    updateData(data);
    generateHTML(data); //
});
},1000);
//
const server = http.createServer((req, res) => {
    if (req.url === '/') {
    const html = fs.readFileSync('firebase_data.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
    }
});

  const port = 3000; // Change this to your desired port
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

*/
const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const { getDatabase, ref, onValue } = require('firebase/database');
const fs = require('fs');
const http = require('http');
//const notifier = require('node-notifier');
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC8UGpsGX4wsyu_-HfXrPI6FoAxScymVMk",
    authDomain: "smarthelm-26028.firebaseapp.com",
    databaseURL: "https://smarthelm-26028-default-rtdb.firebaseio.com",
    projectId: "smarthelm-26028",
    storageBucket: "smarthelm-26028.appspot.com",
    messagingSenderId: "496110278360",
    appId: "1:496110278360:web:9d9bfcc6f8eac5f60aa9ad",
    measurementId: "G-H7HWQRSZJC"
})

const auth =getAuth(firebaseApp);
/*const db = getFirestore(firebaseApp);
db.collection('todos').getDocs();
const snapshot =await getDocs(todosCol);*/

onAuthStateChanged(auth,user =>{
    if(user != null){
        console.log('logged in');
    }else
    console.log('no user');

})
let panicButtonStatus = 0;
let panicButtonPressedTime = 0;
let heartDangerStatus =0;
let heartDangerStartTime= 0;

//const firebaseApp = initializeApp(firebaseConfig);

// Reference to your data in the database
const database = getDatabase(firebaseApp);
const dataRef = ref(database, 'test');
function generateHTML(data) {
    const gasSensorValue = data.gassensor;
    const maxGasSensorValue = 5000;
    const gasRotation = (gasSensorValue / maxGasSensorValue) * 360;
    
    const heartSensorValue = data.heartsensor;
    const maxHeartSensorValue = 300;
    const heartRotation = (heartSensorValue / maxHeartSensorValue) * 360;

    const htmlContent = `            
    <!DOCTYPE html>             
    <html>
    <head>
        <title>Firebase Data</title>
        <style>
        
    body {
        background-color: black;
        color: white;
    }

    #sensor-gauges {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }

    .sensor-gauge {
        text-align: center;
    }

    .gauge-container {
        width: 150px;
        height: 150px;
        margin: 50px 300px;
        position: relative;
    }

    .gauge {
        width: 100%;
        height: 100%;
        border: 5px solid blue;
        border-radius: 50%;
        position: absolute;
    }

    .needle {
        width: 5px;
        height: 40%;
        background: red;
        position: absolute;
        top: 50%;
        bottom: 0;
        left: calc(50% - 1.5px);
        transform-origin: 50% 0;
        transition: transform 0.5s;
    }

    .gauge-reading {
        margin-top: 10px;
        font-size: 20px;
        color: white;
    }

    .red-text {
        color: red;
    }
    .green-text {
        color: green;
    }

    </style>
    </head>
    <body>
        <h1>Real-time Data Monitor</h1>
        <p>Heart Sensor Value: <span id="heart-sensor-value">${data.heartsensor} BPM</span><p>
        <p>Gas Sensor Value: <span id="gas-sensor-value">${data.gassensor} PPM</span></p>
        <p>Helmet Id :<span id="helmet -id">${data.helm_id}</span></p>
        <p>Panic Button: <span id="panic-button-status" class="${data.panic === 1 ? 'red-text' : 'green-text'}">${data.panic === 1 ? 'Danger' : 'Safe'}</span></p>
        <p>HEART Danger: <span id="danger-duration" class="${heartDangerStatus === 1 ? 'red-text' : 'green-text'}">${heartDangerStatus === 1 ? 'Heart Risk Alert' : 'Safe'}</span></p>
        <p>HEARTSENSOR EXCEEDING  DURATION : <span id="heart-duration">${heartDangerStatus === 1 ? (Date.now() - heartDangerStartTime) / 1000 + ' seconds' : 'N/A'}</span></p>
        <div id="sensor-gauges">
    <div class="sensor-gauge">
        <div class="gauge-container">
            <div class="gauge" style="transform: rotate(${heartRotation}deg);"></div>
            <div class="needle" style="transform: rotate(${heartRotation}deg);"></div>
        </div>
        <div class="gauge-reading">Heart Sensor Value: ${heartSensorValue} BPM</div>
    </div>
    <div class="sensor-gauge">
        <div class="gauge-container">
            <div class="gauge" style="transform: rotate(${gasRotation}deg);"></div>
            <div class="needle" style="transform: rotate(${gasRotation}deg);"></div>
        </div>
        <div class="gauge-reading">Gas Sensor Value: ${gasSensorValue} PPM</div>
    </div>
</div>

    </body>
    </html>
    <script>
    function autoReloadPage() {
        setTimeout(function() {
            location.reload();
        }, 2000); 
    }

    // Call the autoReloadPage function to start automatic reloading
    autoReloadPage();

      
    </script>

    `;

    fs.writeFileSync('firebase_data.html', htmlContent);
  }//

  /*function updateGasSensorGauge(data) {
    const gasSensorValue = data.gassensor;
    const maxGasSensorValue = 5000;
    const rotation = (gasSensorValue / maxGasSensorValue) * 180;

    const gaugeHTML = `
        <div id="gas-sensor-gauge">
            <div id="gauge-container">
                <div id="gauge" style="transform: rotate(${rotation}deg);"></div>
                <div id="needle"></div>
            </div>
            <div id="gauge-reading">Gas Sensor Value: ${gasSensorValue} PPM</div>
        </div>
    `;

    // Read the existing HTML content
    const existingHTML = fs.readFileSync('firebase_data.html', 'utf8');

    // Update the HTML content with the gauge
    fs.writeFileSync('firebase_data.html', existingHTML.replace('<!-- Insert Gauge Here -->', gaugeHTML));
}

*/

  


function updateData(data) {
    console.log('Heart Sensor Value:', data.heartsensor);
    console.log('Gas Sensor Value:', data.gassensor);
    console.log('Panic Button Status:', data.panic);
    console.log('helmet id :', data.helm_id);
    

if (data.panic === 1 && panicButtonStatus === 0) {
    // Panic button is pressed, start the timer
    panicButtonStatus = 1;
    panicButtonPressedTime = Date.now();
    console.log('Panic Button Status: Danger!');
} else if (data.panic === 0 && panicButtonStatus === 1) {
   
    const duration = (Date.now() - panicButtonPressedTime) / 1000;
    console.log(`Panic Button Released after ${duration} seconds.`);
    panicButtonStatus = 0;
}

if (data.heartsensor < 50 || data.heartsensor > 200) {
    // Heart BPM is out of the normal range, start tracking the duration
    if (heartDangerStatus === 0) {
        heartDangerStatus = 1;
        heartDangerStartTime = Date.now();
        console.log('Heart Rate Danger Status: Heart Rate Alert!');
        //window.alert('Heart Rate Danger!');
       /* notifier.notify({
            title: 'Alert!',
            message: 'Heart Rate Danger!',
            });*/
    
    }
} else {
    // Heart BPM is back to normal, stop tracking the duration
    if (heartDangerStatus === 1) {
        const duration = (Date.now() - heartDangerStartTime) / 1000;
        console.log(`Heart Rate Alert ended after ${duration} seconds.`);
        heartDangerStatus = 0;
    }
}

}

setInterval(() => {
// Listen for real-time data changes
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    updateData(data);
    //updateGasSensorGauge(data);
    generateHTML(data); 
});
},1000);
/*onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        updateData(data);
        generateHTML(data);
    } else {
        console.log('No data available in the database.');
    }
}, (error) => {
    console.error('Firebase Error:', error);
});*/
const server = http.createServer((req, res) => {
    if (req.url === '/') {
    const html = fs.readFileSync('firebase_data.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
    }
});

  const port = 3000; // Change this to your desired port
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});