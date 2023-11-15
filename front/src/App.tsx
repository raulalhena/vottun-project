import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
// const Home = React.lazy(() => import('./pages/Home'));

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/home' element={<Home />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
      </Routes>
    </>
  )
}

export default App;
