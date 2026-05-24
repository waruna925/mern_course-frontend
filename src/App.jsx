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

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
      <Toaster position='top-middle' />
        <Routes path="/*">
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/counter' element={<Counter/>} />
          <Route path='/admin/*' element={<AdminPanel/>} />
          <Route path='/*' element={<h1 className='text-5xl text-red-500 text-center'>404 Not Found</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App