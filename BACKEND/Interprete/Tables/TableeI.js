const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');

class TableeI extends Instruction{ 
    constructor(name,columnas,fila,columna){ 
        super(); 
        this.name = name;
        this.columnas = columnas;
        this.fila = fila;
        this.columna = columna;
        this.Table1 = new Map();
        this.MapColumns = new Map(); 
        this.sizeLenght  = 0;
        console.log('nueva tabla')
    }
    agregarColumna(nombreColumna,tipo) {
        // Crea una nueva columna representada como un array vacío
        console.log(`agregando columna ${nombreColumna} tipo ${nombreColumna}`)
        this.Table1.set(nombreColumna, []);
        this.MapColumns.set(nombreColumna,tipo)
        
    }

    deleteColumn(posicion){ 
        for (const miArray of Table1.values()) {
            if (posicion >= 0 && posicion < miArray.length) {
              miArray.splice(posicion, 1);
            } else {
                //errores.push
              console.log('La posición a eliminar está fuera de los límites del array.');
            }
          }
    }
    getNewMap(posicion){ 
        var keys 
    }

    getKeyList(){ 
        console.log('============================================================================')
        var keys = [];
        for (const [key, value] of this.Table1) {
            keys.push(key);
            console.log(key+" value " +value);
        }
        console.log('============================================================================')
        return keys;
    }

    getMapList(position){ 
        console.log('=============getMapList===================')
        let auxMap = new Map();
        for (const [nombreColumna, valores] of this.Table1) {
            console.log(`Columna "${nombreColumna}" valor: ${valores[position]} :`);
            auxMap.set(nombreColumna,valores[position]);
        }
        
        console.log(`AuxMap: ${auxMap}`)
        return auxMap;

    }


    agregarValor(nombreColumna, valor) {
        if (this.Table1.has(nombreColumna)) {
            // Obtiene la columna existente y agrega el valor
            const columna = this.Table1.get(nombreColumna);
            if (this.MapColumns.get(nombreColumna) == valor.tipo || valor.tipo == TipoDato.NULL) {
                columna.push(valor.valor);
            } else {
                console.log(`Error de compatibilidad en columna: ${nombreColumna} se esperaba un dato tipo ${this.MapColumns.get(nombreColumna)}`)
            }
        } else {
            console.error(`La columna "${nombreColumna}" no existe en la tabla.`);
        }
    }
    eliminarColumna(nombreColumna) {
        if (this.Table1.has(nombreColumna)) {
            // Elimina la columna del mapa
            this.MapColumns.delete(nombreColumna);
            this.Table1.delete(nombreColumna);
        } else {
            console.error(`La columna "${nombreColumna}" no existe en la tabla.`);
        }
    }
    obtenerColumna(nombreColumna) {
        console.log('obtener columna')
        if (this.Table1.has(nombreColumna)) {
            // Retorna la columna como un array
            console.log('si tiene la columna buscada')
            console.log(this.Table1.get(nombreColumna))
            return this.Table1.get(nombreColumna);
        } else {
            console.error(`La columna "${nombreColumna}" no existe en la tabla.`);
            return null;
        }
    }
    renombrarColumna(nombreAntiguo, nombreNuevo) {
        if (this.Table1.has(nombreAntiguo)) {
            // Crea una nueva columna con el nombre nuevo y copia los valores
            const columnaAntigua = this.Table1.get(nombreAntiguo);
            this.Table1.set(nombreNuevo, [...columnaAntigua]);
            //Map
            const tipo = this.MapColumns.get(nombreAntiguo);
            this.MapColumns.set(nombreNuevo,tipo);

            // Elimina la columna antigua si es necesario
            this.Table1.delete(nombreAntiguo);
        } else {
            console.error(`La columna "${nombreAntiguo}" no existe en la tabla.`);
        }
    }

    mostrarTabla() {

        console.log(`Tabla: ${this.name}`)
        console.log(`Size: ${this.sizeLenght}`)
        // Recorre todas las columnas en la tabla
        for (const [nombreColumna, valores] of this.Table1) {
            console.log(`Columna "${nombreColumna}" :`);
            valores.forEach((valor, index) => {
                console.log(`   Fila ${index + 1}: ${valor}`);
            });
        }
    }

    selectColumnas(columnas, condicion,instruccion) {
        const resultado = [];
        if (columnas == '*' && condicion == null) {
            this.mostrarTabla();
            
        } else if(columnas == '*' && condicion != null) {
            
        }
        const stockColumna = this.obtenerColumna('stock'); // Obten la columna 'stock'

        if (!stockColumna) {
            console.error('La columna "stock" no existe en la tabla.');
            return resultado;
        }

        // Evaluar la condición y agregar los datos que cumplan en el resultado

        

        return resultado;
    }

