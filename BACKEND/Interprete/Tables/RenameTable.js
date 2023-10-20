const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');


class RenameTable extends Instruction{
    constructor(newName,fila,columna){ 
        super(); 
        this.tableName ;
        this.newName = newName;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
    }
    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Alter Table--------')
        var auxTable = entorno.getTable(this.tableName);
        if (auxTable != null) {
            auxTable.name = this.newName;
            entorno.deleteTable(this.tableName);
            entorno.addTable(this.newName,auxTable)
        } else {
            console.log(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
            //lista_errores.push(`Error Semantico: No existe la tabla ${this.tableName} fila: ${this.fila} columna: ${this.columna}`)
        }
    }
}
module.exports=RenameTable;