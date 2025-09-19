import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import ScheduleForm from '../components/ScheduleForm';
import ScheduleList from '../components/ScheduleList';
import CvSuggestion from '../components/CvSuggestion';

function CourseDetailPage({ courseId, onGoBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [lastLesson, setLastLesson] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  useEffect(() => {
    const docRef = doc(db, 'courses', courseId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const courseData = { id: doc.id, ...doc.data() };
        setCourse(courseData);
        setNotes(courseData.notes || '');
        setLastLesson(courseData.lastLesson || '');
        setCertificateUrl(courseData.certificateUrl || '');
      } else {
        console.log("Documento não encontrado!");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [courseId]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'courses', courseId);
    try {
      await updateDoc(docRef, { notes, lastLesson, certificateUrl });
      alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar o curso: ", error);
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

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Carregando...</div>;
  if (!course) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Curso não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <button onClick={onGoBack} className="text-indigo-400 hover:underline mb-4">&larr; Voltar para o Dashboard</button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">{course.name}</h1>
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline">Acessar o curso</a>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${course.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}>
            {course.completed ? 'Concluído' : 'Em Progresso'}
          </span>
        </div>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <form onSubmit={handleSaveChanges} className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4 h-fit">
            <div>
              <label htmlFor="lastLesson" className="block text-sm font-medium text-gray-300">Última aula assistida</label>
              <input type="text" id="lastLesson" value={lastLesson} onChange={(e) => setLastLesson(e.target.value)} placeholder="Ex: Secção 5, Aula 32" className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300">Anotações</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="8" placeholder="Digite as suas anotações..." className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <div>
              <label htmlFor="certificateUrl" className="block text-sm font-medium text-gray-300">Link do Certificado</label>
              <input type="url" id="certificateUrl" value={certificateUrl} onChange={(e) => setCertificateUrl(e.target.value)} placeholder="https://exemplo.com/certificado.pdf" className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Salvar Alterações</button>
          </form>

          <div className="p-6 bg-gray-800 rounded-xl shadow-lg flex justify-between items-center">
             <h3 className="text-lg font-bold text-white">Estado do Curso</h3>
             <button onClick={handleMarkAsComplete} className={`px-4 py-2 font-bold text-white rounded-md ${course.completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}>
               {course.completed ? 'Marcar "Em Progresso"' : 'Marcar como Concluído'}
             </button>
          </div>

          <CvSuggestion courseName={course.name} />
        </div>

        <div className="space-y-8">
          <ScheduleForm courseId={courseId} />
          <ScheduleList courseId={courseId} />
        </div>
      </main>
    </div>
  );
}

export default CourseDetailPage;
