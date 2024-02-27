import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Profile from './pages/Profile';
import Signin from './pages/signin';
import Signup from './pages/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signout" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
