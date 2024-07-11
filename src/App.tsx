import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
import Registration from './Pages/User/Registration/Registration';
import QuizSettings from './Pages/QuizSettings/QuizSettings';

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/Settings' element={<QuizSettings />} />
      </Routes>
    </>
  )
}

export default App
