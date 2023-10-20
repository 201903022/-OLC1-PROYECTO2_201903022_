// ANALIZADOR LEXICO 
%lex
// no importe si es mayusc o minusc
%options case-insensitive 
//EXP 
integer  [0-9]+;
// double = numero punto numero 
double    ([0-9]+("."[0-9]+)) ; 
// id
id       [a-zA-Z][a-zA-Z0-9]*;
//Varchar: 
varchar   \"([^\\\"]|\\.)*\"; // \" = comillas dobles
//Fechas
dates ([0-9]{4} "-" [0-9]{2} "-"[0-9]{2}  );
//Variables: 
variable  "@"[a-zA-Z][a-zA-Z0-9]*;

%%
//Reglas Lexicas

//tipo de datos
"int" 			{return 'R_INT';}
"double" 		{return 'R_DOUBLE';}
"varchar" 		{return 'R_VARCHAR';}
"date" 			{return 'R_DATE';}

"table" 		{return 'R_TABLE';}

//INSERT
"insert" 		{return 'R_INSERT';}
"into" 			{return 'R_INTO';}
"values" 		{return 'R_VALUES';}
//DDL
"create" 		{return 'R_CREATE';}
"alter" 		{return 'R_ALTER';}
"drop" 		    {return 'R_DROP';}
"column" 		{return 'R_COLUMN';}
"rename"		{return 'R_RENAME';}
"add"			{return 'R_ADD';}
"to"			{return 'R_TO';}

//select
"select" 		{return 'R_SELECT';}
"from" 			{return 'R_FROM';}
"where" 		{return 'R_WHERE';}
//add

//CAST
"cast"			{return 'R_CAST';}
"as"			{return 'R_AS';}

"database" 		{return 'R_DATABASE';}
"primary" 		{return 'R_PRIMARY';}
"key" 			{return 'R_KEY';}
"foreign" 		{return 'R_FOREIGN';}


//palabras reservadas			
//operadores aritmeticos
"+" 			{return 'MAS';}
"-" 			{return 'MENOS';}
"*" 			{return 'POR';}
"/" 			{return 'DIVI';}
"=" 			{return 'EQUALS';}                    
"%" 			{return 'MODULO';}                    
"^" 			{return 'POTENCIA';}                    

//operadores logicos
"and" 			{return 'AND';}
"or" 			{return 'OR';}
"not" 			{return 'NOT';}
"xor" 			{return 'R_XOR';}

//Operadores Relacionales 
">=" 			{return 'MAYORIK';}
"<=" 			{return 'MENORIK';}
"<" 			{return 'MENORK';}
">" 			{return 'MAYORK';}
"!=" 			{return 'DIFERENTE';}

"declare"       {return 'R_DECLARE';}
"default"       {return 'R_DEFAULT';}
"set"           {return 'R_SET';}

"if"            {return 'R_IF';}
"then"          {return 'R_THEN';}
"begin"         {return 'R_BEGIN';}
"else"          {return 'R_ELSE';}
"end"           {return 'R_END';}


//palabras reservadas
"print" 		{return 'R_PRINT';}
";" 			{return 'PCOMA';}
"{" 			{return 'LLAVEA';}
"}" 			{return 'LLAVEC';}
"(" 			{return 'PARA';}
")" 			{return 'PARC';}
"[" 			{return 'CORCHA';}
"]" 			{return 'CORCHC';}
"," 			{return 'COMA';}

{varchar}        { return 'VARCHAR'; } 
{dates}          { return 'DATE'; } 
{double}         { return 'DOUBLE'; } 
{integer}        { return 'INTEGER'; } 
{id}             { return 'ID'; } 
{variable}       { return 'VARIABLE'; }

// Lo que se ignora
[ \s\r\n\t]             {/* Espacios se ignoran */}

//FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex 
//Sintactico

//llamados
%{
	const Primitivo = require('../Interprete/expresion/Primitivo.js');
	const expresion = require('../Interprete/expresion/Expresion.js');
	const expresionLo = require('../Interprete/expresion/ExpresionLo.js');
	const TipoDato = require('../Interprete/Enums/TipoDato.js');
	const TipoOp   = require('../Interprete/Enums/TipoOp.js');
	const Asig      = require('../Interprete/Clases/Asig.js');
	const Actualizar = require('../Interprete/Clases/Actualizar.js');
	const IfC = require('../Interprete/Clases/IF.js');
	const IfElse = require('../Interprete/Clases/IFELSE.js');
	//CallVar
	const CallVar = require('../Interprete/Clases/CallVar.js');
	//PRINT 
	const Mostraar = require('../Interprete/Clases/PRINT.js');
	const Columnas = require('../Interprete/Tables/Columnas.js');
	const TableeI = require('../Interprete/Tables/TableeI.js');
	const InsertIng = require('../Interprete/Tables/InsertIn.js');
	const AddColumn = require('../Interprete/Tables/AddColumn.js');
	const DropColumn = require('../Interprete/Tables/DropColumn.js');
	const AlterT = require('../Interprete/Tables/AlterT.js');
	const RenameTable = require('../Interprete/Tables/RenameTable.js');
	const RenameColumn = require('../Interprete/Tables/RenameColumn.js');
%}

