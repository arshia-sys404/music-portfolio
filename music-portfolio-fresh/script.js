// PERFECT WORKING Supabase + Matrix Rain
console.log('Fresh portfolio loaded!');

const SUPABASE_URL = 'https://wwxuxustpscbdkecscxm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eHV4dXN0cHNjYmRrZWNzY3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTYwMDcsImV4cCI6MjA4OTY5MjAwN30.LEdbI23GXwEqGAn_HjH51RUxgx14pJArRmEQjXQOnjE';

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initSmoothScroll();
  initForm();
});

function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01アイウエオカキクケコ';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0ff';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      else 
        drops[i]++;
    }
  }
  
  setInterval(draw, 35);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });
}

function initForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');
  
  if (!form || typeof supabase === 'undefined') {
    status.textContent = '⚠️ Supabase not loaded - check keys';
    return;
  }
  
  const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    status.textContent = 'Sending...';
    const btn = form.querySelector('button');
    btn.disabled = true;
    
    try {
      const { error } = await client
        .from('contacts')
        .insert(data);
      
      if (error) throw error;
      
      status.textContent = '✅ Message saved to database!';
      status.style.color = '#0f0';
      form.reset();
    } catch (error) {
      status.textContent = `❌ ${error.message}`;
      status.style.color = '#f00';
      console.error(error);
    } finally {
      btn.disabled = false;
    }
  });
  
  console.log('✅ Everything ready!');
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('matrix-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
