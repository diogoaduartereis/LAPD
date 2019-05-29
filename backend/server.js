require('dotenv').config()
 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { User, validate } = require('./models/user');
const bcrypt = require('bcrypt');


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
 * Hashes the password and saves the user to the database
 */
function hashAndSendRegister(req, res) {
  const saltRounds = 10;
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(req.body.password, salt, async function(err, hash) {
        hashedPW = hash;
        user = new User({
          username: req.body.username,
          password: hashedPW
        });
        await user.save();
        res.send(user);
		  });
    });
};

/**
 * Create User with bcrypt
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
    // Hash and insert the new user if they do not exist yet
    hashAndSendRegister(req, res);
  }
});

function compareHash(password, hash)
{
  return bcrypt.compare(password, hash, function(err, res) {
    return res;
  })
}

/**
 * Login User
 */
router.post('/login', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ username: req.body.username });
  if (user) {
      if(compareHash(req.body.password, user.password)) {
        return true;
      }
      else {
        return res.status(400).send('Wrong Password');
      }

  } else {
      return res.status(400).send('That user doesnt exist!');
  }
});


/**
 * Add plant
 */
router.post('/addPlant', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ username: req.body.username });
  if (user) {
      //Delete's User
      let response = await User.deleteOne({ username: req.body.username})
      res.send(response);
  } else {
      return res.status(400).send('That user doesnt exist!');
  }
});



// Development Testing Routes
 
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
      //Delete's User
      let response = await User.deleteOne({ username: req.body.username})
      res.send(response);
  } else {
      return res.status(400).send('That user doesnt exist!');
  }
});

/**
 * TODO: Delete this
 * Delete User 
 */
router.get('/getUser', async (req, res) => {
  // Check if this user already exists
  let user = await User.findOne({ username: req.body.username });
  res.json({user: user});
});

// append /api for http requests
app.use("/api", router);

 


