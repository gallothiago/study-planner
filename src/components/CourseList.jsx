import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
// 1. Importamos as funções `doc` e `deleteDoc` do Firestore
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';

function CourseList({ user, onSelectCourse }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coursesCollection = collection(db, 'courses');
    const q = query(
      coursesCollection,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  // 2. Criamos uma função assíncrona para lidar com a exclusão
  const handleDelete = async (e, courseId) => {
    // e.stopPropagation() impede que o clique no botão ative o clique no <li>,
    // que nos levaria para a página de detalhes.
    e.stopPropagation();

    // Seria ideal ter uma confirmação aqui, mas por agora vamos excluir diretamente.
    const docRef = doc(db, 'courses', courseId);
    try {
      await deleteDoc(docRef);
      console.log("Curso excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o curso: ", error);
      alert("Ocorreu um erro ao excluir o curso.");
    }
  };

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
            <li 
              key={course.id} 
              onClick={() => onSelectCourse(course.id)}
              className="p-4 bg-gray-700 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-600 transition-colors duration-200"
            >
              <div>
                <span className="text-lg font-semibold text-blue-400">
                  {course.name}
                </span>
                <p className="text-sm text-gray-300">Prioridade: {course.priority}</p>
              </div>
              
              {/* 3. Adicionamos o botão de Excluir */}
              <button
                onClick={(e) => handleDelete(e, course.id)}
                className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 z-10"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList;