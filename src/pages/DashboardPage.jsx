import { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import AddCourseForm from '../components/AddCourseForm';
import CourseList from '../components/CourseList';
import CompletedCourseList from '../components/CompletedCourseList';
import StudySchedule from '../components/StudySchedule';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

// 1. A função agora recebe uma nova propriedade: `onGoToHelp`
function DashboardPage({ user, onSelectCourse, onGoToHelp }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-grow p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <Logo />
            <p className="text-indigo-400 mt-1">
              Bem-vindo(a), {user.displayName || 'Utilizador'}!
            </p>
          </div>
          {/* 2. Criamos um container para os botões de ação do cabeçalho */}
          <div className="flex items-center gap-4 self-start md:self-center">
            <button
              onClick={onGoToHelp}
              className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Ajuda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
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
      <Footer />
    </div>
  );
}

export default DashboardPage;

