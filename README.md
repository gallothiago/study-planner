Study Planner.
Um web app moderno e pessoal para organizar e acompanhar o seu percurso de aprendizagem, construído com React, Firebase e Tailwind CSS, e com funcionalidades de IA do Google Gemini.

---

🚀 Funcionalidades Principais
Este projeto foi construído do zero e implementa um fluxo de trabalho completo para um utilizador que deseja gerir os seus estudos de forma eficiente.

Autenticação de Utilizadores: Sistema completo de login e registro com Firebase Authentication.

Dashboard Personalizado: Uma página principal que recebe o utilizador pelo nome e resume as suas atividades.

Gestão de Cursos:

Adicionar e remover cursos.

Marcar cursos como "Em Progresso" ou "Concluídos".

Listas separadas para cursos ativos e finalizados.

Página de Detalhes do Curso:

Um menu de navegação intuitivo para cada curso.

Anotações por Aula: Adicione múltiplas anotações com título e conteúdo para cada curso.

Planeador de Horários: Agende sessões de estudo para um curso em múltiplos dias da semana de uma só vez.

Certificados: Guarde um link para o certificado de conclusão.

Integração com IA:

Gere sugestões de texto personalizadas sobre como adicionar um curso ao seu currículo, utilizando a API do Google Gemini.

Design Responsivo: Interface limpa e funcional, adaptada para desktops e dispositivos móveis.

---

💻 Tecnologias Utilizadas
Frontend:

React: Biblioteca principal para a construção da interface.

Vite: Ferramenta de build para um desenvolvimento rápido.

Tailwind CSS: Framework de estilização para um design moderno e responsivo.

Backend & Base de Dados:

Firebase: Plataforma utilizada para:

Authentication: Gestão de utilizadores.

Cloud Firestore: Base de dados NoSQL em tempo real para guardar cursos, anotações e horários.

APIs Externas:

Google Gemini API: Para a funcionalidade de geração de texto por IA.

---

⚙️ Como Executar o Projeto Localmente
Para executar este projeto no seu ambiente de desenvolvimento, siga os passos abaixo.

Clone o repositório:

git clone [https://github.com/gallothiago/study-planner.git](https://github.com/gallothiago/study-planner.git)
cd study-planner

Instale as dependências:

npm install

Configure as Variáveis de Ambiente:

Crie um ficheiro chamado .env.local na raiz do projeto.

Adicione as suas chaves do Firebase e do Google Gemini a este ficheiro:

VITE_API_KEY="SUA_CHAVE_API_FIREBASE"
VITE_AUTH_DOMAIN="SEU_AUTH_DOMAIN_FIREBASE"
VITE_PROJECT_ID="SEU_PROJECT_ID_FIREBASE"
VITE_STORAGE_BUCKET="SEU_STORAGE_BUCKET_FIREBASE"
VITE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID_FIREBASE"
VITE_APP_ID="SEU_APP_ID_FIREBASE"
VITE_GEMINI_API_KEY="SUA_CHAVE_GEMINI_API"

Inicie o servidor de desenvolvimento:

npm run dev

---

A aplicação estará disponível em http://localhost:5173 (ou noutra porta indicada).

---

✨ Criado por
Thiago Medeiros Gallo
