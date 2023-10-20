//ussEfect,useState
import { useState,useEffect } from 'react'  
import axios from 'axios';
//import {Home} from './Components/Home.jsx'
const baseUrl = "http://localhost:4000"
export function Home({titulo='null',mostrar='null'}){ 
    var [contador, setContador] = useState(0);
    
    const [count, setCount] = useState([]);

    function updateList(){
        axios.get(baseUrl+"/getData").then(
            response => {
                console.log('updateList'+response.data.lista);
                setCount(response.data.lista);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }
    function AgregarNumero(){ 
        
        const valor = contador;
        axios.post(baseUrl+"/addData",{
                valor:valor
            }
        ).then(
            response => {
                setContador(contador+1);
                console.log(response);
                updateList();
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
        

    }
    useEffect(() => {
        updateList();
    }, []);


    return (
        <>
        <h1>Home</h1>
        <p>Home page</p>
        <p>{titulo}</p>
        <p>{mostrar}</p>
        <p>Contador: {contador}</p>
        <p>Datos: {count.join(', ')}</p>
        <p> 
            {
                count.map((item) => {
                    return <>{item + "-"}</>
                })
            }        
        </p>
        <button onClick={AgregarNumero}>Agregar Numero</button>
        </>
    )
}