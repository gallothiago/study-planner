import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';

function CourseList({ user, onSelectCourse }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. A única alteração está aqui: adicionamos a condição `where("completed", "==", false)`
    const q = query(
      collection(db, 'courses'),
      where("userId", "==", user.uid),
      where("completed", "==", false), // Apenas cursos não concluídos
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

  const handleDelete = async (e, courseId) => {
    e.stopPropagation();
    const docRef = doc(db, 'courses', courseId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao excluir o curso: ", error);
    }
  };

  if (loading) return <p className="text-center text-gray-400">Carregando cursos...</p>;
  
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Meus Cursos em Progresso</h3>
      {courses.length === 0 ? (
        <p className="text-gray-400">Você não tem cursos em progresso.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li 
              key={course.id} 
              onClick={() => onSelectCourse(course.id)}
              className="p-4 bg-gray-700 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-600 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-lg font-semibold text-indigo-400">{course.name}</span>
                  <p className="text-sm text-gray-300">Prioridade: {course.priority}</p>
                </div>
              </div>
              <button onClick={(e) => handleDelete(e, course.id)} className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 z-10">
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