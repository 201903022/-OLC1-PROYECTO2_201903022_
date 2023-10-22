const Instruction = require('./Instruction.js')
let obtenerContador  = require('../Arbol/datos.js');

class Actualizar extends Instruction{ 
    constructor(id, valor,fila,columna){
        super();
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        console.log(`Actualizacion -> ${ id } + : ${valor}`);
    }
    interpretar(entorno,lista_errores){ 
        console.log('interpretar Actualizacion de variable: '+this.id);
        try {
            this.valor = this.valor.interpretar(entorno,lista_errores);                        
        } catch (error) {
            console.log(error);
        }
        //Verificar si la variable existe en el entorno
        if (entorno.getVariable(this.id) != null) {
            //Si existe, actualizar su valor
            
            if(entorno.actualizarVariable(this.id, this.valor)){
                console.log('Variable actualizada correctamente')
            }else{
                console.log('No se puede actualizar esta variable: '+this.id)
            }
        }else{
                console.log('No se puede actualizar esta variable: '+this.id + ' no esta en el mismo entorno')
        }
    }

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }
        let labels = '';
        let uniones = '';
        let Rexp = this.valor.generarAst();
        labels += Rexp.cadena;
        let RactualizarVdad = obtenerContador(); 
        labels += `${RactualizarVdad} [label="actualizarV" ]\n`
        let Rset= obtenerContador(); 
        labels += `${Rset} [label="set" ]\n`
        let Rid = obtenerContador();
        labels += `${Rid} [label="${this.id}" ]\n`
        let equals = obtenerContador(); 
        labels += `${equals} [label="=" ]\n`

       //uniones 
        uniones += `${RactualizarVdad} -- ${Rset}\n`
        uniones += `${RactualizarVdad} -- ${Rid}\n`
        uniones += `${RactualizarVdad} -- ${equals}\n`
        uniones += `${RactualizarVdad} -- ${Rexp.padre}\n`

        node.cadena = labels + uniones; 
        node.padre = RactualizarVdad;
        return node;
    }
}

module.exports = Actualizar;