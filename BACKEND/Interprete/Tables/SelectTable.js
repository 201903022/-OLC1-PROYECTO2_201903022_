const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
const {
    agregarSalir,
    agregarSelect,
    getSalida,
    getSeleccion
  } = require('../Temporales/Temporal.js');
  
var Logicas = [
    TipoOp.AND,TipoOp.IGUAL,TipoOp.MAYORIK,
    TipoOp.MAYORK,TipoOp.MENORIK,TipoOp.MENORK,
    TipoOp.OR,TipoOp.DIFERENTE
]; 
class SelectTable extends Instruction { 
    constructor(tableName,instruccion,expresion,fila,columna) { 
        super(); 
        this.tableName = tableName;
        this.instruccion = instruccion;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Select--------')
        // Comprobar si la instruccion es igual a asteristo if instruccion == *
        var auxTable = entorno.getTable(this.tableName);
        var tableSize = auxTable.sizeLenght;
        var resultado = [];
        var columnasList = [];
        console.log('this.instruccion '+this.instruccion.length)
        //for tableSize
        if (this.instruccion == '*' ) {
            columnasList = auxTable.getKeyList();
            if (this.expresion ==null) {
                console.log('Select * from ')
                for (let index = 0; index < tableSize; index++) {
                    let auxMap = auxTable.getMapList(index);
                    var filaas = [];
                    for (const [nombreColumna, valor] of auxMap) {
                        console.log('==========================')
                        console.log('==========================')
                        filaas.push(valor);

                        console.log('==========================')
                    }   
                    resultado.push(filaas);                     
                    
                    
                }    
            } else {
                console.log(`Table size: ${tableSize}`)
                this.from !=null ? this.from[0] != null ? this.from[0][0]:null:null;
               
            }
        } else if(this.instruccion.length > 0){ 
            columnasList = this.instruccion;
            if (this.expresion ==null) {
                console.log(`Table size: ${tableSize}`)
                for (let index = 0; index < tableSize; index++) {
                    let auxMap = auxTable.getMapList(index);
                        console.log('Se agrega en la posicion: '+index)
                        var keyList = auxTable.getKeyList();
                        var filaas = [];
                        for (const [nombreColumna, valor] of auxMap) {
                            console.log('==========================')
                            console.log('==========================');
                            if (this.instruccion.includes(nombreColumna)) {
                                console.log(`NombreColumna ${nombreColumna} esta en la lista de filas deseadas`)
                                filaas.push(valor);
                                
                            } else {
                                
                                console.log(`NombreColumna ${nombreColumna} no esta en la lista de filas deseadas`)
                            }

                            console.log('==========================')
                        }   
                        resultado.push(filaas);                     
                        
                    
                }  
                           
                
            } else {
                console.log(`Table size: ${tableSize}`)
                for (let index = 0; index < tableSize; index++) {
                    let auxMap = auxTable.getMapList(index);
                    this.expresion.map1 = auxMap;
                    var value = this.expresion.interpretar(entorno,lista_errores);
                    console.log(`Value: ${value.valor}`)
                    if (value.valor) {
                        console.log('Se agrega en la posicion: '+index)
                        var keyList = auxTable.getKeyList();
                        var filaas = [];
                        for (const [nombreColumna, valor] of auxMap) {
                            console.log('==========================')
                            console.log('==========================');
                            if (this.instruccion.includes(nombreColumna)) {
                                console.log(`NombreColumna ${nombreColumna} esta en la lista de filas deseadas`)
                                filaas.push(valor);
                                
                            } else {
                                
                                console.log(`NombreColumna ${nombreColumna} no esta en la lista de filas deseadas`)
                            }

                            console.log('==========================')
                        }   
                        resultado.push(filaas);                     
                        
                    } else {
                        
                    }
                    
                }  
            }
        }
        console.log('==========================')
        console.log('Columnas: ' ,columnasList);
        console.log('resultado selecteee',resultado);
        
        var mark = `${this.tableName}\n`;
        mark += ''
        for (let index = 0; index < columnasList.length; index++) {
            mark += `| ${columnasList[index]} `;
            if (index + 1 == columnasList.length) {
                mark += '|'
                
            }
        }
        
        mark += '\n';
        
        for (let index = 0; index < columnasList.length; index++) {
            mark += '| --------- ';
        }
        
        mark += '|\n';
        
        for (let index = 0; index < resultado.length; index++) {
            let array = resultado [index];
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (array[index] == null) {
                    mark += `|    `;
                    
                }else{ 
                    mark += `| ${array[index]} `;
                }
                if (index + 1 == array.length) {
                    mark += '|'
                    
                }
                
            }
            mark += '\n';
        }

        console.log('=========================')
        agregarSelect(mark);
        console.log('-----------------------------------')
        return mark;

    }

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ""
        }

        let labels = '';
        let uniones = '';
        let salida = '';
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let SelectDad = obtenerContador();
        labels += `${SelectDad} [label="SelectG"]\n`
        let Rselect = obtenerContador();
        labels += `${Rselect} [label ="select"]\n`;
        let Risnt = obtenerContador(); 
        labels += `${Risnt} [label ="instSelect"]\n`;
        let Rfrom = obtenerContador();
        labels += `${Rfrom} [label ="from"]\n`;
        let Rid  = obtenerContador(); 
        labels += `${Rid} [label ="ID"]\n`;
        let Idvalue = obtenerContador(); 
        labels += `${Idvalue} [label ="${this.tableName}"]\n`;
        uniones += `${Rid} -- ${Idvalue}\n`
        uniones += `${SelectDad} -- ${Rselect}\n`;
        uniones += `${SelectDad} -- ${Risnt}\n`;
        uniones += `${SelectDad} -- ${Rfrom}\n`;
        uniones += `${SelectDad} -- ${Rid}\n`;
        if (this.instruccion == '*') {
            let Rasterisco = obtenerContador();
            labels += `${Rasterisco} [label ="*"]\n`; 
            uniones += `${Risnt} -- ${Rasterisco}\n`; 
        }else { 
            let array = this.instruccion;
            let Rlist = obtenerContador(); 
            labels += `${Rlist} [label ="listColumnas"]\n`;
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                let idColumn = obtenerContador();
                let columnId = obtenerContador();
                labels += `${idColumn} [label ="${element}"]\n`;
                labels += `${columnId} [label ="columnId"]\n`;
                uniones += `${Rlist} -- ${columnId}\n`;
                uniones += `${columnId} -- ${idColumn}\n`;
                if (index + 1 != array.length) {
                    let coma = obtenerContador();
                    labels += `${coma} [label ="," ]\n`;
                    uniones += `${Rlist} -- ${coma}\n`;   
                }
            } 
            uniones += `${Risnt} -- ${Rlist}\n`;  
        }



        if (this.expresion!=null) {
            let Rwhere = obtenerContador();
            labels += `${Rwhere} [label ="where"]\n`;
            let exp = this.expresion.generarAst(); 
            uniones += exp.cadena;
            uniones += `${Rwhere} -- ${exp.padre}\n`;
            uniones += `${SelectDad} -- ${Rwhere}`
        } else {
            
        }
        uniones += `${instPadre} -- ${SelectDad}`
        salida += labels + uniones;
        console.log('==================================')
        console.log(salida)
        node.cadena = salida;
        node.padre = instPadre;
        return node;
        //      
        //Select *from Id where?null


    }
}
module.exports = SelectTable;