import React,{useState} from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { oneDarkTheme } from '@uiw/react-codemirror';
import '../Css/Edit.css'
import axios from 'axios';
import { url } from '../URL/urls';
import Markdown  from 'react-markdown'
import remarkGfm from 'remark-gfm'

function EditTabs () { 
//code usestat

    const [code, setCode] = useState('');
    const [OutPut, setOutPut] = useState('');
    const [tables, setTables] = useState('');
    const [tabs, setTabs] = useState([
        {
          id: 1,
          title: 'Tab 1',
          content: '',
        },
      ]);
    
      const [activeTab, setActiveTab] = useState(tabs[0]);
    
      const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    
      const handleCodeChange = (content) => {
        const updatedTabs = [...tabs];
        const tabToUpdate = updatedTabs.find((tab) => tab.id === activeTab.id);
        if (tabToUpdate) {
          tabToUpdate.content = content;
        }
        setTabs(updatedTabs);
      };
    
      const renderTabs = tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${activeTab.id === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.title}
        </div>
      ));   
      

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

    }
    
    
    return (
        <div className="container">
        <h1> hola </h1>
          <div className="tabs-container">{renderTabs}</div>
          <div className="editors">
            <CodeMirror
              value={activeTab.content}
              className="cm1"
              width="100%"
              height="100%"
              theme={oneDarkTheme}
              onChange={onChange}
            />
    
            <CodeMirror
              className="cm2"
              value={activeTab.content}
              width="100%"
              height="100%"
              readOnly="true"
              theme={oneDarkTheme}
            />
          </div>
          {activeTab.content !='' ? (
            <div className="tables">
              <Markdown remarkPlugins={[remarkGfm]}>{activeTab.content}</Markdown>
            </div>
          ) : null}
        </div>
      );
}

export default EditTabs;