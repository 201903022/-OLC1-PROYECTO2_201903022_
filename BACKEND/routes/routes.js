
/* 
Auxiliar: ALex Guerra
https://github.com/AlexIngGuerra/OLC1-2S2023
*/

const express = require('express');
const router = express.Router();
const controler = require('../controllers/controler.js');


router.get('/', controler.index);
router.post('/analizar', controler.analizar);
router.get('/getData', controler.getData);
router.post('/addData', controler.addData);
router.get('/getImage',controler.sendImage);
router.post('/createImage',controler.createImage);
module.exports=router;