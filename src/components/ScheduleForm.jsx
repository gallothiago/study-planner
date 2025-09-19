import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ScheduleForm({ courseId }) {
  const [day, setDay] = useState('segunda');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      alert('Por favor, preencha os horários de início e fim.');
      return;
    }

    try {
      // Criamos uma referência para a subcoleção 'schedule' dentro do curso específico
      const scheduleCollection = collection(db, 'courses', courseId, 'schedule');
      
      await addDoc(scheduleCollection, {
        day: day,
        startTime: startTime,
        endTime: endTime,
        createdAt: serverTimestamp(),
      });

      // Limpa o formulário
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error("Erro ao agendar horário: ", error);
      alert("Ocorreu um erro ao agendar o horário.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Agendar Horário de Estudo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="day" className="block text-sm font-medium text-gray-300">Dia da Semana</label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md"
          >
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
            <option value="sabado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
        </div>
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
      <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Adicionar Horário
      </button>
    </form>
  );
}

export default ScheduleForm;