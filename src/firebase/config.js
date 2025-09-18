// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Futuramente, importaremos outros serviços como o Firestore aqui

// Explicação: Este objeto de configuração agora lê as variáveis de ambiente
// do arquivo .env.local de forma segura, usando import.meta.env.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Inicializa o Firebase com nossa configuração
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de Autenticação e o exporta para ser usado em outras partes do app
export const auth = getAuth(app);