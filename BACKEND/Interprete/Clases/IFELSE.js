const Instruction = require('./Instruction.js');
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');

var Logicas = [
    TipoOp.AND,TipoOp.IGUAL,TipoOp.MAYORIK,
    TipoOp.MAYORK,TipoOp.MENORIK,TipoOp.MENORK,
    TipoOp.OR,TipoOp.DIFERENTE
]; 

class IFELSE extends Instruction{
    constructor(condicion, instrucciones, instrucciones_else, fila, columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.instrucciones_else = instrucciones_else;
        this.fila = fila;
        this.columna = columna;
        console.log(`IFELSE -> ${condicion}`);
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar IFELSE')
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
                    for (let index = 0; index < this.instrucciones_else.length; index++) {
                        const element = this.instrucciones_else[index];
                        element.interpretar(IfEntorno,lista_errores);
                    }
                }
            } else {
                console.log('Error de tipos en condicion');
                lista_errores.push(`Error de tipos en condicion, fila: ${this.fila} y columna: ${this.columna}`);
            }        
        

    }
}
module.exports = IFELSE;