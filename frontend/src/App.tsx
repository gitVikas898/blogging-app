import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Footer from './components/Footer'
import ReadBlog from './pages/ReadBlog'
import PrivateRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import WriteBlog from './pages/WriteBlog';
function App() {


  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-right"></Toaster>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/blogs/:id' element={<ReadBlog />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path='/write' element={
          <PrivateRoute>
            <WriteBlog />
          </PrivateRoute>
        } />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
