import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function AddNoteForm({ courseId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Por favor, preencha o título e o conteúdo da anotação.');
      return;
    }

    try {
      // Criamos uma referência para a subcoleção 'notes' dentro do curso específico
      const notesCollection = collection(db, 'courses', courseId, 'notes');
      
      await addDoc(notesCollection, {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
      });

      // Limpa o formulário após o sucesso
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Erro ao adicionar anotação: ", error);
      alert("Ocorreu um erro ao adicionar a anotação.");
    }
  };

  return (
    <form onSubmit={handleAddNote} className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Adicionar Nova Anotação</h3>
      <div>
        <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-300">Título da Aula/Anotação</label>
        <input
          type="text"
          id="noteTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Aula 5 - React Hooks"
          className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="noteContent" className="block text-sm font-medium text-gray-300">Conteúdo da Anotação</label>
        <textarea
          id="noteContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          placeholder="Digite as suas anotações aqui..."
          className="w-full px-4 py-2 mt-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
        Salvar Anotação
      </button>
    </form>
  );
}

export default AddNoteForm;