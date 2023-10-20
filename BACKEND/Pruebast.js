const parser = require('./Analizador/Parser.js')

const Entorno = require('./Interprete/Entornos/Entorno.js');
const variablee = require('./Interprete/Entornos/Variable.js');
var entrada = 'create table prueba (correo varchar) ;'
var resultado = parser.parse(entrada);
var lista_errores = [];

resultado.forEach(element => {
    element.generarAst();
});
console.log(resultado.cadena)