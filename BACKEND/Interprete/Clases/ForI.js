const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
let Entorno = require('../Entornos/Entorno.js');
class ForI extends Instruction { 
    constructor(id,from,to,instrucciones, fila,columna) { 
        super(); 
        this.id = id;
        this.from = from;
        this.to = to;
        this.fila = fila;
        this.columna = columna;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno,lista_errores){ 
        console.log('===========================================')
        let entorno1 = new Entorno("entornoFor",entorno);
        console.log('Interpretar For '); 
        let i = this.from;
        let contador = this.to;
        entorno1.addVariable(this.id);
        for (let index = i; index < contador; index++) {
            entorno1.actualizarVariable(this.id,index);
            this.instrucciones.forEach(element => {
                element.interpretar(entorno1,lista_errores);
            });

            
        }
    }
}