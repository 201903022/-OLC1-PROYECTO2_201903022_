const Instruction = require('./Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
 

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
            
        } catch (error) {
            console.log(`Error en interpretar PRINT ${this.fila}`)
            
        }
    }

    generarAst(){ 
        let nodo ={
            padre:-1,
            cadena:"",
        }
        let exp = this.expresion.generarAst();
        let son = obtenerContador();
        let parA = obtenerContador(); 
        let parC = obtenerContador();
        let dad = obtenerContador(); 
        nodo.cadena = 
        exp.cadena + 
        `${dad}[label="PRINT"]\n`+ 
        `${son}[label="print"] \n`+
        `${parA}[label="(" ]\n`+
        `${parC}[label=")" ]\n`+
        `${dad} -- ${son}\n`+
        `${dad} -- ${parA}\n`+
        `${dad} -- ${exp.padre}\n`+
        `${dad} -- ${parC}\n`;
        console.log(nodo.cadena)
        return nodo;
    }
}
module.exports = PRINT;