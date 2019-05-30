require('dotenv').config()
 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const bcrypt = require('bcrypt');
const multer  = require('multer');
var path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage });
/**x\
 * Database and models
 */ 
const dataModel = require("./models");
const Data = dataModel.models.Data    //model for htu21d
const { User, validate } = require('./models/user'); //model for the Users
const { Plant } = require('./models/plant'); //model for the Plants


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
app.use(express.static('uploads'))
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
    let hashedPW = bcrypt.hashSync(req.body.password, 10);
	        user = new User({
          username: req.body.username,
          password: hashedPW
        });
        await user.save();
        res.send(user);
  }
});

function compareHash(password, hash)
{
	if(bcrypt.compareSync(password, hash)) {
	 return true
	} else {
	 return false
	}
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
        return res.status(200).send('Valid Login');
      }
      else {
        return res.status(400).send('Wrong Password');
      }
  } else {
      return res.status(400).send('That user doesnt exist!');
  }
});

let type = upload.single('file')
/**
 *  Upload plant image
 */
router.post('/uploadPlantImage', type, function (req, res, next) {
    return res.json(req.file);
})

/**
 * Add plant
 */
router.post('/addPlant', async (req, res) => {
    if(!req.body.photoPath) {
      req.body.photoPath = "https://mashtalegypt.com/wp-content/uploads/2017/05/update-1.png";
    }
    plant = new Plant({
      username: req.body.username,
      name: req.body.name,
      species: req.body.species,
      photoPath: req.body.photoPath,
      plantMinTemperature: req.body.plantMinTemperature,
      plantShadeTolerance: req.body.plantShadeTolerance,
      plantPrecipitationMax: req.body.plantPrecipitationMax,
      plantPrecipitationMin: req.body.plantPrecipitationMin
    });
    let response = await plant.save();
    res.send(response);
});

/**
 * Get my plants
 */
router.get('/myPlants', async (req, res) => {
  // Check if this user already exists
  let plants = await Plant.find({username: req.headers.username})
  if (plants) {
    res.send(plants);
  } else {
      return res.status(400).send('The user doesnt have plants');
  }
});

/**
 * TODO: Delete Plant
 */
router.post('/deletePlant', async (req, res) => {
    let response = await Plant.deleteOne({ _id: req.body._id})
    if(response) {
      res.send(response);
    }
    else {
      return res.status(400).send('Error deleting plant');
  }
});

/**
 * TODO: Compare Passwords
 */
router.post('/comparePW', async (req, res) => {
  let response = await User.findOne({ username: req.body.username})
  if(response) {
    if(compareHash(req.body.oldPassword, response.password)) {
      let hashedPW = bcrypt.hashSync(req.body.newPassword, 10);
      let data = await User.updateOne({ _id: response._id}, {password:hashedPW})
      res.status(200).send('Successfully Updated Password');
    }
    else {
      res.status(400).send('Incorrect old password');
    }
  }
  else {
    return res.status(400).send('Error deleting plant');
}
});

/**
 * Pump activation python script
 */
function runPumpScript(plant) {
  PythonShell.run('my_script.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
}

/**
 * Receive get to activate pump
 */
router.get('/activatePump', async (req, res) => {
    // using spawn instead of exec, prefer a stream over a buffer
    // to avoid maxBuffer issue
    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./scripts/pump.py']);
  process.stdout.on('data', function (data) {
    console.log(data);
  });
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

 


