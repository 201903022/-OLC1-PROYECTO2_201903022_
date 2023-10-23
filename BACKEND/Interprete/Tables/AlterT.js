const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
const e = require('cors');
let obtenerContador  = require('../Arbol/datos.js');


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

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }

        let labels = '';
        let uniones = '';
        let salida ='';

        //instPadre
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let alterTable = obtenerContador() ;
        labels += alterTable+' [label="ALTER_TABLE"];\n';
        let alterR = obtenerContador(); 
        labels += `${alterR} [label="alter"]\n`;
        let tableR = obtenerContador(); 
        labels += `${tableR} [label="table"]\n`;
        let tableName = obtenerContador();
        labels += tableName+' [label="ID"];\n';
        let idTableName = obtenerContador();
        labels += idTableName+' [label="'+this.tableName+'"];\n';
        uniones += `${tableName} -- ${idTableName}\n`
        let instAlerR = obtenerContador(); 
        labels += `${instAlerR} [label="instAlter"]\n`;
        let type = this.typAction.generarAst();


        labels += type.cadena; 
        uniones += `${instAlerR} -- ${type.padre}\n`;
        uniones += `${alterTable} -- ${alterR}\n`;
        uniones += `${alterTable} -- ${tableR}\n`;
        uniones += `${alterTable} -- ${tableName}\n`;
        uniones += `${alterTable} -- ${instAlerR}\n`;
        uniones += `${instPadre} -- ${alterTable}\n`;

        salida = labels + uniones; 
        console.log(salida)
        node.cadena = salida;
        node.padre = instPadre;
        return node;





    }
}
module.exports=AlterT;