import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import Edito from './Edito';
function ReactTabs ()  {
    const [tabCount, setTabCount] = useState(1); // Inicialmente, tenemos 2 pestañas (Title 1 y Title 2).
    const [tabContents, setTabContents] = useState(['Contenido de la pestaña 1']);
  
    const handleAddTab = () => {
      setTabCount(tabCount + 1);
      setTabContents([...tabContents, '']); // Agrega una nueva pestaña con contenido vacío.
    };
  
    return (
      <Tabs>
        <TabList>
          {[...Array(tabCount).keys()].map((index) => (
            <Tab key={index}>Title {index + 1}</Tab>
          ))}
          <Tab onClick={handleAddTab}>+</Tab>
        </TabList>
  
        {[...Array(tabCount).keys()].map((index) => (
          <TabPanel key={index}>
            <h2>Tab content {index + 1}</h2>
            <Edito content={tabContents[index]}    onContentChange={(content) => {
              const updatedContents = [...tabContents];
              updatedContents[index] = content;
              setTabContents(updatedContents);
            }} />
          </TabPanel>
        ))}
      </Tabs>
    );
}
export default ReactTabs;