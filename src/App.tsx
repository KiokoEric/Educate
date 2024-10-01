import './App.css';
import React from 'react';
import Login from './Pages/User/Login/Login';
import Header from './Components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './Components/Context/AppContext';
import { useGetUserID } from './Components/Hooks/useGetUserID';
const HomePage = React.lazy(() => import('./Pages/Home/Home'));
import ErrorBoundary from './Pages/ErrorBoundary/ErrorBoundary';
const CreatePage = React.lazy(() => import('./Pages/Create/Create'));
const MyQuizPage = React.lazy(() => import('./Pages/MyQuiz/MyQuiz'));
const QuizzesPage = React.lazy(() => import('./Pages/Quizzes/Quizzes'));
const QuestionPage = React.lazy(() => import('./Pages/Question/Question'));
const ProfilePage = React.lazy(() => import('./Pages/User/Profile/Profile'));
const QuizSettingsPage = React.lazy(() => import('./Pages/QuizSettings/QuizSettings'));
const EditProfilePage = React.lazy(() => import('./Pages/User/EditProfile/EditProfile'));
const RegistrationPage = React.lazy(() => import('./Pages/User/Registration/Registration'));
const DeleteProfilePage = React.lazy(() => import('./Pages/User/DeleteProfile/DeleteProfile'))

function App() {

  const ID = useGetUserID()

  return (
  <AppProvider>
    <Header />
      <Routes>
        <Route path='/' element={ <Login /> }/>
        <Route path='/MyQuiz/:_id' element={<React.Suspense><MyQuizPage /></React.Suspense>}/>
        <Route path='/Registration' element={<React.Suspense><RegistrationPage /> </React.Suspense> }/>
        <Route path='/Home' element={ID ? <React.Suspense><HomePage /></React.Suspense> : <ErrorBoundary />} />
        <Route path='/Create' element={ID ? <React.Suspense><CreatePage /> </React.Suspense> : <ErrorBoundary /> }/>
        <Route path='/Quizzes' element={ID ? <React.Suspense><QuizzesPage /></React.Suspense> : <ErrorBoundary />} />
        <Route path='/Questions' element={ID ? <React.Suspense><QuestionPage /> </React.Suspense> : <ErrorBoundary />} />
        <Route path='/Settings' element={ID ? <React.Suspense><QuizSettingsPage /> </React.Suspense> : <ErrorBoundary />} />
        <Route path='/Profile/:userID' element={ID ? <React.Suspense><ProfilePage/> </React.Suspense> : <ErrorBoundary /> }/>
        <Route path='/EditProfile/:userID' element={ID ? <React.Suspense><EditProfilePage/> </React.Suspense> : <ErrorBoundary /> }/>
        <Route path='/DeleteProfile' element={ID ? <React.Suspense><DeleteProfilePage/> </React.Suspense> : <ErrorBoundary /> }/>
      </Routes>
  </AppProvider>
  )
}

export default App
