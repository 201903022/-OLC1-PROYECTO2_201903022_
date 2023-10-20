const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

class DropColumn extends Instruction{ 
    constructor( columnName, fila, columna){ 
        super(); 
        this.tableName  ;
        this.columnName = columnName;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar DropColumna--------')    
        let auxTable = entorno.getTable(this.tableName); 
        if (auxTable != null) {
            var auxColumn = auxTable.obtenerColumna(this.columnName);
            if (auxColumn != null) {
                auxTable.eliminarColumna(this.columnName);
                entorno.updateTable(this.tableName,auxTable)
            } else {
                console.log(`Error Semantico: No existe la columna ${this.columnName} fila: ${this.fila} columna: ${this.columna}`)
                //lista_errores.push(`Error Semantico: No existe la columna ${this.columnName} fila: ${this.fila} columna: ${this.columna}`)
            }
        } else {
            console.log(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
            //lista_errores.push(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
        }
    
    }

}

module.exports = DropColumn;    