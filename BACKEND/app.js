
/* 
Auxiliar: ALex Guerra
https://github.com/AlexIngGuerra/OLC1-2S2023
*/

//express
const express = require('express');
//cors
const cors = require('cors');
//morgan
const morgan = require('morgan');
const routesApi = require('./routes/routes.js');
//app
const app = express();

app.use(morgan('dev'));
app.use(express.json());

var corsOptions = { 
    origin: '*',
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use("/",routesApi);
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
  });
module.exports = app;
//Middlewars
