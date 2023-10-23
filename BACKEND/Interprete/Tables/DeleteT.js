const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');

class DeleteT extends Instruction{
    constructor(tableName,condicion,fila,columna){ 
        super(); 
        this.tableName = tableName;
        this.condicion = condicion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(){ 
        console.log('--------Interpretar DeleteT--------')
        var auxTable = entorno.getTable(this.tableName);
        
        if (auxTable != null) {
            var tableSize = auxTable.sizeLenght;
            if (this.condicion != null) {
                for (let index = 0; index < tableSize; index++) {
                    let auxMap = auxTable.getMapList(index);
                    this.condicion.map1 = auxMap;
                    var value = this.condicion.interpretar(entorno,lista_errores);
                    console.log(`Value: ${value.valor}`)
                    if (value.valor) {
                        console.log('Se elimina en la posicion: '+index)
                        auxTable.deleteColumn(index);
                    } else {
                        
                    }
                }
            } else {
                console.log('Se esperaba un condicion')
                
            }
            entorno.updateTable(auxTable.name,auxTable);
        } else {
            console.log('No se encontro la tabla')
            
        }


        return null;
    }

    generarAst(){ 
        let node = { 
            padre:-1, 
            cadena:''
        }

        let labels ='';
        let uniones = '';
        let salida = '';
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let DeleteDad = obtenerContador(); 
        labels += `${DeleteDad} [label ="deletG" ]\n`;
        let r_delete = obtenerContador(); 
        labels += `${r_delete} [label ="delete" ]\n`;
        let r_from = obtenerContador();
        labels += `${r_from} [label ="from" ]\n`;
        let Id = obtenerContador(); 
        labels += `${Id} [label ="${this.tableName}" ]\n`;
        let r_where = obtenerContador();
        labels += `${r_where} [label ="where" ]\n`;
        let condi = this.condicion.generarAst(); 
        uniones += condi.cadena;
        uniones += `${DeleteDad} -- ${r_delete}\n`;
        uniones += `${DeleteDad} -- ${r_from}\n`;
        uniones += `${DeleteDad} -- ${Id}\n`;
        uniones += `${DeleteDad} -- ${r_where}\n`;
        uniones += `${r_where} -- ${condi.padre}\n`;
        uniones += `${instPadre} -- ${DeleteDad}\n`;

        salida += labels + uniones;
        console.log('===============================')
        console.log(salida)
        node.cadena += labels + uniones;
        node.padre = instPadre;
        return node;

    }

}

module.exports = DeleteT;