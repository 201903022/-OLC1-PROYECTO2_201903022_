const Instruction = require('./Instruction.js');
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');
const MaxIteraciones = 50;
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

    generarAst(){ 
        let node = { 
            padre: -1,
            cadena: ''
        }

        let labels = '';
        let uniones = '';
        let salida = '';
        let instPadre = obtenerContador();
        labels += `${instPadre} [label="instruccion"]\n`
        let padre = obtenerContador();
        labels += `${padre} [label="while"]\n`
        let Rwhile = obtenerContador();
        labels += `${Rwhile} [label="while"]\n`
        let exp = this.expresion.generarAst();
        labels += exp.cadena;
        let Rbegin = obtenerContador();
        labels += `${Rbegin} [label="begin"]\n`
        let rInstruccionbegin = obtenerContador(); 
        labels += `${rInstruccionbegin} [label="instBegin"] \n`
        let rend = obtenerContador();
        labels += `${rend} [label="end"]\n`
        //uniones
        uniones += `${instPadre} -- ${padre}\n`
        uniones += `${padre} -- ${Rwhile}\n`
        uniones += `${padre} -- ${exp.padre}\n`
        uniones += `${padre} -- ${Rbegin}\n`
        uniones += `${padre} -- ${rInstruccionbegin}\n`
        let array = this.instrucciones;
        array.forEach(element => {
            let inst = element.generarAst();
            labels += inst.cadena;
            uniones += `${rInstruccionbegin} -- ${inst.padre}\n`
        });
        uniones += `${padre} -- ${rend}\n`
        //salida
        salida = '\n'+labels+uniones+'\n';
        node.cadena = salida;
        node.padre = instPadre;
        return node;


        
    }
}
module.exports = WhileT;