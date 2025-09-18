// Explicação: Este é o nosso componente de página de login.
// Usamos Tailwind CSS para criar um layout flexível que centraliza o conteúdo.
// O formulário em si é um "card" com fundo escuro, sombra e cantos arredondados.
function LoginPage() {
  return (
    // Container principal: ocupa a tela inteira (h-screen), fundo cinza escuro,
    // usa flexbox para centralizar os itens na horizontal e vertical.
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">

      {/* Card do formulário */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Study Planner
        </h1>
        <p className="text-center text-gray-400">Faça login para continuar</p>

        {/* Formulário */}
        <form className="space-y-6">
          {/* Campo de E-mail */}
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
            />
          </div>

          {/* Campo de Senha */}
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
            />
          </div>

          {/* Botão de Login */}
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