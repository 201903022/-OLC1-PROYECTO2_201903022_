const TipoDato = require('../Enums/TipoDato.js');
const Dato = require('../Clases/Dato.js');
const Instruction = require('../Clases/Instruction.js');
let obtenerContador  = require('../Arbol/datos.js');

class Primitivo extends Instruction{
    constructor(tipo,valor,fila,columna){
        super();
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno,lista_errores){
        switch (this.tipo) {
            case TipoDato.INT:
                return (new Dato(Number(this.valor),TipoDato.INT,this.fila,this.columna));
            case TipoDato.DOUBLE:
                return (new Dato(Number(this.valor),TipoDato.DOUBLE,this.fila,this.columna));
            case TipoDato.VARCHAR:
                const cadenaFormateada = this.valor.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '\\');;
                return new Dato(cadenaFormateada, TipoDato.VARCHAR, this.fila, this.columna);
            case TipoDato.DATE:
                var partes = this.valor.split("-");
                var year = parseInt(partes[0], 10); // Convertir a número base 10
                var month = parseInt(partes[1], 10) - 1; // Restar 1 al mes, ya que los meses en JavaScript van de 0 a 11
                var day = parseInt(partes[2], 10);
                var fecha = new Date(year, month, day);
                console.log(`Fecha: ${fecha}`)

                var yearF = fecha.getFullYear();
                var mesF = (fecha.getMonth() +1).toString().padStart(2,'0');
                var diaF = fecha.getDate().toString().padStart(2,'0');
                fecha = `${yearF}-${mesF}-${diaF}`;
                console.log(`Fecha formateada: ${fecha}`)
                return (new Dato(fecha, TipoDato.DATE, this.fila, this.columna));
            case TipoDato.BOOLEAN:
                if (this.valor == 'true') {
                    return (new Dato(true, TipoDato.BOOLEAN, this.fila, this.columna));
                } else {
                    return (new Dato(false, TipoDato.BOOLEAN, this.fila, this.columna));
                }
            case TipoDato.ID: 
                return (new Dato(this.valor, TipoDato.ID, this.fila, this.columna));
            case TipoDato.NULL: 
                return (new Dato(null, TipoDato.NULL, this.fila, this.columna));
            default:
                break;
        }

    }
    generarAst(){ 
        let nodo ={
            padre:-1,
            cadena: ""
        }
        
        var SonNode = obtenerContador();
        var DadNode = obtenerContador();
        var cadena = `${SonNode} [label = "${this.valor}"]\n` +
        `${DadNode} [label = "expresion" ]\n `+ 
        `${DadNode} -- ${SonNode}\n`;

        nodo.padre = DadNode;
        nodo.cadena = cadena;
        return nodo;

    }
}
module.exports = Primitivo;