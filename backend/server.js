require('dotenv').config()
 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { User, validate } = require('./models/user');


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
  return res.json({ data: sensor1.getValues() });
});


/**
 * Create User
 */
router.post('/register', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ username: req.body.username });
  if (user) {
      return res.status(400).send('That user already exists!');
  } else {
      // Insert the new user if they do not exist yet
      user = new User({
          username: req.body.username,
          password: req.body.password
      });
      await user.save();
      res.send(user);
  }
});

/**
 * TODO: Delete this
 * Delete User 
 */
router.post('/deleteUser', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ username: req.body.username });
  if (user) {
      return res.status(400).send('That user doesnt exist!');
  } else {
      //Delete's User
      let response = await User.deleteOne({ username: req.body.username })
      res.send(response);
  }
});


// append /api for http requests
app.use("/api", router);

 


