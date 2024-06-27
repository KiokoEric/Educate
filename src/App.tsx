import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Registration from './Pages/User/Registration/Registration';

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/Registration' element={<Registration />} />
      </Routes>
    </>
  )
}

export default App
