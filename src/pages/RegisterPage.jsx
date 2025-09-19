import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../components/Logo';
import Footer from '../components/Footer'; // 1. Importamos o rodapé

function RegisterPage({ onSwitchPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!name) {
      alert('Por favor, preencha o seu nome.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      alert('Conta criada com sucesso! Agora você pode fazer login.');
      onSwitchPage('login');
    } catch (error) {
      console.error('Erro no registro:', error.message);
      alert(`Erro ao criar conta: ${error.message}`);
    }
  };

  return (
    // 2. Alteramos a estrutura para um layout de coluna
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-center text-gray-400">Preencha os dados para se registrar</p>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome completo"
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu-email@exemplo.com"
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Registrar
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-400">
            Já tem uma conta?{' '}
            <button onClick={() => onSwitchPage('login')} className="font-medium text-indigo-400 hover:underline">
              Faça login
            </button>
          </p>
        </div>
      </main>
      {/* 3. Adicionamos o componente de rodapé */}
      <Footer />
    </div>
  );
}

export default RegisterPage;