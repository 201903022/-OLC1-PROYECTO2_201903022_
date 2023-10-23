const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');


class CallId extends Instruction{ 
    constructor(id,fila,columna){ 
        super(); 
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        console.log(`llamando a Id: ${this.id}`)
        let variable = entorno.getId(this.id);
        if (variable != null) {
            let tipo = typeof variable; 
            console.log(`tipo de variable: ${tipo}`)
            //number,string, 
            if (tipo == 'number') {
                return new Dato(variable,TipoDato.INT,this.fila,this.columna);
            } else if (tipo == 'string') {
                return new Dato(variable,TipoDato.VARCHAR,this.fila,this.columna);
            } else if (tipo == 'boolean') {
                return new Dato(variable,TipoDato.BOOLEAN,this.fila,this.columna);
            } else if (tipo == 'object') {
                if (variable == null) {
                    return new Dato(variable,TipoDato.NULL,this.fila,this.columna);
                } else {
                    return new Dato(variable,TipoDato.ID,this.fila,this.columna);
                }
            }
            return variable;
        } else {

        }
    }
}

module.exports = CallId;
