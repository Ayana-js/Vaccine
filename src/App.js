import './App.css';
import PersonCard from './Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EngCertificate from './EngCertificate';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
      <Route path='/vaccine'
                  element={<PersonCard />}/>
      <Route path='/cerEng'
                  element={<EngCertificate />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
