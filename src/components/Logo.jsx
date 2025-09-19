// O nosso novo componente de Logo.
// É um SVG com o ícone "SP" e o texto "Study Planner" ao lado.
// Usamos classes do Tailwind para estilizar o texto.
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#111827"/>
        <path d="M32 30C32 25.5817 35.5817 22 40 22H52C59.732 22 66 28.268 66 36V40C66 47.732 59.732 54 52 54H40C35.5817 54 32 50.4183 32 46V30Z" stroke="#4f46e5" strokeWidth="6"/>
        <path d="M50 54V78L66 78" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-2xl font-bold text-white tracking-wider">
        Study Planner
      </span>
    </div>
  );
}

export default Logo;