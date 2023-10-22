const TipoDato = require('../Enums/TipoDato.js')
const Dato = require('../Clases/Dato.js');
const Instruction = require('../Clases/Instruction.js');
const TipoOp = require('../Enums/TipoOp.js');
let obtenerContador  = require('../Arbol/datos.js');

class Expresion extends Instruction {
    constructor (OpIzq, OpDer, tipo, isUnario, fila, columna){
        super();
        this.OpIzq = OpIzq;
        this.OpDer = OpDer;
        this.isUnario = isUnario;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
    }

    interpretar(entorno,lista_errores){
            console.log('Interpretar Expresion: ');
            var OpLeft;
            var OpRight;
            
            OpLeft = this.OpIzq.interpretar(entorno,lista_errores);
            if (!this.isUnario) {
                console.log('Aint unario');
                OpRight = this.OpDer.interpretar(entorno,lista_errores);
            }
            console.log('OpLeft: ' +OpLeft.valor.valor);
            console.log('OpRight: ' +OpRight.valor.valor);
            switch (this.tipo) {
                case TipoOp.SUMA:
                    console.log('Suma');
                    if (OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT)
                    {
                        console.log('OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT')
                        var resultado = OpLeft.valor + OpRight.valor;
                        console.log('Resultado: '+resultado)
                        return new Dato(resultado,TipoDato.INT,this.fila,this.columna);
                    }
                    else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor + OpRight.valor;
                        console.log('Resultado: '+resultado)
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.INT)
                    { 
                        var resultado = OpLeft.valor + OpRight.valor;
                        console.log('Resultado: '+resultado)
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor + OpRight.valor;
                        console.log('Resultado: '+resultado)
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.INT)
                    { 
                       // console.log('OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.INT');
                        if (!isNaN(OpLeft.valor)) {
                            var resultado = parseFloat(OpLeft.valor) + OpRight.valor;
                            console.log('Resultado: '+resultado) ;
                            return new Dato(resultado,TipoDato.INT,this.fila,this.columna); 
                        } else {
                            console.log("La cadena no es un número válido. " + OpLeft.valor);
                            break;
                            
                        }
             
                    }
                    else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.VARCHAR)
                    { 
                       // console.log('OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.INT');
                        if (!isNaN(OpRight.valor)) {
                            var resultado = OpLeft.valor +  parseFloat(OpRight.valor);
                            console.log('Resultado: '+resultado) ;
                            return new Dato(resultado,TipoDato.INT,this.fila,this.columna); 
                        } else {
                            console.log("La cadena no es un número válido. " + OpRight.valor);
                            break;
                            
                        }
             
                    }
                    else if(OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        if (!isNaN(OpLeft.valor)) {
                            var resultado = parseFloat(OpLeft.valor) + OpRight.valor;
                            console.log('Resultado: '+resultado) ;
                            return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna); 
                        } else {
                            console.log("La cadena no es un número válido. " + OpLeft.valor);
                            break;
                            
                        }
             
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.VARCHAR)
                    { 
                        if (!isNaN(OpRight.valor)) {
                            var resultado = OpLeft.valor +  parseFloat(OpRight.valor);
                            console.log('Resultado: '+resultado) ;
                            return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna); 
                        } else {
                            console.log("La cadena no es un número válido. " + OpRight.valor);
                            break;
                            
                        }
             
                    }
                    //sumar 2 varchar
                    else if(OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.VARCHAR)
                    {
                        var resultado = OpLeft.valor + OpRight.valor;
                        console.log('Resultado: '+resultado)
                        return new Dato(resultado,TipoDato.VARCHAR,this.fila,this.columna);
                    }
                    else { 
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                    }                    
                case TipoOp.RESTA: 
                    console.log('RESTA SWITCH EXPRESION ')
                    if(this.isUnario){
                        console.log('Es unario');
                        if(OpLeft.tipo == TipoDato.INT || OpLeft.tipo == TipoDato.DOUBLE)
                        {
                            var resultado = OpLeft.valor * (-1);
                            console.log('Resultado: '+resultado)
                            return new Dato(resultado,OpLeft.tipo,this.fila,this.columna);
                        }else{ 
                            return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                        }
                    }else 
                    {
                        if (OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT)
                        {
                            console.log('OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT')
                            var resultado = OpLeft.valor - OpRight.valor;
                            console.log('Resultado: '+resultado)
                            return new Dato(resultado,TipoDato.INT,this.fila,this.columna);
                        }
                        else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.DOUBLE)
                        { 

                            var resultado = OpLeft.valor - OpRight.valor;
                            console.log('Resultado: '+resultado);
                            return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                        }
                        else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.INT)
                        { 
                            var resultado = OpLeft.valor - OpRight.valor;
                            console.log('Resultado: '+resultado);
                            return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                        }
                        else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.DOUBLE)
                        { 
                            var resultado = OpLeft.valor - OpRight.valor;
                            console.log('Resultado: '+resultado);
                            return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                        }
                        else if(OpLeft.tipo == TipoDato.VARCHAR && OpRight.tipo == TipoDato.VARCHAR)
                        { 
                            var resultado = OpLeft.valor - OpRight.valor;
                            console.log('Resultado: '+resultado);
                            return new Dato(resultado,TipoDato.VARCHAR,this.fila,this.columna);                  
                        }
                        
                        
                        else { 
                            console.log('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede restar con Tipo: '+OpDerecho.tipo);
                            return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                        }
                    }
                case TipoOp.MULTI:
                    
                    console.log('MULTI');
                    if (OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT)
                    {
                        console.log('OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT')
                        var resultado = OpLeft.valor * OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.INT,this.fila,this.columna);
                    }
                    else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor * OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.INT)
                    { 
                        var resultado = OpLeft.valor * OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor * OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }else { 
                        console.log('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede multiplicar con Tipo: '+OpDerecho.tipo);
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                    }
                case TipoOp.DIVSION:
                    if (OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT)
                    {
                        console.log('OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT')
                        var resultado = OpLeft.valor / OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.INT,this.fila,this.columna);
                    }
                    else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor / OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.INT)
                    { 
                        var resultado = OpLeft.valor / OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor / OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }else { 
                        console.log('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede dividir con Tipo: '+OpDerecho.tipo);
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                    }
                case TipoOp.MODULO:
                    if (OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT)
                    {
                        console.log('OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.INT')
                        var resultado = OpLeft.valor % OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.INT,this.fila,this.columna);
                    }
                    else if(OpLeft.tipo == TipoDato.INT && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor % OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.INT)
                    { 
                        var resultado = OpLeft.valor % OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }
                    else if(OpLeft.tipo == TipoDato.DOUBLE && OpRight.tipo == TipoDato.DOUBLE)
                    { 
                        var resultado = OpLeft.valor % OpRight.valor;
                        console.log('Resultado: '+resultado);
                        return new Dato(resultado,TipoDato.DOUBLE,this.fila,this.columna);                  
                    }else { 
                        console.log('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede dividir con Tipo: '+OpDerecho.tipo);
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);                        
                    }
                default:
                    console.log("Error: En las operaciones: ")
                    break;
            }
    }

    generarAst(){ 
        let nodo = { 
            padre: -1,
            cadena: ""
        }
        let OpIzq = this.OpIzq.generarAst();
        let OpRight ;


        let tipoO = obtenerContador(); 
        let padre = obtenerContador();

        nodo.padre = padre;
        if (!this.isUnario) {
            OpRight = this.OpDer.generarAst();
            nodo.cadena = OpIzq.cadena + 
            OpRight.cadena+ 
            `${tipoO} [label = "${this.tipo}" ]\n `+ 
            `${padre} [label = "expresion"]\n` +
            `${padre} -- ${OpIzq.padre}\n` +
            `${padre} -- ${tipoO}\n` +
            `${padre} -- ${OpRight.padre}\n` +
            '';         
            
        }else{ 
            //ej: - 1 
            nodo.cadena = OpIzq.cadena + 
            `${tipoO} [label = "${this.tipo}" ]\n `+ 
            `${padre} [label = "expresion"]\n` +
            `${padre} -- ${OpIzq.padre}\n` +
            `${padre} -- ${tipoO}\n` +
            '';         
        }
        console.log('ast expresion: ')
        console.log(nodo.cadena)
        return nodo;
    }
}
module.exports = Expresion;
