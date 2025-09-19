import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
// 1. Importamos os novos componentes
import AddCourseForm from '../components/AddCourseForm';
import CourseList from '../components/CourseList';

// 2. O Dashboard agora recebe o objeto `user` como prop
function DashboardPage({ user }) {

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Study Planner
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </header>

      <main>
        {/* 3. Renderizamos o formulário e a lista, passando o `user` para eles */}
        <AddCourseForm user={user} />
        <CourseList user={user} />
      </main>
    </div>
  );
}

export default DashboardPage;