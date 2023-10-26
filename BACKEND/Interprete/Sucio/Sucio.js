

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
       try {
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
       } catch (error) {
        console.log('Error en interpretar el select: ' + error);
       }

        



    }

    generarAst(){ 

        let node = { 
            padre: -1, 
            cadena: ''
        };

        let instPadre = obtenerContador();
        let labels = '';
        let uniones = '';
        let Rselect = obtenerContador();
        labels += `${instPadre} [label="instruccion" ]\n`
        labels += `${Rselect} [label="select" ]\n`
        let selectG = obtenerContador(); 
        labels += `${selectG} [label="select: " ]\n`; 
        let rListado = obtenerContador();
        labels += `${rListado} [label="listado: " ]\n`;
        let rInstruccion = obtenerContador(); 
        labels += `${rInstruccion} [label="instruccionSelect: " ]\n`;

        uniones += `${selectG} -- ${Rselect}\n`;
        uniones += `${selectG} -- ${rInstruccion}\n`;
        uniones += `${rInstruccion} -- ${rListado}\n`;
        switch (this.tipoSelect) {
            case TipoSelect1.ALL:
                    let rAsteriso = obtenerContador();
                    labels += `${rAsteriso} [label="*"]\n`;
                    uniones += `${rListado} -- ${rAsteriso}\n`
                    if (this.from != null) {
                        let rFrom = obtenerContador(); 
                        labels += `${rFrom} [label="from: " ]\n`;
                        let rFrom2 = obtenerContador(); 

                        let rTable = obtenerContador();
                        labels += `${rTable} [label="${this.from[0]}"]\n`;
                        labels += `${rFrom2} [label="from" ]\n`;
                        uniones += `${rFrom} -- ${rFrom2}\n`;
                        uniones += `${rFrom} -- ${rTable}\n`;

                        if (this.from[1]!=null) {
                            let rWher = obtenerContador();
                            labels += `${rWher} [label="where: " ]\n`;
                            let rWherg = obtenerContador(); 
                            labels += `${rWherg} [label="whereG"]\n`;
                            let rCondicion = obtenerContador();
                            let exp = this.from[1].generarAst(); 
                            labels += exp.cadena;
                            labels += `${rCondicion} [label="condicion:"]\n`;
                            
                            uniones += `${rFrom} -- ${rWherg}\n`;
                            uniones += `${rWherg} -- ${rWher}\n`;
                            uniones += `${rWherg} -- ${rCondicion}\n`;
                            uniones += `${rCondicion} -- ${exp.padre}\n`;
                            
                            
                        } else {
                            
                        }
                        uniones += `${selectG} -- ${rFrom}\n`;

                    } else {
                        
                    }
                    
                break;  
        
            case TipoSelect1.LISTCOLUMNS: 
                let rListado2 = obtenerContador();
                labels += `${rListado2} [label="listColumnsSelec:" ]\n`;
                uniones += `${rListado} -- ${rListado2}\n`;
                this.listado.forEach(element => {
                    console.log(labels + uniones)
                    let Id = obtenerContador(); 
                    labels += `${Id} [label="${element[0]}"]\n`;
                    uniones += `${rListado2} -- ${Id} \n`
                    console.log(labels + uniones)
                    if (element[1] != null) {
                        let rAs = obtenerContador();
                        labels += `${rAs} [label="as: " ]\n`;
                        let rAs2 = obtenerContador();
                        labels += `${rAs2} [label="as "]\n`;
                        console.log('antes del as')
                        let exp = element[1].generarAst();
                        labels += exp.cadena;
                        uniones += `${rAs} -- ${rAs2}\n`;
                        uniones += `${rAs} -- ${exp.padre}\n`;
                        uniones += `${Id} -- ${rAs}\n`;
                        console.log(labels + uniones)
                    } 
                });
                if (this.from != null) {
                    let rFrom = obtenerContador(); 
                    labels += `${rFrom} [label="from: " ]\n`;
                    let rFrom2 = obtenerContador(); 

                    let rTable = obtenerContador();
                    labels += `${rTable} [label="${this.from[0]}"]\n`;
                    labels += `${rFrom2} [label="from" ]\n`;
                    uniones += `${rFrom} -- ${rFrom2}\n`;
                    uniones += `${rFrom} -- ${rTable}\n`;

                    if (this.from[1]!=null) {
                        let rWher = obtenerContador();
                        labels += `${rWher} [label="where: " ]\n`;
                        let rWherg = obtenerContador(); 
                        labels += `${rWherg} [label="whereG"]\n`;
                        let rCondicion = obtenerContador();
                        let exp = this.from[1].generarAst(); 
                        labels += exp.cadena;
                        labels += `${rCondicion} [label="condicion:"]\n`;
                        uniones += `${rFrom} -- ${rWherg}\n`;
                        uniones += `${rWherg} -- ${rWher}\n`;
                        uniones += `${rWherg} -- ${rCondicion}\n`;
                        uniones += `${rCondicion} -- ${exp.padre}\n`;
                        }else{
                                
                            }
                    uniones += `${selectG} -- ${rFrom}\n`;
                }
                console.log('salio de acaaaaaa')
                break;
            case TipoSelect1.LISTEXP: 
                console.log('entro Listexp')
                let listExp = obtenerContador(); 
                labels += `${listExp} [label="listExp: " ]\n`;
                uniones += `${rListado} -- ${listExp}\n`
                let array = this.listado;
                array.forEach(element => {
                    console.log('Element ',element[0])
                    let exp = element[0].generarAst();
                    let RExpSelect = obtenerContador(); 
                    labels += `${RExpSelect} [label="expSelect:" ]\n`;
                    labels += exp.cadena;
                    uniones += `${RExpSelect} -- ${exp.padre}\n`;
                    uniones += `${listExp} -- ${RExpSelect}\n`;
                    if (element[1] != null) {
                        let rAs = obtenerContador();
                        labels += `${rAs} [label="as: " ]\n`;
                        let rAs2 = obtenerContador();
                        labels += `${rAs2} [label="as "]\n`;
                        let exp = element[1].generarAst();
                        labels += exp.cadena;
                        uniones += `${rAs} -- ${rAs2}\n`;
                        uniones += `${rAs} -- ${exp.padre}\n`;
                        uniones += `${RExpSelect} -- ${rAs}\n`;
                    } else {
                        
                    }
                    
                });
                break;
            default:
                break;
        }
        console.log('llego hasta el final')
        console.log(labels + uniones)
        uniones += `${instPadre} -- ${selectG}\n`
        node.cadena = labels + uniones;
        node.padre = instPadre;
        return node;
        


    }
}

module.exports = Sucio;