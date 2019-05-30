# LAPD


## Instructions for installation and use ##

In the source folder, there are different folders for the frontend and backend of our project.

#### 1) Frontend #### 

On the first run, in the frontend folder, you must install the dependencies:

```shell
$ npm install
```

To run the app:

```shell
$ npm start
```

The expo tool will be started, and the project can be scanned with the provided QR code in a mobile phone.

It is also possible to run on an Android or iOS simulator.


#### 1) Backend #### 

On the first run, in the backend folder, you must install the dependencies:

```shell
$ npm install
```


To start the server:

```shell
$ node server.js
```


Notes:

In the backend folder, the .env file defines the PORT where the server will run. 
In the fronted folder, the App.js file defines the SERVERIP, the address where the backend will be running.

The server will be running on a raspberry pi. A led and the htu21d sensor must be connected.

To run locally, connect both the app and the raspberry pi to the same network. 
Using ifconfig command on a terminal, the local ip address of the raspberry pi can be found, and used in the app.


