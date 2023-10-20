//Expresiones logicas: 

//Call Instruction: 
const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const TipoOp = require('../Enums/TipoOp.js');
const Instruction = require('../Clases/Instruction.js');

class ExpresionLo extends Instruction{
    constructor(OpIzq,OpDer,tipo,fila,columna){ 
        super(); 
        this.OpIzq = OpIzq;
        this.OpDer = OpDer;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        console.log('nueva expresion logica')
        //mostar todas las variables: 
        console.log(`Tipo ${this.tipo}`)
        console.log(`OpDer ${this.OpDer.valor}`)
        console.log(`fila ${this.fila}`)
        console.log(`columna ${this.columna}`)


    }

    interpretar(entorno,lista_errores){ 
        console.log('--------Interpretar Exprsion Logica--------')
        var OpLeft; 
        var OpRight; 
        OpLeft = this.OpIzq.interpretar(entorno,lista_errores); 
        OpRight = this.OpDer.interpretar(entorno,lista_errores);
        var resultado = false;
        switch (this.tipo) {
            case TipoOp.AND:
                console.log('AND')
                if (OpLeft.tipo == TipoDato.BOOLEAN && OpRight.tipo == TipoDato.BOOLEAN) {
                    resultado = OpLeft.valor && OpRight.valor;
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);
                } else {
                    console.log('Error de tipos en AND')
                }
            
                break;
            
            case TipoOp.OR:
                console.log('OR')
                if (OpLeft.tipo == TipoDato.BOOLEAN && OpRight.tipo == TipoDato.BOOLEAN) {
                    resultado = OpLeft.valor || OpRight.valor;
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);
                } else {
                    console.log('Error de tipos en OR')
                }
                break;
            //IGUAL
            case TipoOp.IGUAL:
                console.log('IGUAL')
                try {
                    if (OpLeft.valor == OpRight.valor) {
                        console.log(`${OpLeft.valor} == ${OpRight.valor}`)
                        resultado = true;
                    }
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                } catch (error) {
                    
                }
            case TipoOp.MENORIK: 
                console.log('MENORIK')
                try {
                    if (OpLeft.valor <= OpRight.valor) {
                        console.log(`${OpLeft.valor} <= ${OpRight.valor}`)
                        resultado = true;
                    }
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                } catch (error) {
                    console.log(`Errorrn TipoOp.MENORIKs`)
                }
            case TipoOp.MENORK: 
                console.log('MENORK')
                try {
                    if (OpLeft.valor < OpRight.valor) {
                        console.log(`${OpLeft.valor} < ${OpRight.valor}`)
                        resultado = true;
                    }
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                } catch (error) {
                    console.log(`Errorrn TipoOp.MENORK`)
                }

            case TipoOp.MAYORIK: 
                console.log('MAYORIK')
                try {
                    if (OpLeft.valor >= OpRight.valor) {
                        console.log(`${OpLeft.valor} >= ${OpRight.valor}`)
                        resultado = true;
                    }
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                } catch (error) {
                    console.log(`Errorrn TipoOp.MAYORIK`)
                }
            case TipoOp.MAYORK:
                console.log('MAYORK')
                try {
                    if (OpLeft.valor > OpRight.valor) {
                        console.log(`${OpLeft.valor} > ${OpRight.valor}`)
                        resultado = true;
                    }
                    return new Dato(resultado,TipoDato.BOOLEAN,this.fila,this.columna);                        
                } catch (error) {
                    console.log(`Errorrn TipoOp.MAYORK`)
                }
        
            default:
                break;
        }


    }


}

module.exports = ExpresionLo;

