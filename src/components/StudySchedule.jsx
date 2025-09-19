import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Ordem dos dias para a visualização
const dayOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
const dayLabels = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

function StudySchedule({ user, onSelectCourse }) {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      
      // 1. Primeiro, buscamos todos os cursos que estão em progresso
      const coursesQuery = query(
        collection(db, 'courses'),
        where("userId", "==", user.uid),
        where("completed", "==", false)
      );
      const coursesSnapshot = await getDocs(coursesQuery);
      
      const allSchedules = [];

      // 2. Para cada curso encontrado, buscamos a sua subcoleção de horários
      for (const courseDoc of coursesSnapshot.docs) {
        const courseData = courseDoc.data();
        const scheduleQuery = query(collection(db, 'courses', courseDoc.id, 'schedule'));
        const scheduleSnapshot = await getDocs(scheduleQuery);

        scheduleSnapshot.forEach(scheduleDoc => {
          // 3. Juntamos os dados, adicionando o nome e o ID do curso a cada horário
          allSchedules.push({
            ...scheduleDoc.data(),
            courseName: courseData.name,
            courseId: courseDoc.id
          });
        });
      }
      
      // 4. Agrupamos todos os horários por dia da semana
      const groupedSchedule = allSchedules.reduce((acc, item) => {
        (acc[item.day] = acc[item.day] || []).push(item);
        return acc;
      }, {});

      setSchedule(groupedSchedule);
      setLoading(false);
    };

    fetchSchedule();
  }, [user.uid]);

  if (loading) {
    return <p className="text-center text-gray-400 mb-8">A carregar o seu plano de estudos...</p>;
  }

  // Se não houver nenhum horário agendado em nenhum curso, não mostramos nada.
  if (Object.keys(schedule).length === 0) {
    return null;
  }

  return (
    <div className="p-6 mb-8 bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Meu Plano de Estudos Semanal</h3>
      <div className="space-y-4">
        {dayOrder.map(day => (
          schedule[day] && (
            <div key={day}>
              <h4 className="font-bold text-indigo-400">{dayLabels[day]}</h4>
              <ul className="mt-2 space-y-2 pl-4 border-l-2 border-gray-700">
                {schedule[day]
                  .sort((a, b) => a.startTime.localeCompare(b.startTime)) // Ordena por hora
                  .map((item, index) => (
                    <li key={index} className="p-2 bg-gray-700 rounded-md flex justify-between items-center">
                      <span>
                        <span className="font-semibold text-gray-200">{item.startTime} - {item.endTime}</span>
                        <span className="text-gray-400 mx-2">|</span>
                        <button onClick={() => onSelectCourse(item.courseId)} className="text-gray-300 hover:underline">
                          {item.courseName}
                        </button>
                      </span>
                    </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default StudySchedule;