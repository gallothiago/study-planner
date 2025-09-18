import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  // Estado para controlar qual página está sendo exibida. Começa com 'login'.
  const [currentPage, setCurrentPage] = useState('login');

  // Função para mudar de página. Vamos passá-la para os componentes filhos.
  const handleSwitchPage = (pageName) => {
    setCurrentPage(pageName);
  };

  // Renderização condicional:
  // Se `currentPage` for 'login', mostra LoginPage.
  // Senão, mostra RegisterPage.
  // Passamos a função `handleSwitchPage` como uma prop chamada `onSwitchPage`.
  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage onSwitchPage={handleSwitchPage} />
      ) : (
        <RegisterPage onSwitchPage={handleSwitchPage} />
      )}
    </div>
  );
}

export default App;