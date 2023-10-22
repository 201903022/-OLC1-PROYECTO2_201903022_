const Instruction = require('./Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');

//lamar a una variable
class CallVar extends Instruction{
    constructor(id, fila, columna){
        super();
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        console.log(`CallVar :${id}`)
    }

    interpretar(entorno,lista_errores){
        console.log('Interpretar CallVar')
        //Verificar si la variable existe en el entorno
        if (entorno.getVariable(this.id) != null) {
            //Si existe, retornar su valor
            let aux = entorno.getVariable(this.id).valor;
             console.log(entorno.getVariable(this.id));
            // console.log('Aux: ' + aux);
             return aux;

        }else{
            console.log('No se puede llamar esta variable')
        }
    
    }
    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }
        let labels = '';
        let uniones = '';
        let salida = '';
        let exp = obtenerContador(); 
        labels += `${exp} [label="expresion" ]\n`
        
        let rId = obtenerContador();
        labels += `${rId} [label="${this.id}" ]\n`
        uniones += `${exp} -- ${rId}\n`
        node.cadena = labels + uniones; 
        node.padre = exp;
        return node;
    }

}

module.exports = CallVar;