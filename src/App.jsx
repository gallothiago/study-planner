import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPage, setAuthPage] = useState('login');

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

  // A única mudança neste arquivo foi aqui: passamos o `user` para o Dashboard.
  return <DashboardPage user={user} />;
}

export default App;