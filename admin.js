
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [items, setItems] = useState({})
  const [message, setMessage] = useState('')

  useEffect(()=>{
    supabase.auth.getSession().then(r=>setSession(r.data.session))
    const sub = supabase.auth.onAuthStateChange((_ev,s)=>setSession(s))
    return ()=> sub.subscription.unsubscribe()
  },[])

  async function signIn(){ 
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Signed in')
  }
  async function signOut(){ await supabase.auth.signOut(); setSession(null) }

  async function loadAll(){
    const { data, error } = await supabase.from('site_content').select('*')
    if (error) setMessage(error.message)
    else {
      const obj={}; data.forEach(d=> obj[d.section]=d)
      setItems(obj)
      setMessage('Loaded')
    }
  }

  async function upsert(section, payload){
    const body = { section, ...payload }
    const { error } = await supabase.from('site_content').upsert(body).select()
    if (error) setMessage('Save failed: '+error.message)
    else { setMessage('Saved'); loadAll() }
  }

  return (
    <div className="min-h-screen p-8">
      {!session ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Admin login</h2>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded mb-2" />
          <div className="flex gap-2">
            <button onClick={signIn} className="px-3 py-2 bg-indigo-600 text-white rounded">Sign in</button>
            <button onClick={()=>supabase.auth.signUp({ email, password })} className="px-3 py-2 border rounded">Create account</button>
          </div>
          <div className="mt-4 text-sm text-red-600">{message}</div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Site editor</h2>
            <div>
              <button onClick={signOut} className="px-3 py-2 border rounded">Sign out</button>
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            <button onClick={loadAll} className="px-3 py-2 border rounded">Load content</button>
            <button onClick={async ()=>{ // create defaults
              const defaults = [
                { section:'home', title:'Grace Learning Center', content:'Joyful learning beyond the classroom', image_url:'' },
                { section:'programs', title:'Programs', content: JSON.stringify([{title:'Early years',desc:'Play-based'}]) },
                { section:'about', title:'About us', content:'Grace Learning Center is a caring, creative environment.' },
                { section:'admissions', title:'Admissions', content: JSON.stringify(['Complete application','Submit documents','Orientation']) },
                { section:'contact', title:'Contact', content:'123 Learning Lane, Your City' },
                { section:'phone', title:'Phone', content:'+234 800 000 0000' },
                { section:'email', title:'Email', content:'info@gracelearning.center' }
              ]
              for(const d of defaults) await supabase.from('site_content').upsert(d)
              setMessage('Defaults created'); loadAll()
            }} className="px-3 py-2 border rounded">Create defaults</button>
          </div>

          {Object.keys(items).length ? (
            <div>
              {['home','programs','about','admissions','contact','phone','email'].map(k => (
                <div key={k} className="mt-4 p-3 border rounded">
                  <h4 className="font-semibold">{k}</h4>
                  <label className="block mt-2">Title</label>
                  <input value={items[k]?.title||''} onChange={e=> setItems({...items, [k]:{...items[k], title:e.target.value}})} className="w-full p-2 border rounded" />
                  <label className="block mt-2">Content</label>
                  <textarea value={items[k]?.content||''} onChange={e=> setItems({...items, [k]:{...items[k], content:e.target.value}})} rows={4} className="w-full p-2 border rounded" />
                  <label className="block mt-2">Image URL</label>
                  <input value={items[k]?.image_url||''} onChange={e=> setItems({...items, [k]:{...items[k], image_url:e.target.value}})} className="w-full p-2 border rounded" />
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=> upsert(k, items[k])} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="text-sm text-gray-600">No content loaded.</div>}

          <div className="mt-4 text-sm text-green-700">{message}</div>
        </div>
      )}
    </div>
  )
}
