
import '../styles/globals.css'
import { supabase } from '../lib/supabaseClient'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
