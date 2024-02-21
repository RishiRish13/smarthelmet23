#include <LoRa.h>
#include <SPI.h>
#include<Esp.h>
#include<math.h>


#define ss 4
#define rst 5
#define dio0 26
#define MQ2pin 26
#define SCK 18
#define MISO 19
#define MOSI 23
#define PULSE 32

String helmid="001";
float formula;
float m_slope=0.364;
float b_y_int=1.2858;
int p=0;
int Threshold = 550;
int pulse;
int gassensor;
float RS;
String dataToSend;
float raw_gas;
float sensorValue = 0;                             // Variable to store the value coming from the sensor
int count = 9;
unsigned long starttime = 0;
int heartrate = 0;
bool counted = false;
void myISR() {
  if(p==0){
    p=1;
  }
  else{
    p=0;
  }
}
char hash='#';
void setup() 
{
  Serial.begin(115200); 

  delay(5000);
  Serial.println("MQ2 warming up!");
	delay(5000); // allow the MQ2 to warm up
  Serial.println("LoRa Sender");
  SPI.begin(SCK, MISO, MOSI, ss);
  LoRa.setPins(ss, rst, dio0);    //setup LoRa transceiver module
  LoRa.begin(433E6);
  Serial.println("LoRa Initializing OK!");
  analogReadResolution(10);
  attachInterrupt(digitalPinToInterrupt(panic), myISR, FALLING); // trigger when button pressed, but not when released.
}
 
void loop() {
   gassensor =(int)get_smoke_ppm();
   pulse = BPM_calc();
  
  // Create a formatted string to send
   dataToSend = String(gassensor) + hash + String(pulse) + hash + String(p)+ hash + helmid;
  
  Serial.print("Sending packet: ");
  Serial.println(dataToSend);
  LoRa.beginPacket();
  LoRa.print(dataToSend);
  LoRa.endPacket();  // Send the formatted string
}
float get_smoke_ppm(){
  raw_gas= analogRead(MQ2pin);
  raw_gas=raw_gas/20;
  raw_gas=(raw_gas*5)/1023;
  RS=(5-raw_gas)/raw_gas;
  formula=pow(10,((log(RS/0.438828)-b_y_int)/m_slope));
  return formula;
}
int BPM_calc(){
  starttime = millis();
  while (millis()<starttime+3000)                   // Reading pulse sensor for 3 seconds
  {
    sensorValue = analogRead(PULSE);
    if (sensorValue > 580 && counted == false)  // Threshold value is 580 (~ 2.7V)
    {
      count++;
      Serial.print ("count = ");
      Serial.println (count);
      counted = true;
    }
    else if (sensorValue < 580)
    {
      counted = false;
    }
    delay(50);
  }
  heartrate = count*20;                               // Multiply the count by 20 to get beats per minute
  Serial.println ();
  Serial.print ("BPM = ");
  Serial.println (heartrate);                        // Display BPM in the Serial Monitor
  Serial.println ();
  count = 0;
  return heartrate;
}