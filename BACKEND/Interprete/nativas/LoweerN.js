
const Instruction = require('../Clases/Instruction.js');
const TipoDato = require('../Enums/TipoDato.js');
class LoweerN extends Instruction{ 
    constructor(cadena,fila,columna) {
        super();
        this.cadena = cadena;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion Lower') 
    }

    interpretar(entorno,lista_errores){
        //convertir a minusculas: 
        console.log('Interpretar Lower')
        this.cadena = this.cadena.interpretar(entorno,lista_errores);
        let valor;
        try {
            if(this.cadena.tipo == TipoDato.VARCHAR){ 
                valor = this.cadena.valor.toString().toLowerCase();
                return new Dato(valor,TipoDato.VARCHAR,this.fila,this.columna);                                                        
            }else{ 
                console.log(`Se esperaba una cadena ${this.cadena.valor}`);
            }
        } catch (error) {
            console.log(`Error en Lower de ${this.cadena.valor}: ${error}`)
            
        }
    }
}
module.exports=LoweerN;