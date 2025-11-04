
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  const [site, setSite] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    async function load(){
      const { data, error } = await supabase.from('site_content').select('*')
      if (error) console.error('supabase load', error)
      else if (mounted) {
        const obj = {}; data.forEach(d=> obj[d.section]=d)
        setSite(obj)
      }
      setLoading(false)
    }
    load()
    return ()=> mounted=false
  },[])

  if (loading) return <div className="p-8">Loading...</div>
  if (!site.home) return <div className="p-8">No content yet. Visit /admin to create content.</div>

  const home = site.home
  const programs = site.programs ? JSON.parse(site.programs.content) : []

  return (
    <div className="min-h-screen font-serif text-gray-900">
      <Header title={home.title} subtitle={home.content} />
      <main>
        <Hero title={home.title} subtitle={home.content} cta={home.cta || 'Enroll now'} image={home.image_url} />
        <section id="programs" className="max-w-6xl mx-auto px-6 py-10">
          <h3 className="text-2xl font-bold">Our programs</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.length ? programs.map((p,i)=>(
              <article key={i} className="p-6 bg-white card">
                <h4 className="font-semibold text-lg" style={{color:'#6b8e23'}}>{p.title}</h4>
                <p className="mt-2 text-gray-600">{p.desc}</p>
              </article>
            )) : <p className="text-gray-600">No programs defined yet.</p>}
          </div>
        </section>

        <section id="about" className="bg-white py-10">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold">About us</h3>
            <p className="mt-4 text-gray-700">{site.about ? site.about.content : '...'}</p>
          </div>
        </section>

        <section id="admissions" className="max-w-6xl mx-auto px-6 py-10">
          <h3 className="text-2xl font-bold">Admissions</h3>
          <ol className="mt-4 list-decimal ml-6 text-gray-700">
            {site.admissions ? JSON.parse(site.admissions.content).map((s,i)=>(<li key={i} className="mt-2">{s}</li>)) : <li>Set up admissions in admin.</li>}
          </ol>
        </section>

        <section id="contact" className="bg-gray-100 py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold">Contact us</h3>
              <p className="mt-4">Address: {site.contact ? site.contact.content : ''}</p>
              <p>Phone: {site.phone ? site.phone.content : ''}</p>
              <p>Email: <a href={`mailto:${site.email ? site.email.content : ''}`} className="underline">{site.email ? site.email.content : ''}</a></p>
            </div>
            <div>
              <form onSubmit={(e)=>{e.preventDefault(); alert('Demo contact form — connect to email or backend')}} className="bg-white p-6 rounded-xl card">
                <label className="block">
                  <span className="text-sm font-medium">Name</span>
                  <input required className="mt-1 block w-full rounded-md border px-3 py-2"/>
                </label>
                <label className="block mt-3">
                  <span className="text-sm font-medium">Email</span>
                  <input type="email" required className="mt-1 block w-full rounded-md border px-3 py-2"/>
                </label>
                <label className="block mt-3">
                  <span className="text-sm font-medium">Message</span>
                  <textarea required className="mt-1 block w-full rounded-md border px-3 py-2" rows={4}></textarea>
                </label>
                <button type="submit" className="mt-4 px-4 py-2 rounded-md text-white" style={{backgroundColor:'var(--leaf)'}}>Send message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
