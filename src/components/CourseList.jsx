import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
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
      <h3 className="text-xl font-bold text-white mb-4">Meus Cursos</h3>
      {courses.length === 0 ? (
        <p className="text-gray-400">Você ainda não adicionou nenhum curso.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li 
              key={course.id} 
              onClick={() => onSelectCourse(course.id)}
              className={`p-4 bg-gray-700 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-600 transition-all duration-200 ${course.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-4">
                {course.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
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