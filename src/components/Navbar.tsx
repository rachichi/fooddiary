export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-warm-black/20 text-xs tracking-widest font-bold uppercase shrink-0">
      <span>RACHEL 静如 LIU</span>
      <span>&lt; FOOD DIARY &gt;</span>
      <span className="flex gap-6">
        <a href="https://rachichi.github.io/rachelliu-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">PROJECTS</a>
        <a href="https://rachichi.github.io/rachelliu-portfolio/#/resume" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">RESUMÉ</a>
      </span>
    </nav>
  );
}
