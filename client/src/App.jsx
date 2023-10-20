//import { useState } from 'react'
import './App.css'

import {Home} from './Components/Home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  //const [count, setCount] = useState(0)

  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home titulo="hola" mostrar="mundo"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
