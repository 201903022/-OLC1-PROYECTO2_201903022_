const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class DropT extends Instruction { 
    constructor(fila,columna){ 
        super(); 
        this.tableName;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
        console.log(`tableName ${this.tableName}`)
        console.log(`fila ${this.fila}`)
        console.log(`columna ${this.columna}`)
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Alter Table--------')
        var auxTable = entorno.getTable(this.tableName);
        if (auxTable != null) {
            entorno.deleteTable(this.tableName);
        } else {
            console.log(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
            //lista_errores.push(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
        }
    }
}

module.exports = DropT;