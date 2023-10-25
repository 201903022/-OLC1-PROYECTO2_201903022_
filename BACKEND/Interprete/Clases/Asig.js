const Instruction = require ('./Instruction.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');

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
        console.log('Interpretar Asignacion de ' + this.id)
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

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }

        let labels = '';
        let uniones = '';
        let salida = ''; 
        let instDad = obtenerContador()
        labels += `${instDad} [label="instruccion"]\n`
        let asig = obtenerContador(); 
        labels += `${asig} [label="asignaciones1"]\n`
        if (this.valor != null) {
            let rAsignacionDefault = obtenerContador(); 
            labels += `${rAsignacionDefault} [label="AsignacionDefault"]\n`
            let RdeclarAsig = obtenerContador(); 
            labels += `${RdeclarAsig} [label="DeclarAsig"]\n`
            let Rvariable = obtenerContador(); 
            labels += `${Rvariable} [label="Variable"]\n`
            let tipoDatog= obtenerContador();
            labels += `${tipoDatog} [label="TipoDato"]\n`
            let tipoDato = obtenerContador();
            labels += `${tipoDato} [label="${this.tipo}"]\n`
            let Rdefault = obtenerContador(); 
            labels += `${Rdefault} [label="Default"]\n`
            let exp = this.valor.generarAst(); 
            labels += `${exp.cadena}`
            uniones +=`${tipoDatog} -- ${tipoDato}\n`;
            uniones +=`${rAsignacionDefault} -- ${RdeclarAsig}\n`;
            uniones +=`${rAsignacionDefault} -- ${Rvariable}\n`;
            uniones +=`${rAsignacionDefault} -- ${tipoDatog}\n`;
            uniones +=`${rAsignacionDefault} -- ${Rdefault}\n`;
            uniones +=`${rAsignacionDefault} -- ${exp.padre}\n`;
            uniones +=`${asig} -- ${rAsignacionDefault}\n`;
            
        } else {
            let Rdeclare = obtenerContador(); 
            labels += `${Rdeclare} [label="declare"]\n`
            let listAsignaciones = obtenerContador(); 
            labels += `${listAsignaciones} [label="list_asignaciones"]\n`
            let Rasignacion = obtenerContador(); 
            labels += `${Rasignacion} [label="asignacion1"]\n`
            let Rvariable = obtenerContador();
            labels += `${Rvariable} [label="Variable"]\n`
            let tipoDatog= obtenerContador();
            labels += `${tipoDatog} [label="TipoDato"]\n`
            let tipoDato = obtenerContador();
            labels += `${tipoDato} [label="${this.tipo}"]\n`
            uniones +=`${listAsignaciones} -- ${Rasignacion}\n`;
            uniones +=`${tipoDatog} -- ${tipoDato}\n`;
            uniones +=`${Rasignacion} -- ${Rvariable}\n`;
            uniones +=`${Rasignacion} -- ${tipoDatog}\n`;
            uniones +=`${asig} -- ${Rdeclare}\n`;
            uniones +=`${asig} -- ${listAsignaciones}\n`

        }
        uniones += `${instDad} -- ${asig}\n`
        node.cadena = labels + uniones;
        node.padre = instDad;
        return node;

    }
}

module.exports = Asig;