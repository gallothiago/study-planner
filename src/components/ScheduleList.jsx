import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy, query, doc, deleteDoc } from 'firebase/firestore';

function ScheduleList({ courseId }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scheduleCollection = collection(db, 'courses', courseId, 'schedule');
    const q = query(scheduleCollection, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scheduleData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedule(scheduleData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId]);

  const handleDelete = async (scheduleId) => {
    const docRef = doc(db, 'courses', courseId, 'schedule', scheduleId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao excluir horário: ", error);
    }
  };

  // Função para capitalizar o dia da semana
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Horários Planeados</h3>
      {loading ? (
        <p className="text-gray-400">A carregar horários...</p>
      ) : schedule.length === 0 ? (
        <p className="text-gray-400">Nenhum horário agendado para este curso.</p>
      ) : (
        <ul className="space-y-3">
          {schedule.map(item => (
            <li key={item.id} className="p-3 bg-gray-700 rounded-md flex justify-between items-center">
              <div>
                <span className="font-semibold">{capitalize(item.day)}</span>
                <span className="text-gray-300 ml-4">{item.startTime} - {item.endTime}</span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
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

export default ScheduleList;