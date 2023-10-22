let printsSalid = '';
let selectSalidas = '';

const agregarSalir = (texto) => { 
    printsSalid += texto + '\n';
}

const agregarSelect = (texto) => { 
    selectSalidas += texto + '\n';
}

const getSalida = () => { 
    return printsSalid;
}
const getSeleccion = () => {
    return selectSalidas;
}

//clears
const clearSalida = () => { 
    printsSalid = '';
}
const clearSelec = () => {
    selectSalidas = '';
}
module.exports = {agregarSalir, agregarSelect, getSalida, getSeleccion, clearSalida,clearSelec}
