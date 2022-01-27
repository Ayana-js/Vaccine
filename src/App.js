import './App.css';
import PersonCard from './Card';
import { Route, Routes } from 'react-router-dom'
import EngCertificate from './EngCertificate';
import KgCertificate from "./KgCertificate";



function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/vaccine'
                  element={<PersonCard />}/>
      <Route path='/cerEng'
                  element={ <EngCertificate /> }/>
      <Route path='/cerKgz'
                  element={<KgCertificate />}/>
      </Routes>
    </div>
  );
}

export default App;
