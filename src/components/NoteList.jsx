import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';

function NoteList({ courseId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Criamos uma referência para a subcoleção 'notes' dentro do curso
    const notesCollection = collection(db, 'courses', courseId, 'notes');
    // Ordenamos as anotações da mais recente para a mais antiga
    const q = query(notesCollection, orderBy('createdAt', 'desc'));

    // O onSnapshot ouve as alterações em tempo real
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
  
  // Usamos `toLocaleDateString` para formatar a data de forma legível
  const formatDate = (timestamp) => {
    if (!timestamp) return 'A carregar data...';
    return timestamp.toDate().toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <p className="text-gray-400">A carregar anotações...</p>;
  }

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Minhas Anotações</h3>
      {notes.length === 0 ? (
        <p className="text-gray-400">Nenhuma anotação adicionada para este curso.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map(note => (
            <li key={note.id} className="p-4 bg-gray-700 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-indigo-400">{note.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Adicionada em: {formatDate(note.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
              {/* Usamos `whitespace-pre-wrap` para respeitar as quebras de linha e espaços do utilizador */}
              <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;