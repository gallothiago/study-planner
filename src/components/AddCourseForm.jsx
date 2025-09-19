import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function AddCourseForm({ user }) {
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
      setCourseName('');
      setCourseLink('');
      setCoursePriority('baixa');
    } catch (error) {
      console.error("Erro ao adicionar curso: ", error);
      alert("Ocorreu um erro ao adicionar o curso.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Adicionar Novo Curso</h3>
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
      <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Adicionar Curso
      </button>
    </form>
  );
}

export default AddCourseForm;