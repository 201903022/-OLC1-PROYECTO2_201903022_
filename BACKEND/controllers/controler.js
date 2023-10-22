//const parser
const parser = require('../Analizador/Parser.js');
const Entorno = require('../Interprete/Entornos/Entorno.js');
const data = []; 
const {
    agregarSalir,
    agregarSelect,
    getSalida,
    getSeleccion,
    clearSalida,
    clearSelec
  } = require('../Interprete/Temporales/Temporal.js');
  
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
    clearSalida();
    clearSelec();
    let EntornoGlobal = new Entorno("global",null); 
    const {entrada} = req.body;
    console.log('Entrada: ')
    console.log(entrada);
    var resultado = parser.parse(entrada);
    var lista_errores = [];
    var salida = '';
    resultado.forEach(element => {
        //if (element.interpretar(EntornoGlobal,lista_errores)  != undefined) {
                //if (Array.isArray(element.interpretar(EntornoGlobal,lista_errores))) {
                    console.log('-------------------------------------------------------------------')
                    //console.log('es un array en interpretar analizar',element.interpretar(EntornoGlobal,lista_errores))
                    console.log('-------------------------------------------------------------------')
                    console.log('-------------------------------------------------------------------')
                //}
        salida += element.interpretar(EntornoGlobal,lista_errores) + '\n';
        //}
    });
    console.log('resultado', resultado)
    
    res.status(200).json({message: getSalida(),tables:getSeleccion()});
}
module.exports={index ,analizar,addData,getData};