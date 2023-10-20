const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

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
                            console.log('==========================')
                            if (valor !=null) {
                                
                                console.log(`Columna "${nombreColumna}" valor: ${valor} :`);
                            } else {
                                console.log(`Columna "${nombreColumna}" valor:  `);
                                
                            }
                            filaas.push(valor);

                            console.log('==========================')
                        }   
                        resultado.push(filaas);                     
                        
                    } else {
                        
                    }
                    
                }  
               
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
        console.log('resultado',resultado)
        console.log('==========================')





        console.log('-----------------------------------')

    }
}
module.exports = SelectTable;