// Precedencia
%left 'OR'
%left 'AND'
%left 'NOT'
%left 'MAYORK' 'MENORK' 'EQUALS'
%left 'MAYORIK' 'MENORIK'
%left 'MAS' 'MENOS'
%left 'DIVI' 'POR' 'MODULO' 
%left 'POTENCIA' 
%left UMINUS

// -------> Simbolo Inicial
%start inicio

//Primitivo: tipo,valor,fila,columna
//Expresion: OpIzq, OpDer, tipo, isUnario, fila, columna
%% // ------> Gramatica

inicio
	: instrucciones EOF  {$$ = $1; return $$;}
;

instrucciones 
	: instrucciones instruccion {
		console.log('instrucciones Instruccion');		
	    $$ = $1;
			if (Array.isArray($2)) {
				$1.forEach(element => {
				   $$.push(element);
				});
				//console.log("JISON miVariable es un arreglo.");
			} else {
				//console.log(" JISON miVariable no es un arreglo.");
				$$.push($2);
			}		
	 }
	| instruccion  {
		console.log('Instruccion');
	    $$ = []; 
			if (Array.isArray($1)) {
				$1.forEach(element => {
				   $$.push(element);
				});
				//console.log("JISON miVariable es un arreglo.");
			} else {
				//console.log(" JISON miVariable no es un arreglo.");
	   			$$.push($1);
			}		

		 }
;
instruccion
	: asignaciones1 PCOMA {console.log('asigancion instruccion');}
	| actualizarV PCOMA {console.log('actualizar variable')}
	| ifG PCOMA {console.log('if instruccion');}
	| print PCOMA {console.log('print instruccion');}
	| createTable PCOMA {console.log('Instruccion createTable');}
	| insertG PCOMA {console.log('Instruccion insertG');}
	| alterTable PCOMA {console.log('Instruccion alterTable');}
	| error PCOMA	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;
