const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class TypeOFN extends Instruction { 
    constructor(expresion,fila,columna){ 
        super(); 
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion TypeOF')
    }

    interpretar(entorno,lista_errores){
        console.log('Interpretar TypeOF')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor;
        try {
            switch (typeof this.expresion.valor) {
                case Number:
                    if (this.expresion.valor % 1 == 0) {
                        return TipoDato.INT;
                        
                    } else {
                        return TipoDato.DOUBLE;
                    }
                case String: 
                    return TipoDato.VARCHAR;
                
                    break;
            
                default:
                    break;
            }

        } catch (error) {
            console.log(`Error en TypeOF de ${this.expresion.valor}: ${error}`)
        }
    }
}

module.exports = TypeOFN;