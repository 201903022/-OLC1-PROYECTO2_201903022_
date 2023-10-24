const { agregarSalir } = require("../Temporales/Temporal");


function createMark(encabezado,resultado,tableName){ 
    var mark = `${tableName}\n`;
    mark += ''
    for (let index = 0; index < encabezado.length; index++) {
        mark += `| ${encabezado[index]} `;
        if (index + 1 == encabezado.length) {
            mark += '|'
            
        }
    }
    
    mark += '\n';
    
    for (let index = 0; index < encabezado.length; index++) {
        mark += '| --------- ';
    }
    
    mark += '|\n';
    
    for (let index = 0; index < resultado.length; index++) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaa')
        let array = resultado [index];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (array[index] == null) {
                mark += `|    `;
                
            }else{ 
                mark += `| ${array[index]} `;
            }
            if (index + 1 == array.length) {
                mark += '|'
                
            }
            
        }
        mark += '\n';
    }
    return mark;

}

module.exports = createMark;