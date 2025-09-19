import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // 1. Importamos a nova página
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPage, setAuthPage] = useState('login'); // O estado que controla qual página de auth mostrar
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

  // Se não houver utilizador, entramos na lógica de autenticação
  if (!user) {
    // 2. Usamos um switch para decidir qual página de autenticação renderizar
    switch (authPage) {
      case 'register':
        return <RegisterPage onSwitchPage={handleSwitchPage} />;
      case 'forgot-password':
        return <ForgotPasswordPage onSwitchPage={handleSwitchPage} />;
      default: // O caso padrão será sempre a página de login
        return <LoginPage onSwitchPage={handleSwitchPage} />;
    }
  }

  // Se houver utilizador, entramos na lógica da aplicação principal
  return selectedCourseId ? (
    <CourseDetailPage courseId={selectedCourseId} onGoBack={handleGoBackToDashboard} />
  ) : (
    <DashboardPage user={user} onSelectCourse={handleSelectCourse} />
  );
}

export default App;