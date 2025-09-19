import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseDetailPage from './pages/CourseDetailPage'; // 1. Importamos a nova página
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPage, setAuthPage] = useState('login');
  // 2. Novo estado para controlar o curso selecionado
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSwitchPage = (pageName) => {
    setAuthPage(pageName);
  };

  // 3. Funções para navegar para os detalhes e voltar
  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleGoBackToDashboard = () => {
    setSelectedCourseId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return authPage === 'login' ? (
      <LoginPage onSwitchPage={handleSwitchPage} />
    ) : (
      <RegisterPage onSwitchPage={handleSwitchPage} />
    );
  }

  // 4. Lógica de renderização atualizada
  // Se um curso está selecionado, mostramos a página de detalhes.
  // Senão, mostramos o Dashboard.
  return selectedCourseId ? (
    <CourseDetailPage courseId={selectedCourseId} onGoBack={handleGoBackToDashboard} />
  ) : (
    <DashboardPage user={user} onSelectCourse={handleSelectCourse} />
  );
}

export default App;