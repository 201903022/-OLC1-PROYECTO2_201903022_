
/* 
Auxiliar: ALex Guerra
https://github.com/AlexIngGuerra/OLC1-2S2023
*/
class Entorno{ 
    constructor(actual,anterior){
        this.actual = actual;
        this.anterior = anterior;
        this.variables = {};
        this.variablesId = new Map();
        this.funciones = {}; 
        this.tablas = {};         
        //imprimir
        console.log(`Actual: ${actual}`)
    }

    addVariable(variable){
        console.log(`Agregando variable: ${variable.id} en entorno: ${this.actual}`)
        this.variables[variable.id] = variable;
    }
    addId(id){ 
        console.log(`Agregando id: ${id.id} en entorno: ${this.actual}`)
        this.variablesId.set(id.id,null);
    }

    actualizarVariable(id,valor){
        console.log('--------------------------------------------------------')
        console.log(`Actualizandod variable: ${id} en entorno: ${this.actual}`)
        for(let e = this; e != null; e = e.anterior){
            if(e.variables[id] != null){
                //Comprobar si son del mismo tipo                
                console.log(`e.variables[id].tipo ${e.variables[id].tipo} == valor.tipo: ${valor.tipo}`)
                if (e.variables[id].tipo == valor.tipo) {
                      
                    console.log(e.variables[id].valor ,  valor)
                    e.variables[id].valor = valor;
                    return true;                    
                } else {
                    console.log('No son del mismo tipo ')
                    return false; 
                    
                }
            }
        }
    }
    actualizarId(id,valor) { 
        console.log(`Actualizar id: ${id} ${valor}`)
        for(let e = this; e != null; e = e.anterior){
            if(e.variablesId.has(id) ){
                console.log(`Se encontro a ${id}`)
                //Comprobar si son del mismo tipo  
                e.variablesId.set(id,valor);

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

    getId(id){ 
        for(let e = this; e != null; e = e.anterior){
            if(e.variablesId.has(id)){
                return e.variablesId.get(id);
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

                for (const [key,value]of this.variablesId){ 
                    console.log(`Id: ${key} = ${value}`)
                }

            }

        } catch (error) {
            console.log(error)
            
        }
    }

    addTable(tableName,element){ 
        //Agregarlo en el primer entorno: 
        let e=this;
        while (e.anterior != null) {
            e = e.anterior;
        }
        e.tablas[tableName] = element;
        console.log(`Agregando tabla: ${tableName} en entorno: ${e}`)
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