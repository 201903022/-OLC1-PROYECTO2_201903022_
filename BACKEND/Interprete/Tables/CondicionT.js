const TipoDato = require('../Enums/TipoDato.js')
const Dato = require('../Clases/Dato.js');
const Instruction = require('../Clases/Instruction.js');
const TipoOp = require('../Enums/TipoOp.js');
let obtenerContador  = require('../Arbol/datos.js');

var Logicas = [
    TipoOp.AND,TipoOp.IGUAL,TipoOp.MAYORIK,
    TipoOp.MAYORK,TipoOp.MENORIK,TipoOp.MENORK,
    TipoOp.OR,TipoOp.NOT
]; 

var Relacionales = [
    TipoOp.MAYORIK,TipoOp.MAYORK,TipoOp.MENORIK,
    TipoOp.MENORK,TipoOp.IGUAL
];

var Logicaas1 = [ 
    TipoOp.AND,TipoOp.OR,TipoOp.NOT
];

var tipoDatosArray = [ 
    TipoDato.INT,TipoDato.DOUBLE,TipoDato.VARCHAR,
    TipoDato.DATE,TipoDato.BOOLEAN
];

class CondicionT extends Instruction {
    constructor (OpIzq, OpDer,isNot, tipo, fila, columna){
        super();
        this.OpIzq = OpIzq;
        this.OpDer = OpDer;
        this.isNot = isNot;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.valueId = 'null';
        //imprimir newCondicion
        this.map1  ;
       // console.log(`Condicion: ${this.OpIzq.valor} ${this.tipo} ${this.OpDer.valor}`)
    }
//Obtener un mapa de la tabla donde sea columna,valor en posicion 
// donde Opleft.tipo = ID buscar en el mapa el valor 
    interpretar(entorno,lista_errores){ 
        if (!this.isNot) {
            var OpLeft = this.OpIzq.interpretar(entorno,lista_errores); 
            this.OpIzq.valueId= this.valueId; 
            this.OpIzq.map1= this.map1;         
        } 
        this.OpDer.valueId = this.valueId;
        this.OpDer.map1 = this.map1;
        var resultado = false;
        var OpRight = this.OpDer.interpretar(entorno,lista_errores); 
        console.log('--------Interpretar Condicion--------')
        if (Logicas.includes(this.tipo)) {
            console.log('Si es una condicion aceptada');
            if (Relacionales.includes(this.tipo)) {
                if (OpLeft.tipo == TipoDato.ID && tipoDatosArray.includes(OpRight.tipo)) {
                    console.log('Operacion relacional valida ');
                    console.log(`${this.OpIzq.valor} ${this.tipo} ${OpRight.valor}`);
                    console.log(`this.map1.get(OpLeft.valor) ${this.map1.get(OpLeft.valor)}`)

                    switch (this.tipo) {
                        //IGUAL
                        case TipoOp.IGUAL:
                            console.log('IGUAL')
                            try {
                                console.log(`${this.map1.get(OpLeft.valor)} == ${OpRight.valor}`);
                                if (this.map1.get(OpLeft.valor) == OpRight.valor) {
                                    console.log('Si son iguales')
                                    resultado = true;
                                }
                                return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                            } catch (error) {
                                
                            }
                        case TipoOp.MENORIK: 
                            console.log('MENORIK')
                            try {
                                if (this.map1.get(OpLeft.valor) <= OpRight.valor) {
                                    console.log(`${this.valueId} <= ${OpRight.valor}`)
                                    resultado = true;
                                }
                                return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                            } catch (error) {
                                console.log(`Errorrn TipoOp.MENORIKs`)
                            }
                        case TipoOp.MENORK: 
                            console.log('MENORK')
                            try {
                                if (this.map1.get(OpLeft.valor) < OpRight.valor) {
                                    console.log(`${this.valueId} < ${OpRight.valor}`)
                                    resultado = true;
                                }
                                return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                            } catch (error) {
                                console.log(`Errorrn TipoOp.MENORK`)
                            }
            
                        case TipoOp.MAYORIK: 
                            console.log('MAYORIK')
                            try {
                                if (this.map1.get(OpLeft.valor) >= OpRight.valor) {
                                    console.log(`${this.valueId} >= ${OpRight.valor}`)
                                    resultado = true;
                                }
                                return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                            } catch (error) {
                                console.log(`Errorrn TipoOp.MAYORIK`)
                            }
                        case TipoOp.MAYORK:
                            console.log('MAYORK')
                            console.log(`Value: ${this.OpIzq.valor}`)
                            console.log(`${this.map1.get(OpLeft.valor)} > ${OpRight.valor}`)
                            try {
                                if (this.map1.get(OpLeft.valor) > OpRight.valor) {
                                    console.log(`${this.map1.get(OpLeft.valor)} > ${OpRight.valor}`)
                                    console.log('Si es mayor')
                                    resultado = true;
                                }
                                return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                            } catch (error) {
                                console.log(`Errorrn TipoOp.MAYORK ${error}`)
                            }
                    
                        default:
                            break;
                    }
                } else {    
                    
                }
                

                
            } else if(Logicaas1.includes(this.tipo)) {
                switch (this.tipo) {
                    case TipoOp.AND:
                        console.log('AND')
                        if (OpLeft.valor && OpRight.valor) {
                            resultado = true;
                            console.log('Si se cumple ')
                        }
                        return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                                                
                    
                    case TipoOp.OR: 
                        console.log('OR')
                        if (OpLeft.valor || OpRight.valor) {
                            resultado = true;
                            console.log('Si se cumple ')
                        }
                        return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);
                    case TipoOp.NOT: 
                        console.log('NOT')
                        if (!OpRight.valor) {
                            resultado = true;
                            console.log('Valor not ')
                        }
                        return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);
                    default:
                        
                        break;
                }
                
            }else{ 
                console.log('No es una condicion aceptada')
                return new Dato(false, TipoDato.BOOLEAN, this.linea, this.columna);
            }

            
        } else {
            //add listaErorres
            console.log('No es una condicion aceptada');
            return new Dato(false, TipoDato.BOOLEAN, this.linea, this.columna);
            
        }
        console.log('----------------------------------')

    }

    generarAst(){ 
        let node = { 
            padre: -1, 
            cadena: ''
        }
        let salida = ''; 
        let labels = '';
        let uniones = '';
        var OpLeft;
        var OpRight = this.OpDer.generarAst(); 
        if (!this.isNot) {
             OpLeft = this.OpIzq.generarAst(); 
        }
        if (Relacionales.includes(this.tipo)) {
            let IDvalue1 = this.OpIzq.valor;
            let Rrelacional = obtenerContador();
            labels += `${Rrelacional} [label="Condicion_Relacional"]\n`
            let RId = obtenerContador();
            labels += `${RId} [label = "ID" ]\n`
            let IdValue = obtenerContador();
            labels += `${IdValue} [label = "${IDvalue1}" ]\n` 
            let operador = obtenerContador(); 
            labels += `${operador} [label = "${this.tipo}" ]\n`
            uniones += `${RId} -- ${IdValue}\n`
            uniones += `${Rrelacional} -- ${RId}\n`
            uniones += `${Rrelacional} -- ${operador}\n`
            uniones += `${Rrelacional} -- ${OpRight.padre}\n`
            salida += labels;
            salida += uniones;
            salida += OpRight.cadena;
            node.cadena = salida;
            node.padre = Rrelacional;
            console.log(salida);
            return node;
        } else if(Logicaas1.includes(this.tipo)) {
            let Rlogico = obtenerContador();
            labels += `${Rlogico} [label="Condicion Logica"]\n`
            if (this.tipo == TipoOp.NOT) {
                let RNot = obtenerContador(); 
                labels += `${RNot} [label="NOT"]\n`
                uniones += `${Rlogico} -- ${RNot}\n`
                uniones += `${Rlogico} -- ${OpRight.padre}\n`
                salida += labels;
                salida += uniones;
                node.cadena = salida;
                node.padre = Rlogico;
                console.log(salida);
                return node; 
            } else {
                let operacion = obtenerContador(); 
                labels += `${operacion} [label="${this.tipo}"]\n`
                uniones += `${Rlogico} -- ${OpLeft.padre}\n`
                uniones += `${Rlogico} -- ${operacion}\n`
                uniones += `${Rlogico} -- ${OpRight.padre}\n`
                salida += labels;
                salida += uniones;
                node.cadena = salida;
                node.padre = Rlogico;
                console.log(salida);
                return node;   
            }
            
        }



    }


}

module.exports = CondicionT;