import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

function CourseList({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referência para a coleção 'courses'
    const coursesCollection = collection(db, 'courses');
    
    // Criamos uma query para buscar apenas os cursos do usuário logado (user.uid),
    // ordenados pela data de criação.
    const q = query(
      coursesCollection,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    // onSnapshot cria um "ouvinte" em tempo real.
    // Sempre que algo mudar na query (um curso novo, uma remoção),
    // este código será executado novamente, atualizando a tela automaticamente!
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
      setLoading(false);
    });

    // Limpa o ouvinte quando o componente for desmontado
    return () => unsubscribe();
  }, [user.uid]); // O useEffect depende do user.uid

  if (loading) {
    return <p className="text-center text-gray-400">Carregando cursos...</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Meus Cursos</h3>
      {courses.length === 0 ? (
        <p className="text-gray-400">Você ainda não adicionou nenhum curso.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="p-4 bg-gray-700 rounded-md flex justify-between items-center">
              <div>
                <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-400 hover:underline">
                  {course.name}
                </a>
                <p className="text-sm text-gray-300">Prioridade: {course.priority}</p>
              </div>
              {/* Futuramente, adicionaremos botões de ação aqui (editar, deletar, etc) */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList;