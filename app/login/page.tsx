'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  async function sendMagicLink(e: React.FormEvent){
    e.preventDefault();
    setSending(true); setErr(null); setMsg(null);
    try{
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/` }
      });
      if(error) throw error;
      setMsg('Check your email for a sign-in link.');
    }catch(e:any){ setErr(e.message ?? 'Failed to send link'); }
    finally{ setSending(false); }
  }

  async function signInWithGoogle(){
    setErr(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    });
    if(error) setErr(error.message);
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={sendMagicLink} className="space-y-3 card p-4">
        <label className="block text-sm">
          Email
          <input type="email" className="mt-1 w-full border rounded-md px-3 py-2"
                 value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required />
        </label>
        <button type="submit" disabled={sending}
          className="px-3 py-2 rounded-md bg-primary-500 text-white disabled:opacity-60">
          {sending ? 'Sending…' : 'Send magic link'}
        </button>
      </form>

      <div className="my-6 text-center text-sm text-slate-500">or</div>

      <button onClick={signInWithGoogle}
        className="w-full px-3 py-2 rounded-md border hover:bg-slate-50">Continue with Google</button>

      {msg && <p className="mt-4 text-green-700">{msg}</p>}
      {err && <p className="mt-4 text-red-600">{err}</p>}
    </div>
  );
}
