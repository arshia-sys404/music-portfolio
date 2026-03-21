# 🎵 Arshia Libu - Music Portfolio

[![GitHub Pages](https://github.com/arshia-sys404/music-portfolio/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/arshia-sys404/music-portfolio/actions/workflows/pages/pages-build-deployment)

Live Demo: **https://arshia-sys404.github.io/music-portfolio**

## ✨ Features
- **Neon Design**: Purple/black gradient with **white neon glowing sections**
- **4 Sections**: Home, Education, Skills, Contact
- **Supabase Backend**: Contact form saves to database
- **Interactive JS**: Smooth scroll, hover effects, popup modals, scroll animations
- **Fully Responsive**: Mobile + desktop
- **GitHub Pages**: Auto-deployed

## 🛠️ Supabase Setup
**Project**: `https://llocnfzgmqogfmrqobod.supabase.co`

### 1. Create Contacts Table
```sql
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. RLS Policy (Anon Inserts)
**Dashboard → contacts → RLS → New Policy**
```
Name: Allow public insert
Target Roles: anon
Operation: INSERT
USING: true
WITH CHECK: true
```

**OR Quick Test:**
```sql
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

## 🚀 Test Flow
```
1. Open index.html (Live Server / GitHub Pages)
2. Fill contact form → Send
3. Neon popup: "✅ Thanks [Name]! Message saved"
4. Supabase → Table Editor → contacts → New row!
5. F12 Console → All logs
```

## 🎨 Design
- **Background**: Purple-black gradient
- **Sections**: Neon white outlines + beaming glow
- **Text**: Gradient white-cyan with pulse animation
- **Interactive**: Hover transforms, scroll fade-in

## 📱 Responsive Breakpoints
- Desktop: Full grid layouts
- Mobile: Stacked + optimized spacing

## 🔧 Development
```bash
# Live Server (VS Code)
Ctrl+Shift+P → "Live Server: Open with Live Server"

# Deploy
git add .
git commit -m "Update portfolio"
git push origin main
```

## 📂 File Structure
```
├── index.html     # Structure + sections
├── style.css      # Neon purple theme
├── script.js      # Supabase + interactivity
└── README.md      # This file
```

## 🎯 GitHub Pages
1. **Settings → Pages**
2. **Source**: Deploy from branch `main` → `/ (root)`
3. **Live in ~2 min**: `https://arshia-sys404.github.io/music-portfolio`

Built with ❤️ for BCA Cybersecurity showcase!
