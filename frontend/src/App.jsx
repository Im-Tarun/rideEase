import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import UserRegister from './pages/UserRegister.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainRegister from './pages/CaptainRegister.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import StartPage from './pages/StartPage.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import Logout from './pages/Logout.jsx';
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import CapainRiding from './pages/CapainRiding.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />}></Route>
        <Route path='/captain-register' element={<CaptainRegister />}></Route>
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/user-register' element={<UserRegister />}></Route>
        <Route path='/user-login' element={<UserLogin />}></Route>
        <Route path='/home' element={
          <UserProtectedWrapper>
            <HomePage />
          </UserProtectedWrapper>}></Route>

        <Route path='/logout' element={
          <UserProtectedWrapper>
            <Logout />
          </UserProtectedWrapper>}></Route>

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>}></Route>

        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>}></Route>

          <Route path='/captain-riding' element={
          <CaptainProtectedWrapper>
            <CapainRiding />
          </CaptainProtectedWrapper>}></Route>

      </Routes>
    </>
  )
}

export default App
