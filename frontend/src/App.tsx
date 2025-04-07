import './App.css'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Footer from './components/Footer'
import ReadBlog from './pages/ReadBlog'
function App() {


  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/blogs' element={<Blogs/>}></Route>
            <Route path='/blogs/:id' element={<ReadBlog/>}></Route>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App
