import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore';

// Array para ajudar a renderizar os dias da semana
const weekDays = [
  { id: 'segunda', label: 'Seg' },
  { id: 'terca', label: 'Ter' },
  { id: 'quarta', label: 'Qua' },
  { id: 'quinta', label: 'Qui' },
  { id: 'sexta', label: 'Sex' },
  { id: 'sabado', label: 'Sáb' },
  { id: 'domingo', label: 'Dom' },
];

function ScheduleForm({ courseId }) {
  // 1. O estado dos dias agora é um objeto para controlar cada checkbox individualmente
  const [days, setDays] = useState({
    segunda: false, terca: false, quarta: false, quinta: false, sexta: false, sabado: false, domingo: false
  });
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Função para atualizar o estado dos dias quando uma checkbox é clicada
  const handleDayChange = (dayId) => {
    setDays(prevDays => ({
      ...prevDays,
      [dayId]: !prevDays[dayId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDays = Object.keys(days).filter(day => days[day]);

    if (!startTime || !endTime || selectedDays.length === 0) {
      alert('Por favor, preencha os horários e selecione pelo menos um dia.');
      return;
    }

    try {
      // 2. Usamos um "batch write" do Firestore para criar todos os documentos de uma só vez.
      // Isto é mais eficiente e garante que ou todos são criados, ou nenhum é.
      const batch = writeBatch(db);
      const scheduleCollection = collection(db, 'courses', courseId, 'schedule');

      selectedDays.forEach(day => {
        const newDocRef = doc(scheduleCollection); // Criamos uma referência para um novo documento
        batch.set(newDocRef, {
          day: day,
          startTime: startTime,
          endTime: endTime,
          createdAt: serverTimestamp(),
        });
      });

      await batch.commit(); // Enviamos o lote para o Firestore

      // Limpa o formulário
      setStartTime('');
      setEndTime('');
      setDays({ segunda: false, terca: false, quarta: false, quinta: false, sexta: false, sabado: false, domingo: false });

    } catch (error) {
      console.error("Erro ao agendar horários: ", error);
      alert("Ocorreu um erro ao agendar os horários.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Adicionar Horário de Estudo</h3>
      
      {/* 3. Secção de seleção de dias com checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Dias da Semana</label>
        <div className="grid grid-cols-4 gap-2">
          {weekDays.map(day => (
            <div key={day.id}>
              <input
                type="checkbox"
                id={day.id}
                checked={days[day.id]}
                onChange={() => handleDayChange(day.id)}
                className="hidden peer"
              />
              <label
                htmlFor={day.id}
                className="block w-full text-center py-2 px-1 text-sm rounded-md cursor-pointer bg-gray-700 peer-checked:bg-indigo-600 peer-checked:font-bold"
              >
                {day.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Início</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-300">Fim</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Adicionar Horário(s)
      </button>
    </form>
  );
}

export default ScheduleForm;