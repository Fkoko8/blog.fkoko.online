'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Check, ChevronDown, Loader2, LogIn, LogOut, Save, ShieldAlert } from 'lucide-react';
import { contentDefaults, contentGroups } from '@/lib/admin-content';
import { isSupabaseConfigured, supabase } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type SessionUser = { id: string; email?: string } | null;

type ContentMap = Record<string, string>;

export default function AdminPanel() {
  const [user, setUser] = useState<SessionUser>(null);
  const [content, setContent] = useState<ContentMap>(contentDefaults);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState('brand');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !supabase) return;

    supabase
      .from('site_content')
      .select('key, value')
      .then(({ data, error }) => {
        if (error) {
          setStatus(error.message);
          return;
        }
        if (data) {
          setContent((current) => ({
            ...current,
            ...Object.fromEntries(data.map((item) => [item.key, item.value])),
          }));
        }
      });
  }, [user]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setStatus('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    setStatus(error ? error.message : 'Signed in.');
  }

  async function handleSave() {
    if (!supabase || !user) return;
    setBusy(true);
    setStatus('');
    const rows = Object.entries(content).map(([key, value]) => ({
      key,
      value,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('site_content').upsert(rows);
    setBusy(false);
    setStatus(error ? error.message : 'All changes saved.');
  }

  if (!isSupabaseConfigured) {
    return <SetupNotice />;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-md">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">FKOKO / Admin</p>
              <h1 className="font-heading text-3xl font-bold uppercase">Control room</h1>
            </div>
          </div>
          <form onSubmit={handleLogin} className="card-editorial grain space-y-5 p-6 sm:p-8">
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase">Sign in</h2>
              <p className="mt-2 text-sm text-muted-foreground">Manage the words that shape the site.</p>
            </div>
            <label className="block space-y-2 text-sm font-medium">
              Email
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              Password
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
            </label>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Enter admin
            </Button>
            {status && <p className="text-sm text-destructive">{status}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">FKOKO / Admin</p>
            <h1 className="mt-2 font-heading text-4xl font-bold uppercase sm:text-5xl">Site content</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">Edit the visible language of the site from one place. Changes are stored in Supabase.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={busy}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save changes
            </Button>
            <Button variant="outline" onClick={() => supabase?.auth.signOut()} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {status && (
          <div className="mb-6 flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
            <Check className="h-4 w-4" />
            {status}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[240px_1fr] lg:gap-8">
          <aside className="h-fit lg:sticky lg:top-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Content map</p>
            <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
              {contentGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setExpanded(group.id)}
                  className={`whitespace-nowrap px-3 py-2 text-left text-sm transition-colors lg:block lg:w-full ${expanded === group.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                >
                  {group.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="space-y-4">
            {contentGroups.map((group) => (
              <div key={group.id} className={`${expanded === group.id ? 'block' : 'hidden'} card-editorial overflow-hidden`}>
                <button onClick={() => setExpanded(expanded === group.id ? '' : group.id)} className="flex w-full items-center justify-between border-b border-border p-5 text-left sm:p-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold uppercase">{group.label}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  {group.fields.map((field) => (
                    <label key={field.key} className={`block space-y-2 text-sm font-medium ${field.multiline ? 'sm:col-span-2' : ''}`}>
                      <span>{field.label}</span>
                      {field.multiline ? (
                        <Textarea value={content[field.key] ?? ''} onChange={(event) => setContent({ ...content, [field.key]: event.target.value })} rows={5} />
                      ) : (
                        <Input type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'} value={content[field.key] ?? ''} onChange={(event) => setContent({ ...content, [field.key]: event.target.value })} />
                      )}
                      <span className="block font-mono text-[10px] font-normal text-muted-foreground">{field.key}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}

function SetupNotice() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="card-editorial grain p-6 sm:p-10">
          <ShieldAlert className="h-8 w-8 text-accent" />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">Admin setup required</p>
          <h1 className="mt-2 font-heading text-4xl font-bold uppercase">Connect Supabase</h1>
          <p className="mt-4 text-muted-foreground">Add the public Supabase URL and anonymous key to the deployment environment, then run the SQL in <code className="text-foreground">supabase/admin-content.sql</code>.</p>
          <pre className="mt-6 overflow-x-auto bg-secondary p-4 font-mono text-xs text-muted-foreground">NEXT_PUBLIC_SUPABASE_URL=...{`\n`}NEXT_PUBLIC_SUPABASE_ANON_KEY=...</pre>
        </div>
      </div>
    </main>
  );
}
