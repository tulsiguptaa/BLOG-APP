import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
      
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/post' element={<Post />}></Route>
        <Route path='/post/:id' element={<Post />}></Route>
      </Routes>
    </div>
  )
}

export default App
