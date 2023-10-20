

class Entorno{ 
    constructor(actual,anterior){
        this.actual = actual;
        this.anterior = anterior;
        this.variables = {};
        this.funciones = {}; 
        this.tablas = {};         
        //imprimir
        console.log(`Actual: ${actual}`)
    }

    addVariable(variable){
        console.log(`Agregando variable: ${variable} en entorno: ${this.actual}`)
        this.variables[variable.id] = variable;
    }

    actualizarVariable(id,valor){
        console.log('--------------------------------------------------------')
        console.log(`Actualizandod variable: ${id} en entorno: ${this.actual}`)
        for(let e = this; e != null; e = e.anterior){
            if(e.variables[id] != null){
                //Comprobar si son del mismo tipo                
                console.log(`e.variables[id].tipo ${e.variables[id].tipo} == valor.tipo: ${valor.tipo}`)
                if (e.variables[id].tipo == valor.tipo) {
                    e.variables[id].valor = valor;
                    return true;                    
                } else {
                    console.log('No son del mismo tipo ')
                    return false; 
                    
                }
            }
        }
    }

    getVariable(id){
        for(let e = this; e != null; e = e.anterior){
            if(e.variables[id] != null){
                return e.variables[id];
            }
        }
        return null;
    }

    //showVariables 
    showVariables(){
        console.log('--------------------------------------------------------')
        try {            
            for(let e = this; e != null; e = e.anterior){
                console.log(`Entorno: ${e.actual}`)
                for (const key in e.variables) {
                    //Comprobar si valor no es nulo;
                    if (e.variables[key].valor != null) {
                        console.log(`Variable: ${key} = ${e.variables[key].valor.valor}`)                        
                    } else { 
                        console.log(`Variable: ${key} = null`)
                    }
                }
            }
        } catch (error) {
            console.log(error)
            
        }
    }

    addTable(tableName,element){ 
        console.log(`Agregando tabla: ${tableName} en entorno: ${this.actual}`)
        this.tablas[tableName] = element;
    }

    getTable(tableName){
        for(let e = this; e != null; e = e.anterior){
            if(e.tablas[tableName] != null){
                return e.tablas[tableName];
            }
        }
        return null;
    }

    updateTable(tableName,element){ 
        console.log(`Actualizando tabla: ${tableName} en entorno: ${this.actual}`)
        this.tablas[tableName] = element;
    }

    deleteTable(tableName){ 
        console.log(`Eliminando tabla: ${tableName} en entorno: ${this.actual}`)
        delete this.tablas[tableName];
    }

    renameTable(tableName,newTableName){
        console.log(`Renombrando tabla: ${tableName} en entorno: ${this.actual}`)
        this.tablas[newTableName] = this.tablas[tableName];
        delete this.tablas[tableName];


    }

}

module.exports = Entorno;