expresion 	
	: MENOS expresion %prec UMINUS {
		 console.log('-' +$2 ); 
		 $$ = new expresion($2,null,TipoOp.RESTA, true,this._$.first_line, this._$.first_column);
		 }
	| expresion AND expresion {
		console.log( 'and' ); 
		$$ = new expresionLo($1,$3,TipoOp.AND,this._$.first_line, this._$.first_column);
		}
	| expresion EQUALS expresion {
		console.log( 'IGUAL' ); 
		$$ = new expresionLo($1,$3,TipoOp.IGUAL,this._$.first_line, this._$.first_column);
		}
	| expresion OR expresion {
		console.log( 'OR' ); 
		$$ = new expresionLo($1,$3,TipoOp.OR,this._$.first_line, this._$.first_column);
		}

	| expresion MAYORK expresion {
		console.log( 'MAYORK' ); 
		$$ = new expresionLo($1,$3,TipoOp.MAYORK,this._$.first_line, this._$.first_column);
		}
	| expresion MENORK expresion {
		console.log( 'MENORK' ); 
		$$ = new expresionLo($1,$3,TipoOp.MENORK,this._$.first_line, this._$.first_column);
		}
	| expresion MENORIK expresion {
		console.log( 'MAYORIK' ); 
		$$ = new expresionLo($1,$3,TipoOp.MENORIK,this._$.first_line, this._$.first_column);
		}
	| expresion MAYORIK expresion {
		console.log( 'MAYORIK' ); 
		$$ = new expresionLo($1,$3,TipoOp.MAYORIK,this._$.first_line, this._$.first_column);
		}	

	| expresion MAS expresion {
		console.log( 'SUMA ' +$1 + ' + ' +$3 ); 
		$$ = new expresion($1,$3,TipoOp.SUMA, false,this._$.first_line, this._$.first_column);
		}
	| expresion MENOS expresion {
		console.log( 'RESTA ' +$1 + ' - ' +$3 ); 
		$$ = new expresion($1,$3,TipoOp.RESTA, false,this._$.first_line, this._$.first_column);
		}
	| expresion POR expresion {
		console.log( 'POR ' +$1 + ' * ' +$3 );
	    $$ = new expresion($1,$3,TipoOp.MULTI, false,this._$.first_line, this._$.first_column);
	     }
	| expresion DIVI expresion {
		console.log( 'DIVI ' +$1 + ' / ' +$3 ); 
		$$ = new expresion($1,$3,TipoOp.DIVISION, false,this._$.first_line, this._$.first_column);
		}
	| expresion MODULO expresion {
		console.log( 'DIVI ' +$1 + ' % ' +$3 ); 
		$$ = new expresion($1,$3,TipoOp.MODULO, false,this._$.first_line, this._$.first_column);
		}
	| expresion POTENCIA expresion {
		console.log( 'DIVI ' +$1 + ' ^ ' +$3 ); 
		$$ = new expresion($1,$3,TipoOp.POTENCIA, false,this._$.first_line, this._$.first_column);
		}
	| PARA expresion PARC  {
		console.log( '( ' +$2 + ')' ); 
		$$ = $2;
		}
	| DOUBLE {
		console.log('DOUBLE: ' +$1); 
		$$ = new Primitivo(TipoDato.DOUBLE,$1,this._$.first_line, this._$.first_column);
		}
	| DATE {
		console.log('DATE: ' +$1); 
	    $$ = new Primitivo(TipoDato.DATE,$1,this._$.first_line, this._$.first_column);
		}
	| INTEGER {
		console.log('Integer: ' +$1); 
		$$ = new Primitivo(TipoDato.INT,$1,this._$.first_line, this._$.first_column);
		}
	| VARCHAR {
		console.log('VARCHAR: ' +$1.split('"')[1]); 
		$$ = new Primitivo(TipoDato.VARCHAR,$1.split('"')[1],this._$.first_line, this._$.first_column);
		}
	| VARIABLE {
		console.log('LLAMADO DE VARIABLE: ' +$1); 
		$$ = new CallVar($1,this._$.first_line, this._$.first_column);
		}
;

asignaciones1 
			:asignacionDefault
			{
				console.log('Asignacion de variable: ' +$1);
				$$ = $1;
			}
			|R_DECLARE list_asignaciones{ 
				console.log('Asignacioness de variables: ' +$2);
				$$ = $2;
			}
;

asignacion1 
		  	: VARIABLE tipoDato{ 
				$$ = new Asig($1,null,$2,this._$.first_line, this._$.first_column);
			}
;
asignacionDefault
			: R_DECLARE  VARIABLE tipoDato R_DEFAULT expresion {
				console.log(`Asignacion de variable: ${$2} valor: ${$5}`);
				$$ = new Asig($2,$5,$3,this._$.first_line, this._$.first_column);
}
;
list_asignaciones 
				: list_asignaciones COMA asignacion1
				{
					$$ = $1;
					$$.push($3);
					console.log('Lista asignaciones coma asignacion 1');
				}
				| asignacion1
				{
					console.log('asignacion 1');
					$$ = []; 
					$$.push($1);
				}
;

tipoDato 
	:R_INT {$$ = TipoDato.INT; }
	|R_DOUBLE {$$ = TipoDato.DOUBLE; }
	|R_VARCHAR {$$ = TipoDato.VARCHAR; }
	|R_DATE {$$ = TipoDato.DATE; }
;

actualizarV 
	:R_SET VARIABLE EQUALS expresion
	{
		console.log(`Actualizacion de variable: ${$2} valor: ${$4}`);
		$$ = new Actualizar($2,$4,this._$.first_line, this._$.first_column);
	}
;

print 
	:R_PRINT  expresion  { 
		
		console.log(`Print:`);
		$$ = new Mostraar($2,this._$.first_line, this._$.first_column);
	}
;

ifG 
	: R_IF expresion R_THEN R_BEGIN instrucciones R_END
	{
		console.log(`If: ${$2} valor: ${$5}`);
		$$ = new IfC($2,$5,this._$.first_line, this._$.first_column);
	}
	| R_IF expresion R_THEN  instrucciones R_ELSE instrucciones R_END R_IF{

		console.log('IFELSE');
		$$ = new IfElse($2,$4,$6,this._$.first_line, this._$.first_column);
	}
;

casteo
	: R_CAST PARA expresion R_AS tipoDato PARC
;

createTable 
		:R_CREATE R_TABLE ID PARA listaColumnas PARC{ 
			console.log('CreateTable: ');
			$$ = new TableeI($3,$5,this._$.first_line, this._$.first_column);
		}
