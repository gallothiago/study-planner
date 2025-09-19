import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// A lista agora recebe a função `onSelectCourse`
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
            // Adicionamos um onClick no <li> para chamar a função de navegação
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList;