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
import FichaDoAluno from './pages/FichaDoAluno/FichaDoAluno.js';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import './axiosConfig'; // Importa a configuração do Axios

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderWrapper /> {/* Component que gerencia o Header */}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Encapsulando as rotas protegidas dentro do PrivateRoute */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/aluno" element={<PrivateRoute><Aluno /></PrivateRoute>} />
            <Route path="/professor" element={<PrivateRoute><Professor /></PrivateRoute>} />
            <Route path="/exercicio" element={<PrivateRoute><Exercicio /></PrivateRoute>} />
            <Route path="/fichatreino" element={<PrivateRoute><FichaTreino /></PrivateRoute>} />
            <Route path="/fichadoaluno" element={<PrivateRoute><FichaDoAluno /></PrivateRoute>} />
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
