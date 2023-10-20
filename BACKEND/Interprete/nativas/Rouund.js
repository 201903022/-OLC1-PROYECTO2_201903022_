const Instruction = require('../Clases/Instruction.js');
const TipoDato = require('../Enums/TipoDato.js'); 

class Rouund extends Instruction{
    constructor(expresion,decimales,fila,columna){ 
        super(); 
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.decimales = decimales;
        console.log('nueva expresion Round')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Round')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor;
        try {
            if(this.expresion.tipo == TipoDato.INT || this.expresion.tipo == TipoDato.DOUBLE){ 
                valor = Math.round(this.expresion.valor * Math.pow(10, this.decimales)) / Math.pow(10, this.decimales);
                return new Dato(valor,TipoDato.DOUBLE,this.fila,this.columna);                                                        
            }else{ 
                console.log(`Se esperaba un numero ${this.expresion.valor}`);
            }
        } catch (error) {
            console.log(`Error en Round de ${this.expresion.valor}: ${error}`)
        }
    }
}
module.exports=Rouund;