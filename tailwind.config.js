/** @type {import('tailwindcss').Config} */
export default {
  // Explicação: A propriedade 'content' é a mais importante aqui.
  // Ela informa ao Tailwind quais arquivos devem ser analisados em busca de classes.
  // Sem isso, o Tailwind não saberia quais estilos gerar, e o CSS final ficaria vazio.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
