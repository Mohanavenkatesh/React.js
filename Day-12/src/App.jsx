
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Service from './pages/Service'
import Error from './Error'
function App() {


  return (
    <>

      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about/:g' element={<About></About>}></Route>
          <Route path='/Service' element={<Service></Service>}></Route>
          <Route path='/Contactus' element={<ContactUs></ContactUs>}></Route>
          <Route path='*' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
