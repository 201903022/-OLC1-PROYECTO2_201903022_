let obtenerContador  = require('../Arbol/datos.js');

class Columnas { 
    constructor(name,tipo,fila,columna){ 
        this.name = name;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva columna')
    }
}

module.exports = Columnas;