// Importamos as ferramentas de autenticação para o logout
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

function DashboardPage() {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // O logout bem-sucedido será detectado pelo nosso "ouvinte" no App.jsx,
      // e o usuário será redirecionado para a tela de login.
      console.log('Usuário deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">
          Study Planner Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </header>

      <main>
        <h2 className="text-2xl">Bem-vindo(a)!</h2>
        <p className="text-gray-400 mt-2">
          Aqui você poderá adicionar e gerenciar seus cursos.
        </p>
        {/* Futuramente, o conteúdo principal do seu planner virá aqui */}
      </main>
    </div>
  );
}

export default DashboardPage;