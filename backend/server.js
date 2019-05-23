require('dotenv').config()
 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");


/**
 * Database and models
 */ 
const dataModel = require("./models");
const Data = dataModel.models.Data    //model for htu21d


/**
 * Sensors
 */ 
const sensor1 = require("./htu21d/sensor");
 

/**
 * Create express instance
 */
const app = express();
app.use(cors());
app.use(logger("dev"));

const router = express.Router();


/**
 * Connect to database and listen to defined port
 */
dataModel.connectDb().then(async() => {
  app.listen(process.env.PORT, () => 
    console.log(`LISTENING ON PORT ${process.env.PORT}`));
    
    //start reading sensor
    sensor1.start();
});



/**
 * Configure express to use body parser, so data is already transformed
 * to JSON and can be used as the 'request.body' property
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Create the endpoints
 */
router.get("/getSensor", (req, res) => {
  console.log(res.json({ data: sensor1.getValues() }));
  return res.json({ data: sensor1.getValues() });
});

router.get("/register", (req, res) => {
  console.log(req.body)
});


// append /api for http requests
app.use("/api", router);

 


