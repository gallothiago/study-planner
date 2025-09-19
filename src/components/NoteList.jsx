import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function NoteList({ courseId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Novos estados para controlar qual anotação está a ser editada e o seu conteúdo
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const notesCollection = collection(db, 'courses', courseId, 'notes');
    const q = query(notesCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId]);

  const handleDelete = async (noteId) => {
    const docRef = doc(db, 'courses', courseId, 'notes', noteId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao excluir anotação: ", error);
    }
  };

  // 2. Função para iniciar o modo de edição
  const handleStartEditing = (note) => {
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  // 3. Função para cancelar a edição
  const handleCancelEditing = () => {
    setEditingNoteId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  // 4. Função para salvar a anotação editada
  const handleUpdateNote = async (noteId) => {
    const docRef = doc(db, 'courses', courseId, 'notes', noteId);
    try {
      await updateDoc(docRef, {
        title: editedTitle,
        content: editedContent,
      });
      handleCancelEditing(); // Fecha o formulário de edição após salvar
    } catch (error) {
      console.error("Erro ao atualizar anotação:", error);
      alert("Ocorreu um erro ao salvar a anotação.");
    }
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'A carregar data...';
    return timestamp.toDate().toLocaleDateString('pt-BR');
  };

  if (loading) return <p className="text-gray-400">A carregar anotações...</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Minhas Anotações</h3>
      {notes.length === 0 ? (
        <p className="text-gray-400">Nenhuma anotação adicionada para este curso.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map(note => (
            <li key={note.id} className="p-4 bg-gray-700 rounded-md">
              {/* 5. Lógica de renderização condicional */}
              {editingNoteId === note.id ? (
                // MODO DE EDIÇÃO
                <div className="space-y-2">
                  <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="w-full px-2 py-1 text-gray-100 bg-gray-600 rounded-md"/>
                  <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows="5" className="w-full px-2 py-1 text-gray-100 bg-gray-600 rounded-md"></textarea>
                  <div className="flex gap-2 justify-end">
                    <button onClick={handleCancelEditing} className="px-3 py-1 text-xs font-semibold rounded-md bg-gray-500 hover:bg-gray-400">Cancelar</button>
                    <button onClick={() => handleUpdateNote(note.id)} className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Salvar</button>
                  </div>
                </div>
              ) : (
                // MODO DE VISUALIZAÇÃO
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-indigo-400">{note.title}</h4>
                      <p className="text-xs text-gray-400 mb-2">Adicionada em: {formatDate(note.createdAt)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleStartEditing(note)} className="px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Editar</button>
                      <button onClick={() => handleDelete(note.id)} className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Excluir</button>
                    </div>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap mt-2">{note.content}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;