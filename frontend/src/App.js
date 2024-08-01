import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header.js';
import Home from './pages/Home/Home.js';
import Aluno from './pages/Aluno/Aluno.js';
import Professor from './pages/Professor/Professor.js';
import Exercicio from './pages/Exercicio/Exercicio.js';
import FichaTreino from './pages/FichaTreino/FichaTreino.js';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderWrapper /> {/* Component que gerencia o Header */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aluno" element={<Aluno />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/exercicio" element={<Exercicio />} />
            <Route path="/fichatreino" element={<FichaTreino />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </AuthProvider>
    </BrowserRouter>
  );
}

const HeaderWrapper = () => {
  const location = useLocation(); // Hook do react-router-dom para obter a localização atual
  return location.pathname !== '/login' && <Header />; // Renderiza o Header se não estiver na página de login
};

export default App;
