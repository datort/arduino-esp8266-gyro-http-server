
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h> 
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>


ESP8266WiFiMulti wifiMulti;
ESP8266WebServer server(80);

void handleJson();
void handleNotFound();

const int dataPin = A0;

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println('\n');

  wifiMulti.addAP("SSID1", "wifipassword1");
  //wifiMulti.addAP("SSID2", "wifipassword2");
  //wifiMulti.addAP("SSID3", "wifipassword3");

  Serial.println("Connecting ...");
  int i = 0;
  while (wifiMulti.run() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("gyro-sens-01")) {
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }

  server.on("/", handleJson);
  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}

void handleJson() {
  int yAxis = analogRead(dataPin);
  StaticJsonDocument<200> doc;
  doc["y"] = yAxis;

  String out;
  serializeJson(doc, out);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", out);
}

void handleNotFound(){
  server.send(404, "text/plain", "404: Not found");
}
