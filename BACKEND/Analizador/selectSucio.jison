
let tipoSelect = require('../Interprete/Enums/TipoSelec.js')
let tipoSelectVar = '';
selectG: 
    : SELECT instrucciones from{ 
        $$ = new Select($2, $3, $4);
    }
;
instrucciones: listado{ 
 
    $$ = $1;
}
    |POR{ 
        tipoSelectVar = tipoSelect.ALL; 
    }




	
;
listado: listado COMA list 
	 | list 
list :expresion as{ 
    $$ = []; 
    $$.push($1) 
    $$.push($2)
}
    | nativas  as { 
            $$ = [];
            $$.push($1)
            $$.push($2)
    }

     |ID as 
{ 
	$$ = []; 
	$$.push($1)
    $$.push($2)
}

;
as: 
	AS expresion{ 
	 $$=$2;
} 
	|e { 
	$$=null;
} 
	;
from: 
	: FROM tableName where { 
	$$= []; 
	$$= push($2) ;
	$$.push($3);
}
	 | e{ 
	$$=null; 
}
;
where: 	
	condicion{ 
        $$= $1;
    }
	|e{ 
        $$=null;
    }
;
nativas
	:uper
	|lower
	|len
	|round
	|truncate
;