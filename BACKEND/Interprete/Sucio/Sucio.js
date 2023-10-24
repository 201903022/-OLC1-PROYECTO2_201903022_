

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
class Sucio extends Instruction{
    constructor(tipoSelect, listado, from,fila,columna) { 
        super(); 
        this.tipoSelect = tipoSelect;//''
        this.listado = listado;'[[idExp,as]]'
        this.fila = fila;
        this.columna = columna;
        this.from = from;
    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Select--------');
        console.log(`TipoSelect ${this.tipoSelect}`);
        console.log(`Listado ${this.listado}`);
        let listEncabezados = []; 
        let resultado = [];
        let tableName = this.from !=null ? this.from[0] :null;
        let condicion = this.from !=null ? this.from[1] :null;
        let auxTable = null;
        let tableSize = 0;  
       
        switch (this.tipoSelect) {
            case TipoSelect1.ALL: 
                console.log('ALL from switch');
                console.log('from[0] ' , this.from[0])
                console.log('from[1] ' , this.from[1])
                if (tableName != null) {
                    auxTable = entorno.getTable(tableName);
                    if (auxTable ==  null) {
                        agregarSalir('Revise el nombre de la tabla: '+tableName)
                    }else{
                        tableSize = auxTable.sizeLenght;
                        //agregarSalir('Tama;o de la tabla ',tableSize)
                        
                        if (condicion != null) {  
                                         
                            console.log('condicion ',condicion);  
                            listEncabezados = auxTable.getKeyList();
                            for (let index = 0; index < tableSize; index++) {

                                let auxMap = auxTable.getMapList(index);
                                condicion.map1 = auxMap; 
                                var value = condicion.interpretar(entorno,lista_errores);
                                if (value.valor) {
                                   // agregarSalir(value.valor)
                                    var filaas = [];
                                    for (const [nombreColumna, valor] of auxMap) {
    
                                        console.log('==========================')
                                        filaas.push(valor);
                                        console.log('valor ')
                                        console.log('==========================')
                                    }   
                                    resultado.push(filaas);                                                           
                                }
                                
                            }                                
                            var mark = createMark(listEncabezados,resultado,tableName);
                            agregarSelect(mark);
                            agregarSalir(mark);      
                        } else {
                            listEncabezados = auxTable.getKeyList();
                            for (let index = 0; index < tableSize; index++) {
                                let auxMap = auxTable.getMapList(index);
                                var filaas = [];
                                for (const [nombreColumna, valor] of auxMap) {
                                    console.log('==========================')
                                    filaas.push(valor);
                                    console.log('valor ')
                                    console.log('==========================')
                                }   
                                resultado.push(filaas);                         
                                
                            }   
                            var mark = createMark(listEncabezados,resultado,tableName);
                            agregarSelect(mark);
                            agregarSalir(mark);                  
                            
                        }
                    }
                    console.log('auxTable: ',auxTable); 
                    console.log('tableSize: ',tableSize);
                }

                break;
            case TipoSelect1.LISTEXP: 
                if (this.from !=null) {
                    console.log('no se puede')
                } else {
                    let array = this.listado;
                    let result = [];
                    array.forEach(element => {
                        console.log(' ',element);
                        let exp = element[0].interpretar(entorno,lista_errores);
                        let as = element[1]
                        if (as != null) 
                        {
                            listEncabezados.push(as.valor)
                            let value = exp.valor;
                            result.push(value); 
                            
                            console.log('=========================================')
                            console.log('listaEncabezados ',listEncabezados)
                            console.log('resultado ',result)
                            console.log('=========================================')
                        } else {
                            
                        }  
                        
                    }
                    );  
                    resultado.push(result); 
                    
                    var mark = createMark(listEncabezados,resultado,'');
                    agregarSelect(mark);
                    agregarSalir(mark);                     
                }
                break;
            case TipoSelect1.LISTCOLUMNS:
                console.log('LISTCOLUMNS from switch');

                console.log('listado: ',this.listado[0][0]);
                console.log('listado: ',this.listado[0][1]);
                let columnasLista = [];
                this.listado.forEach(element => {
                    columnasLista.push(element[0]);
                    
                });
                console.log(
                    'columnasList a buscar: ',columnasLista
                )

                if (tableName != null) {

                    auxTable = entorno.getTable(tableName);
                    if (auxTable ==  null) {
                        agregarSalir('Revise el nombre de la tabla: '+tableName)
                    }else{ 

                        tableSize = auxTable.sizeLenght;
                        if (condicion != null) {
                            
                            for (let index = 0; index < tableSize; index++) {
                                let auxMap = auxTable.getMapList(index);
                                condicion.map1 = auxMap; 
                                var value = condicion.interpretar(entorno,lista_errores);
                                var filaas = [];
                                if (value.valor) {
                                    for (const [nombreColumna, valor] of auxMap) {
                                        if (columnasLista.includes(nombreColumna)) {
                                            filaas.push(valor);       
                                        }                                 
                                    }   
                                    
                                } else {
                                    
                                }
                                resultado.push(filaas);                           
                            } 
                        
                            this.listado.forEach((element, index) => {
                                if (element[1] != null) {
                                    console.log(`nuevo nombre ${element[1]} de ${columnasLista[index]}`)
                                    columnasLista[index] = element[1].interpretar(entorno,lista_errores).valor;
                                } else {
                                    
                                };
                                
                            });
                            var mark = createMark(columnasLista,resultado,tableName);
                            agregarSelect(mark); 
                            agregarSalir(mark);                     
                        } else {

                            for (let index = 0; index < tableSize; index++) {
                                let auxMap = auxTable.getMapList(index);
                                var filaas = [];
                                for (const [nombreColumna, valor] of auxMap) {
                                    console.log('==========================')
                                    if (columnasLista.includes(nombreColumna)) {
                                        console.log('nombreColumna ',nombreColumna)
                                        console.log('valor ',valor)
                                        filaas.push(valor);       
                                    } else {
                                        
                                    }
                                    console.log('==========================')
                                }   
                                resultado.push(filaas);                         
                                
                            } 

                            this.listado.forEach((element, index) => {
                                if (element[1] != null) {
                                    console.log(`nuevo nombre ${element[1]} de ${columnasLista[index]}`)
                                    columnasLista[index] = element[1].interpretar(entorno,lista_errores).valor;
                                } else {
                                    
                                };
                                
                            });
                            var mark = createMark(columnasLista,resultado,tableName);
                            agregarSelect(mark);
                            agregarSalir(mark);
                        }
                    }
                    
                } else {
                    
                }
                if(this.from ==null) { 
                    
                    console.log('se requiere condicion ')
                }else{ 


                }
                break;
            default:
                break;
        }
        



    }
}

module.exports = Sucio;