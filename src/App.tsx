import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
import Registration from './Pages/User/Registration/Registration';

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
      </Routes>
    </>
  )
}

export default App
