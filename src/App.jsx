// Explicação: O App.jsx agora tem uma única responsabilidade:
// importar e renderizar a nossa página de login.
// Ele serve como o ponto de entrada principal da nossa aplicação.
import LoginPage from './pages/LoginPage';

function App() {
  return <LoginPage />;
}

export default App;