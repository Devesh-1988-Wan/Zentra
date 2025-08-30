import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const dir = process.argv[2] ?? 'assets/icons';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

async function main(){
  const files = readdirSync(dir).filter(f=>f.endsWith('.svg'));
  for(const f of files){
    const name = path.basename(f, '.svg');
    const svg = readFileSync(path.join(dir, f));
    const storagePath = `${name}.svg`;
    const up = await supabase.storage.from('icons').upload(storagePath, svg, { upsert: true, contentType: 'image/svg+xml' });
    if(up.error) throw up.error;
    const upsert = await supabase.from('icons').upsert({ name, file_path: storagePath }, { onConflict: 'name' });
    if(upsert.error) throw upsert.error;
    console.log('Imported', name);
  }
}
main().catch(e=>{ console.error(e); process.exit(1); });
