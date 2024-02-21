#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <LoRa.h>
#include <string.h>
#include <SPI.h>
#include "addons/TokenHelper.h"

// Replace with your network credentials
#define WIFI_SSID "soham"
#define WIFI_PASSWORD "abcdefgh"

// Replace with your Firebase project API Key
#define API_KEY "AIzaSyC8UGpsGX4wsyu_-HfXrPI6FoAxScymVMk"

// Replace with your Firebase Realtime Database URL
#define DATABASE_URL "https://smarthelm-26028-default-rtdb.firebaseio.com" 

// LoRa pin definitions
#define SS 4
#define RST 5
#define DI0 2
#define SCK 18
#define MISO 19
#define MOSI 23
#define LED 17

// Separator character for LoRa data
char seprat = '#';

// Define Firebase Data object
FirebaseData fbdo;

// Firebase Authentication and Configuration objects
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
String gas, heart, panic,helmid;

void setup() {
  Serial.begin(9600);

  // Wait for Wi-Fi to be connected
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  SPI.begin(SCK, MISO, MOSI, SS);

  // Setup LoRa sender
  LoRa.setPins(SS, RST, DI0);
  LoRa.begin(433E6);
  while (!Serial) {
    Serial.println(".");
    delay(500);
  }
  Serial.println("LoRa initialized");

  // Initialize Firebase configuration
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Sign up to Firebase
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase Sign Up Successful");
    signupOK = true;
  } else {
    Serial.printf("Firebase Sign Up Error: %s\n", config.signer.signupError.message.c_str());
  }

  // Assign the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback; // See addons/TokenHelper.h

  // Begin Firebase
  Firebase.begin(&config, &auth);
  Serial.println("Firebase connected");
  Firebase.reconnectWiFi(true);
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize > 0) {
    while (LoRa.available()) {
      gas = LoRa.readStringUntil(seprat);
      heart = LoRa.readStringUntil(seprat);
      panic = LoRa.readStringUntil(seprat);
      helmid = LoRa.readStringUntil(seprat);
    }

    unsigned int gassensor = gas.toInt();
    unsigned int heartsensor = heart.toInt();
    unsigned int alarm = panic.toInt();
    unsigned int id = helmid.toInt();

    // Send data to Firebase
    if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 4000 || sendDataPrevMillis == 0)) {
      sendDataPrevMillis = millis();
      writeToFirebase("test/gassensor", gassensor);
      writeToFirebase("test/heartsensor", heartsensor);
      writeToFirebase("test/panic", alarm);
      writeToFirebase("test/helm_id",id);
    }
  }
}

void writeToFirebase(const char *path, int value) {
  if (Firebase.RTDB.setInt(&fbdo, path, value)) {
    Serial.println("Firebase Write Successful");
    Serial.println("PATH: " + fbdo.dataPath());
    Serial.println("TYPE: " + fbdo.dataType());
  } else {
    Serial.println("Firebase Write Error");
    Serial.println("REASON: " + fbdo.errorReason());
  }
}
