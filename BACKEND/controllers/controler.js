//const parser
const parser = require('../Analizador/Parser.js');
const Entorno = require('../Interprete/Entornos/Entorno.js');
const {exec} = require('child_process');
const fs = require('fs');
const rutaDot = 'C:/Librerias/Graphviz/bin/dot';
const entrada = './Arbol.dot' ;
const salida = './AST.png';
const obtenerContador = require('../Interprete/Arbol/datos.js')
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
    res.status(200).sendFile(path.join(__dirname,'../Interprete/Arbol/AST.png'));
    
}

const sendImage = (req,res) => { 
    res.status(200).json({message:'Imagen Obtenida',lista:data});
}

const createImage = (req,res) => { 
    const {entrada} = req.body;
    var resultado = parser.parse(entrada);
    console.log('holaaaaaaaaaaa')
    resultado.forEach(element => {
        element.generarAst();
    });
    try {
        generarAstdot(resultado);
        generarAst();       
    } catch (error) {
       console.log(error) 
    }

    res.status(200).json({message: 'creada la imagen'});
}
const analizar = (req,res) => { 
    clearSalida();
    clearSelec();
    let EntornoGlobal = new Entorno("global",null); 
    const {entrada} = req.body;
    var resultado = parser.parse(entrada);
    var lista_errores = [];
    var salida = '';    
    console.log('Entrada: ')
    console.log(entrada);
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
function generarAstdot(resultado){
    let filePath = './Arbol.dot' 
    let array = resultado;
    let graphviz = 'graph AST{ \n ordering = "out" \n';
    let label = '';
    let uniones = '';
    let incio = obtenerContador();
    label += `${incio} [label="INICIO"]\n`;
    let listInstrucciones = obtenerContador(); 
    label += `${listInstrucciones} [label="listInstrucciones"]\n`
    uniones += `${incio} -- ${listInstrucciones}\n`

    for (let index = 0; index < array.length; index++) {
        const element = array[index].generarAst();
        let InstructionR = obtenerContador();
        uniones += element.cadena;
        uniones += `${listInstrucciones} -- ${element.padre}\n`

        console.log('generarAsdtro')
    }
    graphviz += label;
    graphviz += uniones;
    graphviz += '}\n'
    console.log(graphviz)
    fs.access( filePath,fs.constants.F_OK, (err) => { 
        if (err) {
            console.log('no existe')
            fs.writeFile(filePath,graphviz,(err) => { 
                if (err) {
                    console.log('error al escribir')
                }else{
                    console.log('se escribio correctamente')
                }
            })
        }else{
            console.log('existe')
            fs.writeFile(filePath,graphviz,(err) => { 
                if (err) {
                    console.log('error al escribir')
                }else{
                    console.log('se escribio correctamente')
                }
            })
        }
    } )
    
  
}

function generarAst(){ 
    let comando = `${rutaDot} -Tpng ${entrada} -o ${salida}`
    exec(comando,(err,stdout,stderr)=>{
        if (err) {
            console.log(err);
            return;
        }else{
            console.log('AST generado correctamente');
        }
    }
    );
}
module.exports={index ,analizar,addData,getData,sendImage,createImage};