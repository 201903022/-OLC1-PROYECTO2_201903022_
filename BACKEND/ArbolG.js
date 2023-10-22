const {exec} = require('child_process');
const rutaDot = 'C:/Librerias/Graphviz/bin/dot';
let entrada = './Interprete/Arbol/Arbol.dot' ;
let salida = './Interprete/Arbol/AST.svg';

/* 
Auxiliar: ALex Guerra
https://github.com/AlexIngGuerra/OLC1-2S2023
*/
function generarAst(){ 
    let comando = `${rutaDot} -Tsvg ${entrada} -o ${salida}`
    exec(comando,(err,stdout,stderr)=>{
        if (err) {
            console.log(err);
            return;
        }else{
            console.log('AST generado correctamente');
        }
    }
    );
}

generarAst();