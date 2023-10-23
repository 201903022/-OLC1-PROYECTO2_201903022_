import React,{useState} from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { oneDarkTheme } from '@uiw/react-codemirror';
import '../Css/Edit.css'
import axios from 'axios';
import { url } from '../URL/urls';
import Markdown  from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Edito ({content,onContentChange}) { 
//code usestat

    const [code, setCode] = useState('');
    const [OutPut, setOutPut] = useState('');
    const [tables, setTables] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    console.log('Content: ',content)
    const onChange = React.useCallback((value, ViewUpdate) => {
        setCode(value);
        console.log(code);
      }, []);
    const AnalyzeCode = () => { 
        axios.post(url+'/analizar',{
            entrada:code
        }).then(
            response => {
                setOutPut('');
                console.log('respuesta: ' + response.data.message)
                var tables1 = response.data.tables;
                var message = response.data.message;
                if (tables1 == '') {
                    console.log('no tables')
                } else {
                    setTables(tables1);
                    console.log(tables)
                }
                if (message != '') {
                    setOutPut( response.data.message);
                    
                } else {
                    console.log('no message')
                }
                
                //setOutPut(response.data.tables);

            }
        ).catch(
            error => {
                console.log('adios');
                console.log(error);
            }
        )

    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        
        // Leer el contenido del archivo
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('target \n', e.target.result)
            setFileContent(fileContent + e.target.result);
            setCode(e.target.result);
        };
        console.log('a \n' + fileContent)
        reader.readAsText(file); // Para leer el archivo como texto (puedes usar otros métodos para diferentes tipos de archivos)
      };
    
    
    
    return ( 
        
            <div className='container'>
            <div className="editors">
                <CodeMirror
                value={code}
                className='cm1'
                width='100%'
                height='100%'
                theme={oneDarkTheme}
                onChange={onChange}
                />

                <CodeMirror
                className='cm2'
                value={OutPut}
                width='100%'
                height='100%'
                readOnly='true'
                theme={oneDarkTheme}
                />
            { 
                tables != ''? (
                <div className='tables'>
                <Markdown remarkPlugins={[remarkGfm]}>{tables}</Markdown>,

                </div>
                ) : null
            }
            </div>
            <div className='button'>
            <input type="file" onChange={handleFileSelect} />
                <button className='btn1' onClick={AnalyzeCode} > Run </button>
                <button className='btn2'> Generate Tree </button>
            </div>
            </div>
        
       )
}

export default Edito;