const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
const e = require('cors');


class AlterT extends Instruction{
    constructor(tableName,typAction,fila,columna){ 
        super(); 
        this.tableName = tableName;
        this.typAction = typAction;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
    }
    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Alter Table--------')
        var auxTable = entorno.getTable(this.tableName);
        this.typAction.tableName = this.tableName;
        try {
            this.typAction.interpretar(entorno,lista_errores);
        } catch (error) {
            
        }
    }
}
module.exports=AlterT;