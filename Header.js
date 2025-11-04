
export default function Header({ title, subtitle }) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full header-badge flex items-center justify-center text-white font-bold">GL</div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <nav className="flex gap-3 items-center">
          <a href="#programs" className="text-sm hover:underline">Programs</a>
          <a href="#about" className="text-sm hover:underline">About</a>
          <a href="#admissions" className="text-sm hover:underline">Admissions</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
          <a href="/admin" className="ml-4 px-3 py-1 rounded-md border text-sm">Admin</a>
        </nav>
      </div>
    </header>
  )
}
