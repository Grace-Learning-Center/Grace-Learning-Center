
export default function Hero({ title, subtitle, cta, image }) {
  return (
    <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
      <div>
        <h2 className="text-4xl font-extrabold leading-tight" style={{color:'#5b3a2a'}}>{title}</h2>
        <p className="mt-4 text-lg text-gray-700">{subtitle}</p>
        <div className="mt-6 flex gap-3">
          <a href="#admissions" className="inline-block px-5 py-3 rounded-lg hero-cta">{cta}</a>
          <a href="#about" className="inline-block px-5 py-3 rounded-lg border">Learn more</a>
        </div>
      </div>
      <div className="card overflow-hidden">
        <img src={image || '/images/blossom-hero.jpg'} alt="blossoming tree from a book" className="w-full h-64 object-cover"/>
      </div>
    </section>
  )
}
