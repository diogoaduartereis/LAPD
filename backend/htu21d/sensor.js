const Htu21d = require('./htu21d.js');
const Data = require("../models").models.Data;

let htu = new Htu21d(1, 5000);

let lastReading;

// Start sensor 
const start = () => {
  
  console.log("Started Htu21d sensor.");
  return htu.start();
}
 

htu.on('readout-complete', (data) => {
  console.log(data);
  
  lastReading = data;
  
  let reading = new Data();
  reading.temperature= data.temperature;
  reading.humidity= data.humidity;
  
  // save to db
  reading.save();
});

htu.on('error', (error) => {
  console.log(error);
});


const getValues = () => {
  
  return lastReading;
}
 

module.exports = {start, getValues}

 
