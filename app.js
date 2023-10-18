// app.js
const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require("./smarthelm-26028-firebase-adminsdk-fx614-3c66ec4299.json"); // Replace with your service account key

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smarthelm-26028-default-rtdb.firebaseio.com', // Replace with your database URL
});

const db = admin.database();
const dataRef = db.ref('test');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/iindex.html');
});

app.get('/data', (req, res) => {
  dataRef.once('value', (snapshot) => {
    const data = snapshot.val();
    res.json(data);
    console.log('Gas Sensor Value:', data.gassensor);
    console.log('Pulse Sensor Value:', data.heartsensor);
    console.log('Panic Button Value:', data.panic);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
