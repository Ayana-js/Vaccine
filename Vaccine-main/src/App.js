import './App.css';
import { Route, Routes } from 'react-router-dom'
import PersonCard from './Card/Card'
import EngCertificate from './EngCertificate/EngCertificate';
import Result from './Result/Result';

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/vaccine'
                  element={ <PersonCard /> }/>
      <Route path='/cerEng'
                  element={ <EngCertificate /> }/>
        <Route path={'/result'}
                   element={<Result /> }/>
      </Routes>
    </div>
  );
}

export default App;