;

listaColumnas
	: listaColumnas COMA columnasCreate
	{ 
		console.log('listaColumnas COMA columnasCreateeate');
		$$ = $1;
		$$.push($3);
	}
	| columnasCreate {
		console.log('  columnasCreateeate');
		$$ = [];
		$$.push($1);
	}
;
columnasCreate
		: ID tipoDato{ 
			console.log('ColumnasCreate');
			console.log(`ID: ${$1}`);
			$$ = new Columnas($1,$2,this._$.first_line, this._$.first_column);
		}
;

insertG 
	:R_INSERT R_INTO ID PARA listColumnas PARC R_VALUES PARA valuesInsert PARC{
		console.log('Insert: ');
		$$ = new InsertIng($3,$5,$9,this._$.first_line, this._$.first_column);
	}
;
listColumnas 	
		:listColumnas COMA ID{ 
			console.log('listColumnas');
			$$ = $1;
			$$.push($3);
		}
		|ID{ 
			console.log('listColumnas');
			$$ = [];
			$$.push($1);
		}
;

valuesInsert 
	:valuesInsert COMA expresion{ 
		console.log('ValuesInsert');
		$$ = $1;
		$$.push($3);
	}
	|expresion { 
		console.log('ValuesInsert');
		$$ = [];
		$$.push($1);
	}
;

alterTable
	: R_ALTER R_TABLE ID instAlter{ 
		console.log('AlterTable');
		$$ = new AlterT($3,$4,this._$.first_line, this._$.first_column);
	}
;

instAlter 
	: R_ADD columnasCreate
	{ 
		console.log('instAlter add colummn');
		$$ = new AddColumn($2,this._$.first_line, this._$.first_column);

	}
	| R_DROP R_COLUMN ID
	{ 
		console.log('instAlter drop column');
		$$ = new DropColumn($3,this._$.first_line, this._$.first_column);
	}
	| R_RENAME R_TO ID{ 
		console.log('instAlter rename column');
		$$ = new RenameTable($3,this._$.first_line, this._$.first_column);
	}
	//rename column
	| R_RENAME R_COLUMN ID R_TO ID{ 
		console.log('instAlter rename column');
		$$ = new RenameColumn($3,$5,this._$.first_line, this._$.first_column);
	}
;


select 
	: R_SELECT instSelect R_FROM ID where{
		console.log('select');
	$$ = new Select($4,$2,$5,this._$.first_line, this._$.first_column);
	}
	| R_SELECT VARIABLE

;

instSelect
		:POR{ 
			console.log('instSelect *');
			$$ = '*';
		}
		|listColumnas { 
			console.log('instSelect listColumnas');
			$$ = $1;
		}
;

where: R_WHERE expresion{ 
	console.log('where');
	$$ = $2;
	| /*e*/ { 
		console.log('where');
		$$ = null;
	}
}
;




        if (this.instruccion == '*' ) {
            if (this.expresion ==null) {
                console.log('Select * from ')
                
            } else {
                if (Logicas.includes(this.expresion.tipo)) {
                    console.log('Select si posee una instruccion logica');
                    this.expresion.valueId = 'hola';
                    this.expresion.interpretar(entorno,lista_errores);
      
                } else {
                    console.log('No se puede operar el where con: '+this.expresion.tipo)
                }                
                
            }
        } else  {
            if (Logicas.includes(this.expresion.tipo)) {
                console.log('Select si posee una instruccion logica');
                 var OpLeft = this.expresion.OpIzq.interpretar(entorno,lista_errores);     
                 if (OpLeft.tipo = TipoDato.ID) {
                     var OpRight = this.expresion.OpDer.interpretar(entorno,lista_errores);           
                    switch (this.expresion.tipo) {
                        case TipoOp.MAYORIK:
                            console.log(`${OpLeft.valor} >= ${OpRight.valor}`);
                            break;
                        case TipoOp.MAYORK:
                            console.log(`${OpLeft.valor} > ${OpRight.valor}`);
                            break;
                        case TipoOp.MENORIK:
                            console.log(`${OpLeft.valor} <= ${OpRight.valor}`);
                            break;
                        case TipoOp.MENORK:
                            console.log(`${OpLeft.valor} < ${OpRight.valor}`);
                            break;
                            
                    
                        default:
                            break;
                    }
                 } else {
                        console.log('No se puede operar el where con: '+this.expresion.tipo)
                 }      
            } else {
                console.log('No se puede operar el where con: '+this.expresion.tipo)
            }
            
        }