const Instruction = require('./Instruction.js');
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');
const MaxIteraciones = 100;
let iteraciones = 0; 
class WhileT extends Instruction{ 
    constructor(expresion,instrucciones,fila,columna) { 
        super();
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar While')
        const nameEntorno = "WhileL"+this.fila.toString() + this.columna.toString();
        const WhileEntorno = new Entorno(nameEntorno,entorno);
        let exp = this.expresion.interpretar(WhileEntorno,lista_errores);
        do {
            console.log('Condicion verdadera');
            //foreach Instrucciones 
            this.instrucciones.forEach(element => {
                element.interpretar(WhileEntorno,lista_errores)
            });
            exp = this.expresion.interpretar(WhileEntorno,lista_errores);
            iteraciones++;
            
        } while (exp.valor && iteraciones < MaxIteraciones
            );
    }
}
module.exports = WhileT;