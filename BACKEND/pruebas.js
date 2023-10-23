const parser = require('./Analizador/Parser.js')

const Entorno = require('./Interprete/Entornos/Entorno.js');
const variablee = require('./Interprete/Entornos/Variable.js');


/*let Entorno1 = new Entorno("hola",null); 

let variable1 = new variablee("hola","5",1,2);
let variable2 = new variablee("hola2","6",1,2);
let variable3 = new variablee("hola3","7",1,2);
let variable4 = new variablee("hola4","8",1,2);

Entorno1.addVariable(variable1);
Entorno1.addVariable(variable2);
Entorno1.addVariable(variable3);
Entorno1.addVariable(variable4);

let Entorno2 = new Entorno("hola",Entorno1); 

let variable = new variablee("hola0","0",1,2);
let variable6 = new variablee("variable6","1",1,2);
let variable7 = new variablee("variable7","2",1,2);
let variable8 = new variablee("variable8","3",1,2);

Entorno2.addVariable(variable);
Entorno2.addVariable(variable6);
Entorno2.addVariable(variable7);
Entorno2.addVariable(variable8);

console.log('entorno 1',Entorno1);
console.log(Entorno1.getVariable("hola").valor);

console.log('entorno 2',Entorno2);
console.log(`Entorno2 buscando "hola" `+Entorno2.getVariable("hola").valor);

var entrada = 'declare @nombre varchar default "hola" ;';
entrada += ' set @nombre =  "adios" ;'
*/
var a = []
console.log(a.length)
let EntornoGlobal = new Entorno("global",null); 
var entrada = ' declare @ten int default 10 + 5 ;'
entrada += ' set @ten = @ten + 25 ;';
entrada += ' declare @tewnty int default @ten + 100 ;';


var entradita = 'declare @prueba varchar, @prueba2 int;\n' +
                'declare @nombre varchar default "hola\\n";\n' +
                'set @prueba = "hola\\n";';
var entradita2 = 'print "HOLA MUNDOOOO" ;'
var entraditaIF = 'declare @hola int default 50;\n' +
                 'if @hola >=  50  then \n' +
                 '  \n' +
                 '    print "hola mundo";\n' +
                 '    declare @adios int default 10;\n' +
                 '  else print "hola mundo2"; end if;\n' ;
var entradaTable = 'create table prueba ( \n' +
                 'cosa1 int, \n' +
                 'cosa2 int,  \n' +
                 'cosa3 varchar\n' +
                 '  ); \n' ;
var inseret2 = 'insert into prueba ( \n' +
                 'cosa1,  \n' +
                 'cosa2,   \n' +
                 'cosa3 \n' +
                 '  ) values ( \n' +
                 '15,  \n' +
                 '20,   \n' +
                 '"adios"); \n';
var inseret = 'insert into prueba ( \n' +
                 'cosa1,  \n' +
                 'cosa2   \n' +
                 ' \n' +
                 '  ) values ( \n' +
                 '10,  \n' +
                 '15   \n' +
                 '); \n';
var inseret4 = 'insert into prueba ( \n' +
                 'cosa1  \n' +
                 '   \n' +
                 ' \n' +
                 '  ) values ( \n' +
                 '100  \n' +
                 '   \n' +
                 '); \n';
var alterT = 'alter table prueba  \n' +
                'add correo int;  \n';
var dropC = 'alter table prueba  \n' +
                'drop column cosa3;  \n';
var renameColumn = 'alter table prueba  \n' +
                 'rename column cosa1 to newCosa1 ;  \n';
                
var selectT = 'select cosa1,cosa2 from prueba where cosa1 > 10   \n' +
                ';  \n';
                 
var renametable = 'update prueba  \n' +
                   'set cosa3 = "holamundo500" where  cosa1 = 10 ;  \n';
var updateTable = 'alter table prueba  \n' +
                   'rename to newPrueba;  \n';
let bloque = ' begin declare @hola int default 10; print "adios" ; if 5 < 10 then print "adios"; end if ; end '                   
let forf1 = ' for index in 1 .. 5 begin print index+100 ; end; ';
let while1 = 'begin declare @hola int default 0;  while @hola <= 10 begin print "adios";  begin set @hola = @hola + 1; end end;     end '
entradaTable += inseret +inseret2+renametable ;
var resultado = parser.parse(while1);
var lista_errores = [];
resultado.forEach(element => {
    element.interpretar(EntornoGlobal,lista_errores);
});

console.log(EntornoGlobal);
EntornoGlobal.showVariables();
console.log(resultado);
//EntornoGlobal.getTable('newPrueba').mostrarTabla();