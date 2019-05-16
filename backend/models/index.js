require('dotenv').config()
const mongoose = require("mongoose");
const Data = require("./data"); 


const connectDb = () => {
	
	// connect with database
	return mongoose.connect( 
		process.env.DATABASE_URL,
		{ useNewUrlParser: true }).then(
			
			()  => {console.log("Connected to the database.");},
			err => {console.log("MongoDB connection error.");}
		);
}
 
process.on('SIGINT', () =>{
	mongoose.connection.close(function(){
		
		console.log("Closing db");
		process.exit(0);
	});
});
 
 
const models = {Data}

module.exports={
	models,
	connectDb
}

 
	
 
