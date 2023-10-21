const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');

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

    generarAst(){ 
        let node = { 
            padre: -1,
            cadena: ''
        }
        let salida = '';
        let labels = '';
        let uniones = '';
        let Rupdate = obtenerContador(); 
        let RId = obtenerContador();
        let IdValue = obtenerContador();
        let Rset = obtenerContador();
        let Rlist = obtenerContador();
        let Rwhere = obtenerContador();
        labels += `${Rupdate} [label="update"]\n`
        labels += `${RId} [label="ID"]\n`
        labels += `${Rset} [label="set"]\n`
        labels += `${Rlist} [label="listUpdate"]\n`
        labels += `${Rwhere} [label="where"]\n`
        labels += `${IdValue} [label="${this.tablename}"]\n`
        uniones += `${RId} -- ${IdValue}\n`
        let arra = this.valores;
        for (let index = 0; index < arra.length; index++) {
                let RsetG = obtenerContador(); 
                let RIdG = obtenerContador();
                let equals = obtenerContador();
                let valueIdC = obtenerContador();
                let valueId = arra[index][0].valor;
                
                let valueSet = arra[index][1].generarAst();
                labels += `${RsetG} [label="setG"]\n`
                labels += `${RIdG} [label="ID"]\n`
                labels += `${equals} [label="="]\n`
                labels += `${valueIdC} [label="${valueId}"]\n`
                uniones += `${RIdG} -- ${valueIdC}\n`
                uniones += `${RsetG} -- ${RIdG}\n`
                uniones += `${RsetG} -- ${equals}\n`
                uniones += valueSet.cadena;
                uniones += `${RsetG} -- ${valueSet.padre}\n`
                uniones += `${Rlist} -- ${RsetG}\n`

                if (!((index + 1) == arra.length)) {
                    let coma = obtenerContador(); 
                    labels += `${coma} [label=","]\n`
                    uniones += `${Rlist} -- ${coma}\n`
                }


            
        }
        let updatePadre = obtenerContador(); 
        let Rconditions = obtenerContador(); 

        labels += `${Rconditions} [label="conditions"]\n`
        labels += `${updatePadre} [label="updateG"]\n`
        uniones += `${updatePadre} -- ${Rupdate}\n`
        uniones += `${updatePadre} -- ${RId}\n`
        uniones += `${updatePadre} -- ${Rset}\n`
        uniones += `${updatePadre} -- ${Rlist}\n`
        uniones += `${updatePadre} -- ${Rwhere}\n`
        let condicion1 = this.condicion.generarAst();
        uniones += `${Rconditions} -- ${condicion1.padre}\n`
        uniones += `${updatePadre} -- ${Rconditions}\n`

        salida += labels;
        salida += uniones;
        node.cadena += salida;
        console.log(salida)
        return node;


    }
}
module.exports = UpdateT;