import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

function LoginPage({ onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro no login:', error.message);
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-center text-gray-400">Faça login para continuar</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu-email@exemplo.com"
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="text-right">
              <button
                type="button"
                onClick={() => onSwitchPage('forgot-password')}
                className="text-xs font-medium text-indigo-400 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Entrar
              </button>
            </div>
          </form>
          
          {/* 1. Alteramos esta secção para incluir o link de ajuda */}
          <div className="flex justify-between items-center text-sm mt-6">
            <button onClick={() => onSwitchPage('help')} className="font-medium text-indigo-400 hover:underline">
              Como usar?
            </button>
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <button onClick={() => onSwitchPage('register')} className="font-medium text-indigo-400 hover:underline">
                Crie uma
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;