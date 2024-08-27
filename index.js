const express = require('express');
require('dotenv').config();
const dbConnect = require('../config/database');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server is runing at Port ${PORT}`);
})
dbConnect();