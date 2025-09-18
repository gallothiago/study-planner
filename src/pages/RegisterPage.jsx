import { useState } from 'react';

function RegisterPage({ onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Tentativa de registro com:');
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Criar Nova Conta
        </h1>
        <p className="text-center text-gray-400">Preencha os dados para se registrar</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu-email@exemplo.com"
              // MUDANÇA: A cor do anel de foco agora é verde.
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
              // MUDANÇA: A cor do anel de foco agora é verde.
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              // MUDANÇA: A cor do botão agora é verde.
              className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Registrar
            </button>
          </div>
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