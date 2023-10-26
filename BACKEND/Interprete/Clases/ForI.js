const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');
let Entorno = require('../Entornos/Entorno.js');
const Asig = require('../Clases/Asig.js');
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
        let i = this.from.interpretar(entorno,lista_errores).valor;
        let contador = this.to.interpretar(entorno,lista_errores).valor;
        let AsigId = new Asig(this.id,null,TipoDato.INT,this.fila,this.columna); 
        AsigId.interpretar(entorno1,lista_errores);
        
        //entorno1.addId(this.id);
        for (let index = i; index < contador; index++) {
            //entorno1.actualizarId(this.id.id ,index);
            let exp = new Dato(index,TipoDato.INT,this.fila,this.columna);
            entorno1.actualizarVariable(this.id, exp);

            this.instrucciones.forEach(element => {
                try {
                    element = element.interpretar(entorno1,lista_errores);
                } catch (error) {
                    console.log('error en for '+ error)
                }
                
            });
            entorno1.showVariables();
        }
    }

    generarAst(){ 
        let node = { 
            padre:-1,
            cadena:"",
        }
        let labels = '';
        let uniones = '';
        let salida = ''; 
        
        let instPadre = obtenerContador(); 
        labels += `${instPadre} [label="instruccion" ]\n`
        let padre = obtenerContador();
        labels += `${padre} [label="for" ]\n`
        let Rfor = obtenerContador(); 
        labels += `${Rfor} [label="for" ]\n`
        let ID = obtenerContador(); 
        labels += `${ID} [label="ID: ${this.id.id}" ]\n`
        let Rin = obtenerContador(); 
        labels += `${Rin} [label="in" ]\n`
        let from = this.from.generarAst(); 
        labels += from.cadena;
        let to = this.to;
        labels += to.cadena;
        let rBegin = obtenerContador();
        labels += `${rBegin} [label="Begin" ]\n`
        let instrucciones = obtenerContador();
        labels += `${instrucciones} [label="instrucciones" ]\n`
        let rEnd = obtenerContador();
        let array = this.instrucciones; 
        array.forEach(element => {
            let aux = element.generarAst();
            labels += aux.cadena;
            uniones += `${instrucciones} -- ${aux.padre}\n`
        });

        labels += `${rEnd} [label="End" ]\n`

        //unir todo con padre
        uniones += `${padre} -- ${Rfor}\n`
        uniones += `${padre} -- ${ID}\n`
        uniones += `${padre} -- ${Rin}\n`
        uniones += `${padre} -- ${from.padre}\n`
        uniones += `${padre} -- ${to.padre}\n`
        uniones += `${padre} -- ${rBegin}\n`
        uniones += `${padre} -- ${instrucciones}\n`
        uniones += `${padre} -- ${rEnd}\n`
        uniones += `${instPadre} -- ${padre}\n`


        node.cadena = labels + uniones; 
        node.padre = instPadre;

        return node;

    }
}

module.exports = ForI;