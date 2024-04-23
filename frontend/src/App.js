// styles
import './App.css';

// hooks
import React, { useEffect, useState } from 'react';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// components


// pages
import Home from './pages/Home/Home.js';
import Aluno from './pages/Aluno/Aluno.js';

function App() {

  return (
    <div className="container">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aluno" element={<Aluno />} />
          </Routes>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </BrowserRouter>
    </div>
  );
}

export default App;