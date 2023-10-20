//const parser
const parser = require('../Analizador/Parser.js');
const Entorno = require('../Interprete/Entornos/Entorno.js');
const data = []; 
const index = (req,res) => { 
    res.status(200).json({message: 'Hola Mundo'});
}

const addData = (req,res)=> { 
    const {valor} = req.body;
    console.log(valor);
    data.push(valor);
    res.status(200).json({message: 'Data s been added'});
}
//getData
const getData = (req,res) => { 
    res.status(200).json({message:'Data Obtenida',lista:data});
}

const analizar = (req,res) => { 
    const {entrada} = req.body;
    console.log(entrada);
    var lista_errores = [];
    
    res.status(200).json({message: 'Hola Mundo'});
}
module.exports={index ,analizar,addData,getData};