const Instruction = require('./Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
const {
    agregarSalir,
    agregarSelect,
    getSalida,
    getSeleccion
  } = require('../Temporales/Temporal.js');
  

class PRINT extends Instruction{
    constructor(expresion, fila, columna){
        super();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Print (' + this.expresion.valor+ ')')

        try {
            var valor = this.expresion.interpretar(entorno,lista_errores);
            console.log('clg: ' + valor.valor)
            res.status(200).json({message:valor.valor });
        } catch (error) {
            console.log(`Error en interpretar PRINT ${this.fila}`)
            
        }
        agregarSalir(valor.valor);
        return valor.valor

    }

    generarAst(){ 
        let nodo ={
            padre:-1,
            cadena:"",
        }
        let exp = this.expresion.generarAst();
        let son = obtenerContador();
        let dad = obtenerContador(); 
        nodo.cadena = exp.cadena + 
        `${dad}[label="PRINT"]\n`+ 
        `${son}[label="print"] \n`+
        `${dad} -- ${son}\n`+
        `${dad} -- ${exp.padre}\n`;
        console.log(nodo.cadena)
        nodo.padre = dad;
        return nodo;
    }
}
module.exports = PRINT;