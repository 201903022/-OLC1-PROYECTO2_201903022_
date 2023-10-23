const TipoDato = require('../Enums/TipoDato.js')
const Dato = require('../Clases/Dato.js');
const Instruction = require('../Clases/Instruction.js');
const TipoOp = require('../Enums/TipoOp.js');
let obtenerContador  = require('../Arbol/datos.js');


class InsertIn extends Instruction { 
    constructor(inTable,inColumns,values,fila,columna){ 
        super(); 
        this.inTable = inTable;
        this.inColumns = inColumns;
        this.values = values;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Insert ------------');
        
        var auxTable = entorno.getTable(this.inTable);
        if (auxTable != null) {
            //obtener keyslist
            var keys = auxTable.getKeyList();
            if (this.inColumns.length == keys.length) {
                console.log('se agrega en todas las columnas');

                
            } else {
                console.log('se agrega en algunas columnas');
                //lista con las que se no se agregan  
                var auxList = [];
                for (let index = 0; index < keys.length; index++) {
                    const element = keys[index];
                    if (!this.inColumns.includes(element)) {
                        auxList.push(element);
                        var auxNull = new Dato(null, TipoDato.NULL, this.fila, this.columna);
                        auxTable.agregarValor(element,auxNull);
                        console.log(`!includes ${element}`)
                    }
                    
                }
                
            }
            //comprobar que el tama;o de inColumnas y values sean el mismo: 
             
            if (this.inColumns.length== this.values.length) {
                    console.log('Columnas y valores son del mismo tama;o')
                    for (let index = 0; index < this.inColumns.length; index++) {
                        const element = this.inColumns[index];
                        var auxC = this.inColumns[index];
                        var auxAdd = this.values[index].interpretar(entorno,lista_errores);
                        console.log(`Agregar ${auxAdd.valor} en columna: ${auxC}`)
                        auxTable.agregarValor(auxC,auxAdd);
                    }
                    auxTable.sizeLenght ++;
                    console.log(`Table ${auxTable.mostrarTabla()}`);
                    entorno.updateTable(auxTable.name,auxTable);
              
            } else {
                console.log('Verificar columnas y valores a insertar')
                console.log(``)
                
            }

            
            //Comprobar que el tipo de dato sea igual a de la columna y que exista la columna: 
            //for  auxColumnas          
        } else{ 
            console.log(`Error Semantico: No existe la tabla ${this.inTable} fila: ${this.fila} columna: ${this.columna}`)
           // lista_errores.push(`Error Semantico: No existe la tabla ${this.inTable} fila: ${this.fila} columna: ${this.columna}`)
        }   
        console.log('===================last auxKeys===============')
        var auxKeeys = auxTable.getKeyList();
        var auxMap = auxTable.getMapList(0);
        console.log('--------Fin Interpretar Insert--------')
        return undefined
    }

    generarAst(){
        let node = { 
            padre : -1, 
            cadena: ''
        }
        var labels = '';
        var uniones = '';
        var salida = ``;
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`      
        let IDvalue = obtenerContador();
        let Rinsert = obtenerContador(); 
        let Rinto = obtenerContador(); 
        let ID = obtenerContador();
        let para1 = obtenerContador();
        labels += `${IDvalue} [label="${this.inTable}"]\n`
        labels += `${Rinsert} [label="insert"]\n`
        labels += `${Rinto} [label="into"]\n`
        labels += `${ID} [label="ID"]\n`  
        labels += `${para1} [label="("]\n`

        let listColumnas = obtenerContador(); 
        labels += `${listColumnas} [label="listColumnas"]\n`
        let parc2 = obtenerContador();
        labels += `${parc2} [label=")"]\n`
        if (this.inColumns.length == 1) {
            let idColumn = obtenerContador();
            let columnId = obtenerContador();
            labels += `${idColumn} [label="${this.inColumns[0]}"]\n`
            labels += `${columnId} [label="columnId"]\n`
            uniones += `${listColumnas} -- ${columnId}\n`
            uniones += `${columnId} -- ${idColumn}\n`
            
        } else if(this.inColumns.length > 1) {
            let array = this.inColumns;
            for (let index = 0; index < array.length; index++) {
                let idColumn = obtenerContador();
                let columnId = obtenerContador();
                labels += `${idColumn} [label="${this.inColumns[index]}"]\n`
                labels += `${columnId} [label="columnId"]\n`
                uniones += `${listColumnas} -- ${columnId}\n`
                uniones += `${columnId} -- ${idColumn}\n`
                if ((index + 1) != array.length) {
                    let coma = obtenerContador();
                    labels += `${coma} [label=","]\n`            
                    uniones += `${listColumnas} -- ${coma}\n`  
                }
                
            }



            
        }

        let valuesR = obtenerContador();
        let parA = obtenerContador();
        if (this.values.length == 1) {
            let nodeExp = this.values[0].generarAst();
            labels += nodeExp.cadena;
            uniones += `${valuesR} -- ${nodeExp.padre}\n`
            
        } else if(this.inColumns.length > 1) {
            let array = this.values;
            for (let index = 0; index < array.length; index++) {
                let nodeExp = array[index].generarAst();
                labels += nodeExp.cadena;
                uniones += `${valuesR} -- ${nodeExp.padre}\n`
                if ((index + 1) != array.length) {
                    let coma = obtenerContador();
                    labels += `${coma} [label=","]\n`            
                    uniones += `${valuesR} -- ${coma}\n`  
                } else {
                    
                }  
            }



            
        }
        let parC = obtenerContador();
        let InsertPadre = obtenerContador();
        labels += `${valuesR} [label="values"]\n`
        labels += `${parA} [label="("]\n`
        labels += `${parC} [label=")"]\n`
        uniones += `${ID} -- ${IDvalue}\n`
        labels += `${InsertPadre} [label="INSERT"]\n`
        uniones += `${InsertPadre} -- ${Rinsert}\n`
        uniones += `${InsertPadre} -- ${Rinto}\n`
        uniones += `${InsertPadre} -- ${ID}\n`
        uniones += `${InsertPadre} -- ${para1}\n`
        uniones += `${InsertPadre} -- ${listColumnas}\n`
        uniones += `${InsertPadre} -- ${parc2}\n`
        uniones += `${InsertPadre} -- ${parA}\n`
        uniones += `${InsertPadre} -- ${valuesR}\n`
        uniones += `${InsertPadre} -- ${parC}\n`
        uniones += `${instPadre} -- ${InsertPadre}\n`

        salida += labels;
        salida += uniones;
        console.log(salida); 
        node.cadena = salida;
        node.padre = instPadre;
        return node;
    }
}
module.exports=InsertIn;