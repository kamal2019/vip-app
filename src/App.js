import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Posts from './pages/Posts'
import Certificates from './pages/Certificates'
import Participants from './pages/Participants'
import NotFound from './pages/NotFound'
import About from './pages/About'
import EditPost from './pages/EditPost'
import EditUser from './pages/EditUser'
import AddPost from './pages/AddPost'
import AddCertificate from './pages/AddCertificate'
import MyCertificates from './pages/MyCertificates'
import MyParticipations from './pages/MyParticipations'
import Settings from './pages/Settings'
import Users from './pages/Users'
import User from './pages/User'

import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/notfound' element={<NotFound />} />

          <Route path='/my-certificates' element={<MyCertificates />} />
          <Route path='/my-participations' element={<MyParticipations />} />

          <Route path='/posts/' element={<Posts />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/create-post' element={<AddPost />} />
          <Route path='/edit-post/:id' element={<EditPost />} />

          <Route path='/certificates/' element={<Certificates />} />
          <Route path='/create-certificate' element={<AddCertificate />} />

          <Route path='/participants/' element={<Participants />} />

          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
        </Routes>
      </Router>
      <ToastContainer position='bottom-right' closeOnClick />

      <Footer />
    </>
  )
}

export default App
