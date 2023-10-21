const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');


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

    generarAst(){ 

        let node = { 
            padre: -1, 
            cadena: ''
        }

        let labels = '';
        let uniones = '';
        let salida ='';
        let renameG = obtenerContador() 
        labels += `${renameG} [label="renameG" ]\n`
        let renameR = obtenerContador();
        labels += `${renameR} [label="rename" ]\n`
        let toR = obtenerContador();
        labels += `${toR} [label="to" ]\n`
        let idTable = obtenerContador();
        labels += `${idTable} [label="ID" ]\n`
        let idValue = obtenerContador();
        labels += `${idValue} [label="${this.newName}" ]\n`

        uniones += `${idTable} -- ${idValue}\n`
        uniones += `${renameG} -- ${renameR}\n`
        uniones += `${renameG} -- ${toR}\n`
        uniones += `${renameG} -- ${idTable}\n`

        //salida
        salida = labels + uniones;
        
        node.cadena += labels + uniones ;
        node.padre = renameG;

        return node;
    }
}
module.exports=RenameTable;