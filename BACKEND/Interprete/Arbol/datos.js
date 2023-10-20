let contador = -1; 
const get = () => { 
    contador = contador + 1;
    return contador;
}
module.exports  = get;