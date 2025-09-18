// 1. Importamos o Hook `useState` do React.
import { useState } from 'react';

function LoginPage() {
  // 2. Criamos duas variáveis de estado.
  //    - `email` guardará o valor do campo de e-mail. `setEmail` é a função para atualizá-lo.
  //    - `password` guardará o valor do campo de senha. `setPassword` é a função para atualizá-lo.
  //    Ambas começam com um valor inicial de string vazia ('').
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Criamos uma função para lidar com o envio do formulário.
  const handleLogin = (event) => {
    // event.preventDefault() é MUITO IMPORTANTE. Ele impede que o navegador
    // recarregue a página, que é o comportamento padrão de um formulário.
    event.preventDefault();

    // Por enquanto, vamos apenas mostrar os dados no console do navegador
    // para confirmar que estamos capturando os valores corretamente.
    console.log('Tentativa de login com:');
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Study Planner
        </h1>
        <p className="text-center text-gray-400">Faça login para continuar</p>

        {/* 4. Conectamos nossa função `handleLogin` ao evento `onSubmit` do formulário. */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu-email@exemplo.com"
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              // 5. Conectamos o input ao estado.
              //    - `value`: O valor exibido no campo é sempre o da nossa variável de estado `email`.
              //    - `onChange`: A cada tecla digitada, chamamos a função `setEmail` para atualizar o estado
              //      com o novo valor do campo (e.target.value).
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
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              //    Fazemos o mesmo para o campo de senha.
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;