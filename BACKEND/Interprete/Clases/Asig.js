const Instruction = require ('./Instruction.js');
const TipoDato = require('../Enums/TipoDato.js');

class Asig extends Instruction{ 
    constructor(id, valor, tipo,fila,columna){
        super();
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        //Verificar que el tipo de variable corresponda con el valor asignado90 
        console.log('Interpretar Asignacion')
        if (this.valor != null) {
            console.log('Tiene Default')
            if (this.valor.tipo == this.tipo) {
                console.log('Todo Okay')
                try {
                    console.log('Interpretar el valor ')
                    this.valor = this.valor.interpretar(entorno,lista_errores);
                } catch (error) {
                    console.log(error)
                    
                }
                //Verificar si la variable existe en el entorno
                if (entorno.getVariable(this.id) == null) {
                    //Si no existe, agregarla al entorno
                    entorno.addVariable(this);
                }
                else {
                    //Si existe, actualizar su valor
                    console.log(`Esta variable ya esta definida ${this.id}`)
                    //entorno.actualizarVariable(this.id, this.valor);
                }
            }else{ 
                console.log(`this.valor.tipo == this.tipo ${this.valor.tipo} ${this.tipo}} `)
                console.log('No se puede asignar este valor a esta variable ' + this.id + ' valor: '+this.valor)
            }            
        } else{
            console.log('No tiene Default')
            //Verificar si la variable existe en el entorno
            if (entorno.getVariable(this.id) == null) {
                //Si no existe, agregarla al entorno
                entorno.addVariable(this);
            }
            else {
                //Si existe, actualizar su valor
                console.log(`Esta variable ya esta definida ${this.id}`)
                //entorno.actualizarVariable(this.id, this.valor);
            }
        }                            
    }
}

module.exports = Asig;