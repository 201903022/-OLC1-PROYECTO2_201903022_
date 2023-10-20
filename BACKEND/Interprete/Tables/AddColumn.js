const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class AddColumn extends Instruction{ 
    constructor(columnas,fila,columna){ 
        super(); 
        this.tableName = '';
        this.columnas = columnas;//class Columnas
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
        console.log(`Columna ${this.columnas.name}`)
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Add column--------')
        //auxTable
        console.log(`tableName ${this.tableName}`)
        var auxTable = entorno.getTable(this.tableName);
        if (auxTable != null) {
            var auxColumn = auxTable.obtenerColumna(this.columnas.name);
            if (auxColumn == null) {
                auxTable.agregarColumna(this.columnas.name,this.columnas.tipo);
                entorno.updateTable(this.tableName,auxTable)
            } else {
                console.log(`Error Semantico: Ya existe la columna ${this.columnas.columnName} fila: ${this.fila} columna: ${this.columna}`)
                //lista_errores.push(`Error Semantico: Ya existe la columna ${this.columnas.columnName} fila: ${this.fila} columna: ${this.columna}`)
            }
        } else {
            console.log(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
            //lista_errores.push(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
        }

        console.log('--------------------------------------')
    } 
}
module.exports = AddColumn;