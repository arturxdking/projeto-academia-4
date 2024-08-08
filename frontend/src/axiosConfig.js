import axios from 'axios';

// Configura o interceptor para adicionar o token em todas as requisições
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Enviando token no cabeçalho:', token); // Log de depuração
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
