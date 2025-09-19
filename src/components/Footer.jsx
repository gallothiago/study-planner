function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center p-4 mt-auto">
      <p className="text-sm text-gray-500">
        &copy; {currentYear} Study Planner | Criado por Thiago Medeiros Gallo
      </p>
    </footer>
  );
}

export default Footer;