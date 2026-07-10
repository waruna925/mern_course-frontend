import './App.css'
import { useState } from 'react'
import Header from './components/header'
import UserData from './components/userData'
import Card from './components/card'
import Login from './pages/login'
import SignUp from './pages/signUp'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPanel from './pages/adminPanel'
import Counter from './pages/counter'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <>
      <Toaster position='top-middle' />
        <Routes path="/*">
          <Route path="/login" element={<Login/>} />
          <Route path='/forget' element={<ForgetPassword/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/counter' element={<Counter/>} />
          <Route path='/admin/*' element={<AdminPanel/>} />
          <Route path='/*' element={<Home/>} />
        </Routes>
      </>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App