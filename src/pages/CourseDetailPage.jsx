import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
// 1. Importamos os novos componentes que acabou de criar
import ScheduleForm from '../components/ScheduleForm';
import ScheduleList from '../components/ScheduleList';

function CourseDetailPage({ courseId, onGoBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [lastLesson, setLastLesson] = useState('');

  // Este useEffect continua igual, buscando os dados principais do curso
  useEffect(() => {
    const docRef = doc(db, 'courses', courseId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const courseData = { id: doc.id, ...doc.data() };
        setCourse(courseData);
        setNotes(courseData.notes || '');
        setLastLesson(courseData.lastLesson || '');
      } else {
        console.log("Documento não encontrado!");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [courseId]);

  // Esta função de salvar as anotações também continua igual
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'courses', courseId);
    try {
      await updateDoc(docRef, {
        notes: notes,
        lastLesson: lastLesson
      });
      alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar o curso: ", error);
      alert("Erro ao salvar as alterações.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Carregando...</div>;
  }

  if (!course) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Curso não encontrado.</div>;
  }

  // A principal mudança está aqui no JSX retornado
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <button onClick={onGoBack} className="text-blue-400 hover:underline mb-4">
          &larr; Voltar para o Dashboard
        </button>
        <h1 className="text-3xl font-bold text-white">{course.name}</h1>
        <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
          Acessar o curso
        </a>
      </header>

      {/* 2. Criamos um layout de duas colunas para ecrãs maiores */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Coluna da Esquerda: Anotações e Lição */}
        <form onSubmit={handleSaveChanges} className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4 h-fit">
          <div>
            <label htmlFor="lastLesson" className="block text-sm font-medium text-gray-300">Última aula assistida</label>
            <input
              type="text"
              id="lastLesson"
              value={lastLesson}
              onChange={(e) => setLastLesson(e.target.value)}
              placeholder="Ex: Secção 5, Aula 32"
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300">Anotações</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="10"
              placeholder="Digite as suas anotações sobre o curso aqui..."
              className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
            Salvar Alterações
          </button>
        </form>

        {/* 3. Coluna da Direita: Planeador de Horários */}
        <div className="space-y-8">
          <ScheduleForm courseId={courseId} />
          <ScheduleList courseId={courseId} />
        </div>
      </main>
    </div>
  );
}

export default CourseDetailPage;
