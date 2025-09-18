import { useState } from 'react';
// CORREÇÃO: O caminho agora é '../firebase/config'
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function RegisterPage({ onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário registrado:', userCredential.user);
      alert('Conta criada com sucesso! Agora você pode fazer login.');
      onSwitchPage('login');
    } catch (error) {
      console.error('Erro no registro:', error.message);
      alert(`Erro ao criar conta: ${error.message}`);
    }
  };

  // O resto do arquivo continua igual...
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Criar Nova Conta
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Campos de Input */}
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Registrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Já tem uma conta?{' '}
          <button onClick={() => onSwitchPage('login')} className="font-medium text-blue-500 hover:underline">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;