const Instruction = require('./Instruction.js');
const tipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/ExDato.js');

class ExDato extends Instruction {
    constructor(tipo, valor,fila,columna){
        super()
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno, lista_errores){
        switch (this.tipo) {
            case tipoDato.INT:
                return new Number(this.valor);
            case tipoDato.DOUBLE:
                return new Number(this.valor);    
            case tipoDato.DATE:
                return new Date(this.valor);     
            case tipoDato.VARCHAR:
                return this.valor;                                                                                 
            default:
                break;
        }
        return this.valor
    }

    getArbol(){
        var json = {}
        json.tipo = this.tipo
        json.valor = this.valor
        return json
    }
}
module.exports =  ExDato ;