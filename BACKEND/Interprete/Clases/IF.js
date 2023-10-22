const Instruction = require('./Instruction.js');
//Entorno
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');

var Logicas = [
    TipoOp.AND,TipoOp.IGUAL,TipoOp.MAYORIK,
    TipoOp.MAYORK,TipoOp.MENORIK,TipoOp.MENORK,
    TipoOp.OR,TipoOp.DIFERENTE
]; 

class IF extends Instruction{
    constructor(condicion, instrucciones, fila, columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
        console.log(`IF -> ${condicion}`);
    }

    interpretar(entorno,lista_errores){ 
        const nameEntorno = "IfL"+this.fila.toString() + this.columna.toString();

        const IfEntorno = new Entorno(nameEntorno,entorno);
        if (Logicas.includes(this.condicion.tipo)) {
            console.log('If si posee una instruccion logica');
            this.condicion = this.condicion.interpretar(IfEntorno,lista_errores); 
            console.log(`Condicion: ${this.condicion.valor}`);
                if (this.condicion.valor) {
                    console.log('Condicion verdadera');
                    for (let index = 0; index < this.instrucciones.length; index++) {
                        const element = this.instrucciones[index];
                        element.interpretar(IfEntorno,lista_errores);
                    }
                } else {
                    console.log('Condicion falsa');
                }
            } else {
                console.log('Error de tipos en condicion');
                lista_errores.push(`Error de tipos en condicion, fila: ${this.fila} y columna: ${this.columna}`);
            }
        IfEntorno.showVariables();
    }

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }
        let labels = '';
        let uniones = '';
        let salida ='';

        let expresion = this.condicion.generarAst(); 
        labels += expresion.cadena;

        let IfDad = obtenerContador();
        labels += `${IfDad} [label="ifG"]\n`;
        let IfCond = obtenerContador();
        let Rif = obtenerContador(); 
        labels += `${Rif} [label="if"]\n`;
        let Rthen = obtenerContador(); 
        labels += `${Rthen} [label="then"]\n`;

        let rInstrucciones = obtenerContador(); 
        labels += `${rInstrucciones} [label="instrucciones"]\n`;
        let array = this.instrucciones; 
        for (let index = 0; index < this.instrucciones.length; index++) {
            let rInstruccion = obtenerContador(); 
            labels += `${rInstruccion} [label="instruccion"]\n`;
            const element = this.instrucciones[index];
            console.log(element)
            let ins =  element.generarAst(); 
           labels += ins.cadena;
            uniones += `${rInstruccion} -- ${ins.padre}\n`;
            uniones += `${rInstrucciones} -- ${rInstruccion}\n`;
        }

        let Rend = obtenerContador(); 
        labels += `${Rend} [label="end"]\n`;
        let rIf2 = obtenerContador(); 
        labels += `${rIf2} [label="if"]\n`;
        labels += `${IfCond} [label="Condicion"]\n`;
        uniones += `${IfDad} -- ${IfCond}\n`;

        uniones += `${IfDad} -- ${Rif}\n`;
        uniones += `${IfDad} -- ${expresion.padre}\n`;
        uniones += `${IfDad} -- ${Rthen}\n`;
        uniones += `${IfDad} -- ${rInstrucciones}\n`;
        uniones += `${IfDad} -- ${Rend}\n`;
        uniones += `${IfDad} -- ${rIf2}\n`;

        node.cadena = labels + uniones;
        node.padre = IfDad;
        return node;
        
    }
}
module.exports = IF;