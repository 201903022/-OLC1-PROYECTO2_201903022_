const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');


class Tree extends Instruction{
    constructor(nombre) {
        super();
        this.nombre = nombre;
        this.listInstrucciones;
    }
}