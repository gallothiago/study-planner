import { useState } from 'react';
// CORREÇÃO: O caminho agora é '../firebase/config'
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage({ onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado:', userCredential.user);
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro no login:', error.message);
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };
  
  // O resto do arquivo continua igual...
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Study Planner
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campos de Input */}
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Não tem uma conta?{' '}
          <button onClick={() => onSwitchPage('register')} className="font-medium text-blue-500 hover:underline">
            Crie uma
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;