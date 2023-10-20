const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class LengthN extends Instruction{
    constructor(expresion,fila,columna){ 
        
        super(); 
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion Length')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Length')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor;
        try {
            if(this.expresion.tipo == TipoDato.VARCHAR){ 
                valor = this.expresion.valor.toString().length;
                return new Dato(valor,TipoDato.INT,this.fila,this.columna);                                                        
            }else{ 
                console.log(`Se esperaba una cadena ${this.expresion.valor}`);
            }
        } catch (error) {
            console.log(`Error en Length de ${this.expresion.valor}: ${error}`)
        }
    }

}
module.exports =  LengthN ;