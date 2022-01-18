import './App.css';
import PersonCard from './Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EngCertificate from './EngCertificate';
import KgzCertificate from './KgzCertificate';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
      <Route path='/vaccine'
                  element={<PersonCard />}/>
      <Route path='/vaccine/cerEng'
                  element={<EngCertificate />}/>
      <Route path='/vaccine/cerKgz'
                  element={<KgzCertificate />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
