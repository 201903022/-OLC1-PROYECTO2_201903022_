const parser = require('./Analizador/Parser.js')
let obtenerContador  = require('./Interprete/Arbol/datos.js');
const fs = require('fs');
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
    let filePath = './Interprete/Arbol/Arbol.dot'
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
    }
    graphviz += label;
    graphviz += uniones;
    graphviz += '}\n'
    console.log(graphviz)
    fs.access( filePath,fs.constants.F_OK, (err) => { 
        if (err) {
            console.log('no existe')
            fs.writeFile(filePath,graphviz,(err) => { 
                if (err) {
                    console.log('error al escribir')
                }else{
                    console.log('se escribio correctamente')
                }
            })
        }else{
            console.log('existe')
            fs.writeFile(filePath,graphviz,(err) => { 
                if (err) {
                    console.log('error al escribir')
                }else{
                    console.log('se escribio correctamente')
                }
            })
        }
    } )
    
  
}


console.log(resultado)
generarAstdot();

module.exports = generarAstdot();
