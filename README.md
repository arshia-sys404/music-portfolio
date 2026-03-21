# Arshia Portfolio - Supabase Contact Form\n\n## 🎯 **Contact Form Works** (after RLS fix)\n\nRepo: https://github.com/arshia-sys444/music-portfolio\n\n## **FIX RLS ERROR** (your exact error)\n\n**Supabase Dashboard → contacts table → RLS tab**:\n\n### Option 1 (EASIEST - Test)\n```sql
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```\n\n### Option 2 (Production)\n```sql
-- Enable RLS + policy for anon
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS \"Allow public insert\" ON contacts;
CREATE POLICY \"Allow public insert\" ON contacts 
FOR INSERT TO anon 
WITH CHECK (true);
```\n\nRun in **SQL Editor** → Refresh table.\n\n## Test Flow\n1. Reload index.html\n2. Fill form → Send\n3. Green \"✅ Message sent\"\n4. **Table Editor > contacts** → see data!\n\n## Console Debug\nF12 → Console shows all (Supabase response/errors).\n\n**Table first** (if missing):\n```sql
create table contacts (
  id uuid default uuid_generate_v4() primary key,
  name text, email text, message text, 
  created_at timestamptz default now()
);
```\n\nDeploy: GitHub Pages > main branch.
