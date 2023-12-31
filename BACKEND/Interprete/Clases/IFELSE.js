const Instruction = require('./Instruction.js');
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');

var Logicas = [
    TipoOp.AND,TipoOp.IGUAL,TipoOp.MAYORIK,
    TipoOp.MAYORK,TipoOp.MENORIK,TipoOp.MENORK,
    TipoOp.OR,TipoOp.DIFERENTE
]; 

class IFELSE extends Instruction{
    constructor(condicion, instrucciones, instrucciones_else, fila, columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.instrucciones_else = instrucciones_else;
        this.fila = fila;
        this.columna = columna;
        console.log(`IFELSE -> ${condicion}`);
    }

    interpretar(entorno,lista_errores){ 
        console.log('Interpretar IFELSE')
        const nameEntorno = "IfL"+this.fila.toString() + this.columna.toString();

        const IfEntorno = new Entorno(nameEntorno,entorno);
        if (Logicas.includes(this.condicion.tipo)) {
            console.log('If si posee una instruccion logica');
            let condicion2 = this.condicion.interpretar(IfEntorno,lista_errores); 
            console.log(`Condicion: ${condicion2.valor}`);
                if (condicion2.valor) {
                    console.log('Condicion verdadera');
                    for (let index = 0; index < this.instrucciones.length; index++) {
                        const element = this.instrucciones[index];
                        element.interpretar(IfEntorno,lista_errores);
                    }
                } else {
                    for (let index = 0; index < this.instrucciones_else.length; index++) {
                        const element = this.instrucciones_else[index];
                        element.interpretar(IfEntorno,lista_errores);
                    }
                }
            } else {
                console.log('Error de tipos en condicion');
                lista_errores.push(`Error de tipos en condicion, fila: ${this.fila} y columna: ${this.columna}`);
            }        
        

    }

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }
        let labels = '';
        let uniones = '';
        let salida ='';
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let expresion = this.condicion.generarAst(); 
        labels += expresion.cadena;

        let IfDad = obtenerContador();
        labels += `${IfDad} [label="ifG"]\n`;
        let IfCond = obtenerContador();
        let Rif = obtenerContador(); 
        labels += `${Rif} [label="if"]\n`;
        let Rthen = obtenerContador(); 
        labels += `${Rthen} [label="then"]\n`;

        let rInstrucciones = obtenerContador(); 
        labels += `${rInstrucciones} [label="instrucciones"]\n`;
        let array = this.instrucciones; 
        array.forEach(element => {
            let aux = element.generarAst();
            labels += aux.cadena;
            uniones += `${rInstrucciones} -- ${aux.padre}\n`
        });
        let Resle = obtenerContador(); 
        labels += `${Resle} [label="else"]\n`;
        let rInstrucciones_else = obtenerContador();
        labels += `${rInstrucciones_else} [label="instrucciones"]\n`;
        let array_else = this.instrucciones_else;
        array_else.forEach(element => {
            let aux = element.generarAst();
            labels += aux.cadena;
            uniones += `${rInstrucciones_else} -- ${aux.padre}\n`
        });
        let Rend = obtenerContador(); 
        labels += `${Rend} [label="end"]\n`;
        let rIf2 = obtenerContador(); 
        labels += `${rIf2} [label="if"]\n`;
        labels += `${IfCond} [label="Condicion"]\n`;
        uniones += `${IfDad} -- ${IfCond}\n`;

        uniones += `${IfDad} -- ${Rif}\n`;
        uniones += `${IfDad} -- ${expresion.padre}\n`;
        uniones += `${IfDad} -- ${Rthen}\n`;
        uniones += `${IfDad} -- ${rInstrucciones}\n`;
        uniones += `${IfDad} -- ${Rend}\n`;
        uniones += `${IfDad} -- ${rIf2}\n`;
        uniones += `${instPadre} -- ${IfDad}\n`;
        node.cadena = labels + uniones;
        node.padre = instPadre;
        return node;
        
    }
}
module.exports = IFELSE;