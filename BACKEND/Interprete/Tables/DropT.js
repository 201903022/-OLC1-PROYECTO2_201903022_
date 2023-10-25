const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
const TipoSelect1 = require('../Enums/TipoSelec.js');
const {
    agregarSalir,
    agregarSelect,
    getSalida,
    getSeleccion
  } = require('../Temporales/Temporal.js');
const createMark = require('../Mark/MarkFunction.js')
class DropT extends Instruction { 
    constructor(tableName,fila,columna){ 
        super(); 
        this.tableName = tableName;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva alteracion de tabla')
        //mostar todas las variables: 
        console.log(`tableName ${this.tableName}`)
        console.log(`fila ${this.fila}`)
        console.log(`columna ${this.columna}`)
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Drop Table--------')
        var auxTable = entorno.getTable(this.tableName);
        if (auxTable != null) {
            entorno.deleteTable(this.tableName);
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
        let labels ='';
        let unioones = '';
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label = "instruccion" ];\n`
        let RDropG  = obtenerContador();
        labels += `${RDropG} [label = "drop:" ]\n`
        let RDrop = obtenerContador(); 
        labels += `${RDrop} [label = "Drop" ]\n`
        let RTable = obtenerContador();
        labels += `${RTable} [label = "Table" ]\n`
        let RId = obtenerContador();
        labels += `${RId} [label = "${this.tableName}" ]\n`
        //uniones 
        unioones += `${instPadre} -- ${RDropG};\n`
        unioones += `${RDropG} -- ${RDrop};\n`
        unioones += `${RDropG} -- ${RTable};\n`
        unioones += `${RDropG} -- ${RId};\n`

        //node
        node.cadena += labels + unioones;
        node.padre = instPadre;

        return node;
    }
}

module.exports = DropT;