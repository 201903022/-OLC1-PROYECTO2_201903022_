const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

class TrucateN extends Instruction{ 
    constructor(expresion,deicimales,fila,columna){ 
        super(); 
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.deicimales = deicimales;
        console.log('nueva expresion Truncate')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Truncate')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor;
        try {
            if(this.expresion.tipo == TipoDato.DOUBLE){ 
                valor =parseFloat(this.expresion.valor.toFixed(this.deicimales));
                return new Dato(valor,TipoDato.DOUBLE,this.fila,this.columna);                                                        
            }else{ 
                console.log(`Se esperaba un numero double ${this.expresion.valor}`);
            }
        } catch (error) {
            console.log(`Error en Truncate de ${this.expresion.valor}: ${error}`)
        }
    }

}

module.exports = TrucateN;