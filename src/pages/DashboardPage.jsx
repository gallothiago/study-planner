import { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import AddCourseForm from '../components/AddCourseForm';
import CourseList from '../components/CourseList';
import CompletedCourseList from '../components/CompletedCourseList';
import StudySchedule from '../components/StudySchedule';
import Logo from '../components/Logo';
import Footer from '../components/Footer'; // 1. Importamos o rodapé

function DashboardPage({ user, onSelectCourse }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    // 2. Alteramos a estrutura para um layout de coluna
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-grow p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <Logo />
            <p className="text-indigo-400 mt-1">
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
          {isFormVisible ? (
            <AddCourseForm user={user} onClose={() => setIsFormVisible(false)} />
          ) : (
            <div className="mb-8">
              <button
                onClick={() => setIsFormVisible(true)}
                className="w-full md:w-auto px-6 py-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                + Adicionar Novo Curso
              </button>
            </div>
          )}

          <StudySchedule user={user} onSelectCourse={onSelectCourse} />
          <CourseList user={user} onSelectCourse={onSelectCourse} />
          <CompletedCourseList user={user} onSelectCourse={onSelectCourse} />
        </main>
      </div>
      {/* 3. Adicionamos o rodapé */}
      <Footer />
    </div>
  );
}

export default DashboardPage;

