const Instruction = require('./Instruction.js');
const Entorno = require('../Entornos/Entorno.js');
const TipoOp = require('../Enums/TipoOp.js');
const TipoDato = require('../Enums/TipoDato.js');
let obtenerContador  = require('../Arbol/datos.js');
const {
    agregarSalir,
    agregarSelect,
    getSalida,
    getSeleccion
  } = require('../Temporales/Temporal.js');

let goElseG = true; 
let contador = 0; 

//exp1 = expresion.interpretar(); 
//expresiones = [[when,then],[when,then]]
//elses = [else,then]
class CaseT extends Instruction{ 
    constructor (exp1, expresiones,elses,as,fila,columna  ){ 
        super(); 
        this.exp1 = exp1; 
        this.expresiones = expresiones; 
        this.elses = elses; 
        this.as = as;
        this.fila = fila;

        this.columna = columna;

    }

    interpretar(entorno,lista_errores){ 
        console.log('================================')
        console.log('interpretar CaseT');
        //clg constructor
        console.log(`exp1: `,this.exp1); 
        console.log(`expresiones: `,this.expresiones);
        console.log(`elses: `,this.elses);
        console.log(`as: `,this.as);
        console.log('================================')
        let goElse = true;
        let encabezado = [' '];
        if (this.as != null ) {
            encabezado = [this.as.interpretar(entorno,lista_errores).valor]
        } else {
            
        }
        let resultado = [''];
        this.expresiones.forEach(element => {
            let WheCase = element[0];
            let ThenCase = element[1];
            let exp2 = WheCase.interpretar(entorno,lista_errores);
            if (exp2.valor) {
                console.log('entro a case');
                let exp3 = ThenCase.interpretar(entorno,lista_errores);
                //console.log('resultado',exp3);
                resultado = [exp3.valor];
                goElse=false;
                goElse = false;
                return;
                
            }  
            contador++; 

        });

        if (goElse) {
            if (this.elses != null) {
                console.log('entro a else');
                let exp3 = this.elses.interpretar(entorno,lista_errores);
                resultado = [exp3.valor];
               
            }
        }


        console.log('encabezado ',encabezado);
        console.log('resultado ',resultado); 

        var mark = ''; 
        mark += `| ${encabezado[0]} | \n`
        mark += `|--------------| \n`
        mark +=`| ${resultado[0]} | \n `
        console.log(mark);
        agregarSalir(mark);

        console.log('================================')

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
        labels += `${instPadre} [label="instruccion" ]\n`
        let casePadre = obtenerContador(); 
        labels += `${casePadre} [label="case:" ]\n`
        let Rcase = obtenerContador();
        labels += `${Rcase} [label="case" ]\n`
        let Rexp1 = this.exp1.generarAst();
        labels += Rexp1.cadena;
        let rlist = obtenerContador(); 
        labels += `${rlist} [label="listInstCase" ]\n`
        let Rexpresiones = obtenerContador();
        labels += `${Rexpresiones} [label="expresiones" ]\n`
        let Relses = obtenerContador();
        labels += `${Relses} [label="else" ]\n`
        let elseExp = this.elses.generarAst(); 
        labels += elseExp.cadena;
        let REnd = obtenerContador(); 
        labels += `${REnd} [label="end" ]\n`
        let Rasg= obtenerContador(); 
        labels += `${Rasg} [label="as" ]\n`
        uniones += `${instPadre} -- ${casePadre}\n`;
        uniones += `${casePadre} -- ${Rcase}\n`;
        uniones += `${casePadre} -- ${Rexp1.padre}\n`;
        uniones += `${casePadre} -- ${rlist}\n`;
        uniones += `${casePadre} -- ${elseExp.padre}\n`;
        uniones += `${casePadre} -- ${REnd}\n`;
        uniones += `${casePadre} -- ${Rasg}\n`;
        uniones += `${casePadre} -- ${REnd}\n`;
        
        uniones += `${casePadre} -- ${Rasg}\n`;

        salida = labels + uniones;
        node.cadena = salida;
        node.padre = instPadre;
        return node;

    }
}


module.exports = CaseT;