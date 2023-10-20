const Instruction = require('./Instruction.js');
//Entorno
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');

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
}
module.exports = IF;