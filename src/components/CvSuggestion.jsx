import { useState } from 'react';

// Apanhamos a chave de API das nossas variáveis de ambiente.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function CvSuggestion({ courseName }) {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSuggestion = async () => {
    setIsLoading(true);
    setError('');
    setSuggestion('');

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    
    // Este é o "prompt", a instrução que damos à IA.
    const prompt = `Aja como um especialista em recrutamento. Crie uma sugestão curta e impactante (1-2 frases) de como descrever a conclusão do seguinte curso em um currículo, destacando as competências adquiridas. Curso: "${courseName}"`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi "ok"');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setSuggestion(generatedText.trim());

    } catch (err) {
      console.error("Erro ao gerar sugestão:", err);
      setError('Não foi possível gerar a sugestão. Verifique a sua chave de API e a ligação à internet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-white">Sugestão para o Currículo</h3>
      <p className="text-sm text-gray-400">
        Clique no botão para gerar uma sugestão de como adicionar este curso ao seu CV, com a ajuda de IA.
      </p>
      <button
        onClick={handleGenerateSuggestion}
        disabled={isLoading}
        className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-500"
      >
        {isLoading ? 'A gerar...' : 'Gerar Sugestão'}
      </button>

      {suggestion && (
        <div className="p-4 mt-4 bg-gray-700 border-l-4 border-purple-400 rounded-r-lg">
          <p className="text-gray-200">{suggestion}</p>
        </div>
      )}
      {error && (
        <div className="p-4 mt-4 bg-red-900 border-l-4 border-red-500 rounded-r-lg">
          <p className="text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
}

export default CvSuggestion;
