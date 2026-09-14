import { NextResponse } from 'next/server';
import { contentDefaults } from '@/lib/admin-content';
import { mergeSiteContent } from '@/lib/site-content';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json(contentDefaults);
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.from('site_content').select('key, value');

  if (error) {
    console.error('Failed to load site content', error);
    return NextResponse.json(contentDefaults);
  }

  return NextResponse.json(mergeSiteContent(data));
}
