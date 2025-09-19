import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HelpPage from './pages/HelpPage'; // 1. Importamos a página de Ajuda
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPage, setAuthPage] = useState('login');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  // 2. Novo estado para controlar a visibilidade da página de ajuda
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Esta função agora lida com todas as trocas de páginas "não autenticadas"
  const handleSwitchPage = (pageName) => {
    if (pageName === 'help') {
      setIsHelpVisible(true);
    } else {
      setAuthPage(pageName);
    }
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
  
  // 4. Se a ajuda for solicitada, mostramo-la por cima de tudo.
  // O botão de voltar na página de ajuda irá simplesmente desativar esta flag.
  if (isHelpVisible) {
    return <HelpPage onSwitchPage={() => setIsHelpVisible(false)} />;
  }

  // Se não houver utilizador, mostramos as páginas de autenticação
  if (!user) {
    switch (authPage) {
      case 'register':
        return <RegisterPage onSwitchPage={handleSwitchPage} />;
      case 'forgot-password':
        return <ForgotPasswordPage onSwitchPage={handleSwitchPage} />;
      default:
        return <LoginPage onSwitchPage={handleSwitchPage} />;
    }
  }

  // Se houver utilizador, mostramos a aplicação principal
  return selectedCourseId ? (
    <CourseDetailPage courseId={selectedCourseId} onGoBack={handleGoBackToDashboard} />
  ) : (
    <DashboardPage 
      user={user} 
      onSelectCourse={handleSelectCourse} 
      onGoToHelp={() => setIsHelpVisible(true)} // Passamos a função para o Dashboard
    />
  );
}

export default App;