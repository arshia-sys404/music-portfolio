# Fresh Music Portfolio - 100% Working

## 🚀 Quick Start

1. **Supabase Setup** (2min):
```
New Project → Settings → API → Copy URL + anon key
Replace script.js: SUPABASE_URL, SUPABASE_ANON_KEY
Dashboard → SQL Editor:
```
```sql
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT, email TEXT, message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY; -- Test mode
```

2. **Local Test**: `Live Server → index.html`
3. **Deploy**: GitHub Pages

## 🎯 Features
- Matrix rain background
- Smooth scroll nav
- **Working contact form** → Supabase database
- Neon cyan theme
- Responsive design

## Console Debug
```
Fresh portfolio loaded!
✅ Everything ready!
Sending... → ✅ Message saved!
```

Perfect - copy to new GitHub repo! 🚀
