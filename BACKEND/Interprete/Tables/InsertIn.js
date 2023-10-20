const TipoDato = require('../Enums/TipoDato.js')
const Dato = require('../Clases/Dato.js');
const Instruction = require('../Clases/Instruction.js');
const TipoOp = require('../Enums/TipoOp.js');


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
        
    }
}
module.exports=InsertIn;