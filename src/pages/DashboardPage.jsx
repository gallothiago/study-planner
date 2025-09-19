import { useState } from 'react'; // 1. Importamos o useState
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import AddCourseForm from '../components/AddCourseForm';
import CourseList from '../components/CourseList';

function DashboardPage({ user, onSelectCourse }) {
  // 2. Criamos um estado para controlar a visibilidade do formulário
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Study Planner
          </h1>
          <p className="text-indigo-400">
            Bem-vindo(a), {user.displayName || 'Utilizador'}!
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 self-start md:self-center"
        >
          Logout
        </button>
      </header>

      <main>
        {/* 3. Lógica de renderização condicional */}
        {isFormVisible ? (
          // Se for visível, mostramos o formulário e passamos uma função para o fechar
          <AddCourseForm user={user} onClose={() => setIsFormVisible(false)} />
        ) : (
          // Senão, mostramos o botão para o abrir
          <div className="mb-8">
            <button
              onClick={() => setIsFormVisible(true)}
              className="w-full md:w-auto px-6 py-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              + Adicionar Novo Curso
            </button>
          </div>
        )}

        <CourseList user={user} onSelectCourse={onSelectCourse} />
      </main>
    </div>
  );
}

export default DashboardPage;

