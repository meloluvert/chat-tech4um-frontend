export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-[#1772B2]">tech4um</h1>
        <span className="hidden md:block text-sm text-gray-600">
          Seu fórum sobre tecnologia!
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-semibold">Fazer Login</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
}
