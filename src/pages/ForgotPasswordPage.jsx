import { useState } from 'react';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

function ForgotPasswordPage({ onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-mail de recuperação enviado! Por favor, verifique a sua caixa de entrada.');
    } catch (err) {
      console.error("Erro ao enviar e-mail de recuperação:", err);
      setError('Não foi possível enviar o e-mail. Verifique se o endereço está correto.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">Recuperar Senha</h2>
          <p className="text-center text-gray-400">
            Digite o seu e-mail e nós enviaremos um link para redefinir a sua senha.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {message && <p className="text-sm text-green-400">{message}</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Enviar E-mail de Recuperação (verifique o spam)
              </button>
            </div>
          </form>
          <div className="text-center">
            <button onClick={() => onSwitchPage('login')} className="text-sm font-medium text-indigo-400 hover:underline">
              &larr; Voltar para o Login
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
