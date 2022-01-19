import './App.css';
import PersonCard from './Card';
import { Route, Routes } from 'react-router-dom'
import EngCertificate from './EngCertificate';



function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/vaccine'
                  element={<PersonCard />}/>
      <Route path='/cerEng'
                  element={ <EngCertificate /> }/>
      </Routes>
    </div>
  );
}

export default App;
