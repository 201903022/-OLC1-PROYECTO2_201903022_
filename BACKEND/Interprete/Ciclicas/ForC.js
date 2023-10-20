const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

class ForC extends Instruction{
    constructor(id,inicio,fin,fila,columna){
        super();
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion ForC')
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretando ciclo for'); 
        for (let index = this.inicio; index < this.fin; index++) {
            const element = array[index];
            
        }
    }
}
module.exports=ForC;