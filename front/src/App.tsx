import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/home' element={<Home />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/admin' element={<Admin />} /> 
      </Routes>
    </>
  )
}

export default App;