    updateValue(column,index,newValue){ 
        console.log('updateValue')
        console.log(`Columna: ${column}`)
        console.log(`Index: ${index}`)
        console.log(`newValue: ${newValue}`)
        if (this.Table1.has(column)) {
            // Obtiene la columna existente y agrega el valor
            const columna = this.Table1.get(column);
            console.log('columana[index] : ' + columna[index])
            columna[index] = newValue.valor;
        } else {
            console.error(`La columna "${column}" no existe en la tabla.`);
        }


    }

  
    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Tabla--------')
        //corroborar si el nombre ya existe en el entorno: 
        if (entorno.getTable(this.name) != null) {
            console.log(`La tabla "${this.name}" ya existe en el entorno actual.`)
            return;
        }
        for (let index = 0; index < this.columnas.length; index++) {
            console.log(`Name: ${this.columnas[index].name}`)
            console.log(`Tipo: ${this.columnas[index].tipo}`)
            var aux = this.columnas[index];
            this.agregarColumna(aux.name,aux.tipo);            
        }
        console.log('Comprobando si la columna ')

        console.log('fin del segundo for')
        console.log(`Table final: ${this.Table1}`)
        this.mostrarTabla();
        //Agregarlo al Entorno
        entorno.addTable(this.name,this);
        console.log('------------------------------------');
        return undefined
    }

    generarAst(){ 
        let node = { 
            padre:-1,
            cadena:"",
        }
        let instPadre = obtenerContador()
        let labels = `${instPadre} [label="instruccion"]\n`
        let create1 = obtenerContador();
        let createR = obtenerContador(); 
        let rTable = obtenerContador();
        let id = obtenerContador(); 
        let idValue = obtenerContador();
        let parA = obtenerContador();
        let listColumnas = obtenerContador();
        let parC = obtenerContador();

        var cadena = `${create1} [label="CREATE_TABLE"]\n`+
        `${createR} [label="create"]\n`+ 
        `${rTable} [label="table"]\n`+
        `${id} [label="id" ]\n`+
        `${idValue} [label="${this.name}" ]\n`+
        `${parA} [label="(" ]\n`+
        `${listColumnas} [label="lisatColumnas" ]\n`+
        `${parC} [label=")" ]\n`+

        '';
        console.log('columnas length: '+  this.columnas.length);
        if (this.columnas.length == 1) {
            let columnasCreate = obtenerContador();
            let idColumna = obtenerContador(); 
            let idTipo = obtenerContador();
            let idValueC = obtenerContador(); 
            let tipoDato = obtenerContador(); 
            
            cadena += `${columnasCreate} [label="columnasCreate"]\n`
            cadena += `${idColumna} [label="ID"]\n`
            cadena += `${idTipo} [label="TipoDato"]\n`
            cadena += `${idValueC} [label="${this.columnas[0].name}"]\n`
            cadena += `${tipoDato} [label="${this.columnas[0].tipo}"]\n`    
            cadena += `${columnasCreate} -- ${idColumna} \n`
            cadena += `${columnasCreate} -- ${idTipo} \n`
            cadena += `${idColumna} -- ${idValueC} \n`
            cadena += `${idTipo} -- ${tipoDato} \n`
            cadena += `${listColumnas} -- ${columnasCreate} \n`
        } else if (this.columnas.length > 1) {
            console.log('-------------mayore k 1')
            for (let index = 0; index < this.columnas.length; index++) {
                let columnasCreate = obtenerContador();
                let idColumna = obtenerContador(); 
                let idTipo = obtenerContador();
                let idValueC = obtenerContador(); 
                let tipoDato = obtenerContador(); 
                let coma = obtenerContador();
                let listaColumnas2 = obtenerContador();
                let columnaAnterior ;
                let columnaDespues;
                cadena += `${columnasCreate} [label="columnasCreate"]\n`
                cadena += `${idColumna} [label="ID"]\n`
                cadena += `${idValueC} [label="${this.columnas[index].name}"]\n`
                cadena += `${tipoDato} [label="${this.columnas[index].tipo}"]\n`    
                cadena += `${listaColumnas2} [label="listaColumnas"]\n`
                cadena += `${coma} [label=","]\n`
                cadena += `${idTipo} [label="TipoDato"]\n`
                cadena += `${columnasCreate} -- ${idColumna} \n`
                cadena += `${columnasCreate} -- ${idTipo} \n`
                cadena += `${idColumna} -- ${idValueC} \n`
                cadena += `${idTipo} -- ${tipoDato} \n`
                cadena += `${listColumnas} -- ${columnasCreate} \n`  
                cadena += `${listColumnas} -- ${coma} \n`  

            }
            
        } else {
            
        }  {
        
        }
        cadena += `${create1} -- ${createR} \n`
        cadena += `${create1} -- ${rTable} \n` 
        cadena += `${create1} -- ${id} \n` 
        cadena += `${create1} -- ${parA} \n` 
        cadena += `${create1} -- ${listColumnas} \n` 
        cadena += `${create1} -- ${parC} \n` 
        cadena += `${id} -- ${idValue} \n` 
        cadena += `${instPadre} -- ${create1} \n` 

        console.log(cadena)
        node.padre = instPadre;
        node.cadena = cadena;
        return node;
    }
}

module.exports = TableeI;