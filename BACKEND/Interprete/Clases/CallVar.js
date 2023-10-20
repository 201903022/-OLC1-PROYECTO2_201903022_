const Instruction = require('./Instruction.js');

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

}

module.exports = CallVar;