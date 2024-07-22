// styles
import './App.css';

// hooks
import React from 'react';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Header from './components/Header/Header.js';

// pages
import Home from './pages/Home/Home.js';
import Aluno from './pages/Aluno/Aluno.js';
import Professor from './pages/Professor/Professor.js';
import Exercicio from './pages/Exercicio/Exercicio.js';
import FichaTreino from './pages/FichaTreino/FichaTreino.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aluno" element={<Aluno />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/exercicio" element={<Exercicio />} />
            <Route path="/fichatreino" element={<FichaTreino />} />
          </Routes>
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </BrowserRouter>
    </div>
  );
}

export default App;
