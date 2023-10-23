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
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let exp = this.expresion.generarAst();
        let son = obtenerContador();
        let dad = obtenerContador(); 
        nodo.cadena = exp.cadena + 
        `${dad}[label="PRINT"]\n`+ 
        `${son}[label="print"] \n`+
        `${dad} -- ${son}\n`+
        `${dad} -- ${exp.padre}\n`;
        `${instPadre} -- ${dad}\n`;
        console.log(nodo.cadena)
        nodo.padre = instPadre;
        return nodo;
    }
}
module.exports = PRINT;