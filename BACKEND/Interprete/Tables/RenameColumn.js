const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');


class RenameColumn extends Instruction{

    constructor(oldName,newName,fila,columna){ 
        super(); 
        this.tableName ;
        this.oldName = oldName;
        this.newName = newName;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
    }
    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Renombrar Columna--------')
        var auxTable = entorno.getTable(this.tableName);
        if (auxTable != null) {
            auxTable.renombrarColumna(this.oldName,this.newName);
            entorno.updateTable(this.tableName,auxTable);
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

        let renameDad = obtenerContador(); 
        labels += `${renameDad} [label="RENAMEG"]\n`
        let renameR = obtenerContador();
        labels += `${renameR} [label="rename"]\n`
        let columnR = obtenerContador();
        labels += `${columnR} [label="column"]\n`
        let idColumn = obtenerContador();
        labels += `${idColumn} [label="ID"]\n`
        let idValue = obtenerContador();
        labels += `${idValue} [label="${this.oldName}"]\n`
        let toR = obtenerContador();
        labels += `${toR} [label="to"]\n`
        let idNewColumn = obtenerContador();
        labels += `${idNewColumn} [label="ID"]\n`
        let idNewValue = obtenerContador();
        labels += `${idNewValue} [label="${this.newName}"]\n`
        uniones += `${renameDad} -- ${renameR}\n`;
        uniones += `${renameDad} -- ${columnR}\n`;
        uniones += `${idColumn} -- ${idValue}\n`;
        uniones += `${idNewColumn} -- ${idNewValue}\n`;
        uniones += `${renameDad} -- ${idColumn}\n`;
        uniones += `${renameDad} -- ${toR}\n`;
        uniones += `${renameDad} -- ${idNewColumn}\n`;
        //salida
        salida = labels + uniones;
        console.log(salida)
        node.cadena = salida;
        node.padre = renameDad;
        return node;


    }
    
}
module.exports=RenameColumn;