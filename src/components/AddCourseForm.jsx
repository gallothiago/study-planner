import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// 1. O componente agora recebe a propriedade `onClose`
function AddCourseForm({ user, onClose }) {
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [coursePriority, setCoursePriority] = useState('baixa');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseLink) {
      alert('Por favor, preencha o nome e o link do curso.');
      return;
    }
    try {
      await addDoc(collection(db, 'courses'), {
        name: courseName,
        link: courseLink,
        priority: coursePriority,
        userId: user.uid,
        createdAt: serverTimestamp(),
        completed: false,
      });
      // 2. Após o sucesso, chamamos a função `onClose` para fechar o formulário
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar curso: ", error);
      alert("Ocorreu um erro ao adicionar o curso.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Adicionar Novo Curso</h3>
      </div>
      <div>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-300">Nome do Curso</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="courseLink" className="block text-sm font-medium text-gray-300">Link do Curso</label>
        <input
          type="url"
          id="courseLink"
          value={courseLink}
          onChange={(e) => setCourseLink(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="coursePriority" className="block text-sm font-medium text-gray-300">Prioridade</label>
        <select
          id="coursePriority"
          value={coursePriority}
          onChange={(e) => setCoursePriority(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      {/* 3. Adicionamos uma secção para os botões de ação */}
      <div className="flex flex-col md:flex-row gap-4 pt-2">
        <button
          type="button" // Importante: type="button" para não submeter o formulário
          onClick={onClose} // O botão de cancelar chama a função `onClose`
          className="w-full px-4 py-2 font-bold text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Adicionar Curso
        </button>
      </div>
    </form>
  );
}

export default AddCourseForm;