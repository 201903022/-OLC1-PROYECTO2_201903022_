const express = require('express');
const router = express.Router();
const controler = require('../controllers/controler.js');


router.get('/', controler.index);
router.post('/analizar', controler.analizar);
router.get('/getData', controler.getData);
router.post('/addData', controler.addData);

module.exports=router;