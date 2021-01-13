# Arduino ESP8266 & GY-61 ADXL335


## What's this about

This sketch was written as part of a [YouTube video](https://youtu.be/42dJp85BvgQ). It reads data from a GY-61 3-Axis ADXL335 sensor and makes it available over the local wifi using and HTTP web server. The results are returned as JSON. It's intended to work on a NodeMCU V3.4 dev board but might work (with some modifications) on others as well. 

## Prerequisites

In order to use this sketch, you'll have to install the required libraries to build it with your Arduino IDE: 

What you need besides the defaults: 

* ArduinoJson by Benoit Blanchon (v6.16.1)

(All installed via the "Manage Libraries" menu)

To connect and use the NodeMCU board with it's ESP8266 chipset I used the Addional Board Manager URL: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`. That should bring some required libs, too. 


## Configuration

In order to get this thing connected to your Wifi you'll have to add your Wifi credentials. Checkout the `setup()` for this:

`wifiMulti.addAP("SSID1", "wifipassword1");`

The `addAP()` method enables you to supply multiple Wifi connections. This is useful if you have multiple access points around your house. The network with the best reception will automatically be choosen on startup. 

Besides that, you'll have to take a look into the `html/index.html`. In here the boards IP is set to retrieve the data from. You need to change it to your boards IP. 


## Retrieve Data

After startup an IP address will be assigned by your DHCP server. You can see the address by opening the Arduino Serial Monitor. It should print something like this: 

```
Connected to YourWifiSSID
IP address:	192.168.178.48
mDNS responder started
HTTP server started
```

You can use this IP address to connect to the board. Besides that, the wifi client tries to setup mDNS to make the device available at `gyro-sens-01.local`. But this may not work with all Wifi setups. Connecting using the IP is probably the safest way to do so. 


### Retrieve data

Access the boards ip via your favorite browser or API client: 

`GET http://device-ip/` -> `{"y":123}`


### Additional info / License

This software is as is. It's written to my special requirements and may hopefully be useful for some one out there. It's featured in my little [YouTube Video](https://youtu.be/42dJp85BvgQ). Feel free to do whatever you want with this piece of software.