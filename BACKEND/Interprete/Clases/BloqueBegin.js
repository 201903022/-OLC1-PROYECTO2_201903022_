const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
const Entorno = require('../Entornos/Entorno.js');


class BloqueBegin extends Instruction {
    constructor(instrucciones,fila,columna) {
        super();
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){ 
        let entorno1 = new Entorno("bloqueBeginEnd",entorno); 
        console.log('Interpretar Bloque Begin')
        for (let index = 0; index < this.instrucciones.length; index++) {
            const element = this.instrucciones[index];
            element.interpretar(entorno1,lista_errores);
        }
    }

    generarAst() { 
        let node = { 
            padre: -1, 
            cadena: ''
        }

        let labels = '';
        let uniones = '';
        let salida = '';  
        let instDad = obtenerContador()
        labels += `${instDad} [label="instruccion"]\n`       
        let beginEnd = obtenerContador();
        labels += `${beginEnd}[label="beginEnd"];\n`;

        let Rbegin = obtenerContador(); 
        labels += `${Rbegin} [label="Begin"];\n`
        let Redn = obtenerContador(); 
        labels += `${Redn} [label="End"];\n`
        let RinstB = obtenerContador(); 
        labels += `${RinstB} [label="instruccionBegin"];\n`

        //unir beginEnd con todo 
        uniones += `${beginEnd} -- ${Rbegin};\n`
        uniones += `${beginEnd} -- ${RinstB};\n`
        uniones += `${beginEnd} -- ${Redn};\n`

        let array = this.instrucciones;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let hijo = element.generarAst();
            labels += hijo.cadena;
            uniones += `${RinstB} -- ${hijo.padre};\n`
        }
        //unir padre con beginEnd
        uniones += `${instDad} -- ${beginEnd};\n`
        node.cadena = labels + uniones; 
        node.padre = instDad; 
        return node; 

    }
    
    
}

module.exports = BloqueBegin;