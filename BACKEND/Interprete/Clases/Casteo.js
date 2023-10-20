const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class Casteo extends Instruction { 
    constructor(expresion,castTo, fila,columna){ 
        super(); 
        this.expresion = expresion;
        this.castTo = castTo;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion cast')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar Casteo ')
        this.expresion = this.expresion.interpretar(entorno,lista_errores); 
        let valor ; 
        switch (this.castTo) {
            case TipoDato.VARCHAR:
                try {
                    valor = this.expresion.valor.toString();
                    return new Dato(valor,TipoDato.VARCHAR,this.fila,this.columna);                                        
                } catch (error) {
                    console.log(`Error en casteo de ${this.expresion.valor}: ${error}`)
                    
                }
                
                break;
            case TipoDato.INT:
                try {
                    if (this.expresion.tipo == TipoDato.BOOLEAN) {
                        if (this.expresion.valor) {
                            valor = 1;
                            return new Dato(valor,TipoDato.INT,this.fila,this.columna);                                        

                        } else {
                            valor = 0;
                            return new Dato(valor,TipoDato.INT,this.fila,this.columna);                                        
                        }                        
                    } else if (this.expresion.tipo == TipoDato.INT) {
                        valor = this.expresion.valor;    
                        return new Dato(valor,TipoDato.INT,this.fila,this.columna);                                        
                    
                    } 
                    else if (this.expresion.tipo == TipoDato.VARCHAR) {
                        try {
                            //IsNan?
                            if (isNaN(this.expresion.valor)) {
                                //parseInt
                                console.log('La cadena se puede castear a Entero')
                                valor = parseInt(this.expresion.valor);
                                return new Dato(valor,TipoDato.INT,this.fila,this.columna);                                 
                            } else {
                                console.log(`Esta cadena no se puede castear a int:${this.expresion.valor}`)
                                
                            }
                        } catch (error) {
                            
                        }
                        
                    }
                } catch (error) {
                    console.log(`Error en casteo de ${this.expresion.valor}: ${error}`)
                    
                }
                
                break;
        
            default:
                break;
        }                                                                                                                                                    
    }


}
module.exports = Casteo;