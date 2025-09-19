import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // Estado para guardar o objeto do usuário, se estiver logado. Começa como null.
  const [user, setUser] = useState(null);
  // Estado para saber se a verificação inicial de autenticação já terminou.
  const [loading, setLoading] = useState(true);
  // Estado para alternar entre as telas de login e registro.
  const [authPage, setAuthPage] = useState('login');

  // useEffect é usado para executar código uma vez quando o componente é montado.
  // Perfeito para configurar nosso "ouvinte".
  useEffect(() => {
    // onAuthStateChanged fica "ouvindo" as mudanças de login/logout.
    // Ele retorna uma função `unsubscribe` para podermos limpar o ouvinte.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário (pode ser o objeto do usuário ou null)
      setLoading(false); // Marca que a verificação terminou
    });

    // Função de limpeza: será executada quando o componente for "desmontado".
    // Isso evita vazamentos de memória.
    return () => unsubscribe();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez.

  const handleSwitchPage = (pageName) => {
    setAuthPage(pageName);
  };

  // Enquanto a verificação estiver acontecendo, mostramos uma tela de carregamento.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Carregando...
      </div>
    );
  }

  // Se a verificação terminou e NÃO há usuário, mostramos as páginas de autenticação.
  if (!user) {
    return authPage === 'login' ? (
      <LoginPage onSwitchPage={handleSwitchPage} />
    ) : (
      <RegisterPage onSwitchPage={handleSwitchPage} />
    );
  }

  // Se a verificação terminou e HÁ um usuário, mostramos o Dashboard!
  return <DashboardPage />;
}

export default App;