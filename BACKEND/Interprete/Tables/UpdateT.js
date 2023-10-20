const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

class UpdateT extends Instruction{ 
 constructor(tablename,valores,condicion,fila,columna){ 
        super(); 
        this.tablename = tablename;
        this.valores = valores;
        this.condicion = condicion;
        this.fila = fila;
        this.columna = columna;
 }
    interpretar(entorno,lista_errores){ 
            console.log('=========================================');
            console.log('--------Interpretar UpdateT--------');
             
            console.log('valores: ',this.valores);
            
            var columnasList = [ ]; 

            for (let index = 0; index < this.valores.length; index++) {
                this.valores[index][0] = this.valores[index][0].interpretar(entorno,lista_errores);
                this.valores[index][1] = this.valores[index][1].interpretar(entorno,lista_errores);
                columnasList.push( this.valores[index][0].valor)
            }
            console.log('valores: ',this.valores);
            console.log('ColumnasList ',columnasList);
            var auxTable = entorno.getTable(this.tablename);
            console.log(`Table ${auxTable.mostrarTabla()}`);
            if (auxTable != null) {
                var tableSize = auxTable.sizeLenght;
                for (let index = 0; index < tableSize; index++) {
                    let auxMap = auxTable.getMapList(index);
                    this.condicion.map1 = auxMap;
                    var value = this.condicion.interpretar(entorno,lista_errores);
                    console.log(`Value: ${value.valor}`)
                    if (value.valor) {
                        
                        console.log('Se modifica en la posicion: '+index)
                        for (const [nombreColumna, valor] of auxMap) {
                            console.log('==========================')
                            console.log('==========================')
                            if (columnasList.includes(nombreColumna)) {
                                console.log('Se modifica la columna: '+nombreColumna)
                                var indexC = columnasList.indexOf(nombreColumna);
                                console.log('indexC: '+indexC)
                                var auxC = this.valores[indexC][0];
                                var auxAdd = this.valores[indexC][1];
                                console.log(`Agregar ${auxAdd.valor} en columna: ${auxC.valor}`)
                                auxTable.updateValue(nombreColumna,index,auxAdd);
                                
                            } else {
                                
                            }
                            console.log('==========================')
                        }   
                        
                    } else {
                        
                    }
                    
                }  

                entorno.updateTable(auxTable.name,auxTable);
                console.log(`Table ${auxTable.mostrarTabla()}`);
            } else {
                console.log('Tabla no encontrada')
            }
            console.log('=========================================')
    }
}
module.exports = UpdateT;