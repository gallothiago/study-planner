import Logo from '../components/Logo';
import Footer from '../components/Footer';

function HelpPage({ onSwitchPage }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Como Usar o Study Planner
          </h2>
          
          <div className="space-y-6 text-gray-300 max-h-[60vh] overflow-y-auto pr-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg text-indigo-400">1. Dashboard Principal</h3>
              <p className="mt-2 text-sm">
                Após o login, o Dashboard é a sua central. Aqui você vê o seu plano de estudos semanal, a lista de cursos em progresso e os cursos que já concluiu. Use o botão "+ Adicionar Novo Curso" para começar a organizar os seus estudos.
              </p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg text-indigo-400">2. Detalhes do Curso</h3>
              <p className="mt-2 text-sm">
                Clique em qualquer curso na lista para aceder à sua página de detalhes. Lá, você encontrará um menu para gerir tudo sobre aquele curso específico.
              </p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg text-indigo-400">3. Anotações e Horários</h3>
              <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                <li><strong>Anotações:</strong> Adicione múltiplas anotações para cada aula ou tópico. Perfeito para guardar resumos e pontos importantes.</li>
                <li><strong>Horários de Estudo:</strong> Use o planeador para agendar os seus estudos. Pode selecionar vários dias da semana para o mesmo horário, e eles aparecerão no seu plano de estudos no Dashboard.</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg text-indigo-400">4. Gestão e Conclusão</h3>
              <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                <li><strong>Adicionar Certificado:</strong> Guarde o link do seu certificado de conclusão para fácil acesso.</li>
                <li><strong>Sugestão para Currículo:</strong> Use a nossa integração com IA para gerar uma sugestão de como descrever este curso no seu currículo.</li>
                <li><strong>Concluir Curso:</strong> Quando terminar um curso, marque-o como concluído! Ele será movido para a lista de "Cursos Concluídos" no seu Dashboard.</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={() => onSwitchPage('login')} className="px-6 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              &larr; Voltar
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HelpPage;