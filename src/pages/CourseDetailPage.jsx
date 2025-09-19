import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import ScheduleForm from '../components/ScheduleForm';
import ScheduleList from '../components/ScheduleList';
import CvSuggestion from '../components/CvSuggestion';
import AddNoteForm from '../components/AddNoteForm';
import NoteList from '../components/NoteList';
import Footer from '../components/Footer';

const menuItems = [
  { id: 'anotacoes', label: 'Anotações' },
  { id: 'horarios', label: 'Horários de Estudo' },
  { id: 'certificado', label: 'Adicionar Certificado' },
  { id: 'curriculo', label: 'Sugestão para Currículo' },
  { id: 'editar', label: 'Editar Curso' },
];

function CourseDetailPage({ courseId, onGoBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificateUrl, setCertificateUrl] = useState('');
  const [activeTab, setActiveTab] = useState('anotacoes');
  const [editedName, setEditedName] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [editedPriority, setEditedPriority] = useState('baixa');

  useEffect(() => {
    const docRef = doc(db, 'courses', courseId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const courseData = { id: doc.id, ...doc.data() };
        setCourse(courseData);
        setCertificateUrl(courseData.certificateUrl || '');
        setEditedName(courseData.name);
        setEditedLink(courseData.link);
        setEditedPriority(courseData.priority);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [courseId]);

  const handleSaveCertificate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'courses', courseId);
    try {
      await updateDoc(docRef, { certificateUrl });
      alert('Link do certificado salvo com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar detalhes: ", error);
    }
  };

  const handleMarkAsComplete = async () => {
    const docRef = doc(db, 'courses', courseId);
    try {
      await updateDoc(docRef, { completed: !course.completed });
    } catch (error) {
      console.error("Erro ao atualizar status de conclusão: ", error);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'courses', courseId);
    try {
      await updateDoc(docRef, {
        name: editedName,
        link: editedLink,
        priority: editedPriority,
      });
      alert('Curso atualizado com sucesso!');
      setActiveTab('anotacoes');
    } catch (error) {
      console.error("Erro ao atualizar o curso: ", error);
      alert("Ocorreu um erro ao atualizar o curso.");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Carregando...</div>;
  if (!course) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Curso não encontrado.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-grow p-4 md:p-8">
        <header className="mb-8">
          <button onClick={onGoBack} className="text-indigo-400 hover:underline mb-4">&larr; Voltar para o Dashboard</button>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{course.name}</h1>
              <span className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${course.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}>
                {course.completed ? 'Concluído' : 'Em Progresso'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href={course.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Acessar Curso
              </a>
              <button onClick={handleMarkAsComplete} className={`px-4 py-2 font-bold text-white rounded-md ${course.completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}>
                {course.completed ? 'Reabrir Curso' : 'Concluir Curso'}
              </button>
            </div>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === item.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-3">
            {/* CORREÇÃO: Restauramos a lógica de renderização para todas as abas */}
            {activeTab === 'anotacoes' && (
              <div className="space-y-8">
                <AddNoteForm courseId={courseId} />
                <NoteList courseId={courseId} />
              </div>
            )}
            {activeTab === 'horarios' && (
              <div className="space-y-8">
                <ScheduleForm courseId={courseId} />
                <ScheduleList courseId={courseId} />
              </div>
            )}
            {activeTab === 'certificado' && (
               <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-white">Adicionar Certificado</h3>
                <form onSubmit={handleSaveCertificate}>
                  <label htmlFor="certificateUrl" className="block text-sm font-medium text-gray-300">Link do Certificado</label>
                  <div className="flex gap-2 mt-2">
                    <input type="url" id="certificateUrl" value={certificateUrl} onChange={(e) => setCertificateUrl(e.target.value)} placeholder="https://exemplo.com/certificado.pdf" className="flex-grow px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"/>
                    <button type="submit" className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Salvar Link</button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === 'curriculo' && (
              <CvSuggestion courseName={course.name} />
            )}
            {activeTab === 'editar' && (
              <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Editar Detalhes do Curso</h3>
                <form onSubmit={handleUpdateCourse} className="space-y-4">
                  <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-300">Nome do Curso</label>
                    <input type="text" id="courseName" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"/>
                  </div>
                  <div>
                    <label htmlFor="courseLink" className="block text-sm font-medium text-gray-300">Link do Curso</label>
                    <input type="url" id="courseLink" value={editedLink} onChange={(e) => setEditedLink(e.target.value)} className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"/>
                  </div>
                  <div>
                    <label htmlFor="coursePriority" className="block text-sm font-medium text-gray-300">Prioridade</label>
                    <select id="coursePriority" value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)} className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md">
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetailPage;