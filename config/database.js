const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

const dbConnect = ()=>{
    mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log("DB Connection Successfull")
    })
    .catch((error)=>{
        console.log("ERROR DURING DB CONNECTION");
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect;