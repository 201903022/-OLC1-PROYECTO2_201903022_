const parser = require('./Analizador/Parser.js')
let obtenerContador  = require('./Interprete/Arbol/datos.js');

const Entorno = require('./Interprete/Entornos/Entorno.js');
const variablee = require('./Interprete/Entornos/Variable.js');
var entrada = 'if 5 < 10 then print "adios"; end if ;  '
let printc = 'print 5 > 10 ; '
var entrad2 = 'select * from prueba; '
let bloque = ' begin declare @hola int default 10; print "adios" ; if 5 < 10 then print "adios"; end if ; end'
var resultado = parser.parse(bloque);
var lista_errores = [];

resultado.forEach(element => {
    element.generarAst();
});
function generarAstdot(){ 
    let array = resultado;
    let graphviz = 'graph AST{ \n ordering = "out" \n';
    let label = '';
    let uniones = '';
    let incio = obtenerContador();
    label += `${incio} [label="INICIO"]\n`;
    let listInstrucciones = obtenerContador(); 
    label += `${listInstrucciones} [label="listInstrucciones"]\n`
    uniones += `${incio} -- ${listInstrucciones}\n`

    for (let index = 0; index < array.length; index++) {
        const element = array[index].generarAst();
        let InstructionR = obtenerContador();
        uniones += element.cadena;
        label += `${InstructionR} [label="Instruction"]\n`
        uniones += `${InstructionR} -- ${element.padre}\n`
        uniones += `${listInstrucciones} -- ${InstructionR}\n`

        console.log('generarAsdtro')
    }
    graphviz += label;
    graphviz += uniones;
    graphviz += '}\n'
    console.log(graphviz)
}


console.log(resultado)
generarAstdot();
