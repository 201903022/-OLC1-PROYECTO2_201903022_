const Instruction = require('../Clases/Instruction.js');
const TipoDato = require('../Enums/TipoDato.js');

class UppeerN extends Instruction{

    constructor(expresion,fila,columna){ 
        super(); 
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion Upper')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Upper')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor;
        try {
            if(this.expresion.tipo == TipoDato.VARCHAR){ 
                valor = this.expresion.valor.toString().toUpperCase();
                return new Dato(valor,TipoDato.VARCHAR,this.fila,this.columna);                                                        
            }else{ 
                console.log(`Se esperaba una cadena ${this.expresion.valor}`);
            }
        } catch (error) {
            console.log(`Error en Upper de ${this.expresion.valor}: ${error}`)
        }
    }
}
module.exports =  UppeerN ;