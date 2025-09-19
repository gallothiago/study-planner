import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import AddCourseForm from '../components/AddCourseForm';
import CourseList from '../components/CourseList';

// O Dashboard recebe o objeto `user` completo do App.jsx
function DashboardPage({ user, onSelectCourse }) {

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
          {/* 1. Verificamos se user.displayName existe e o exibimos */}
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
        <AddCourseForm user={user} />
        <CourseList user={user} onSelectCourse={onSelectCourse} />
      </main>
    </div>
  );
}

export default DashboardPage;
