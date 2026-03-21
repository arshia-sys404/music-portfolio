// Portfolio Interactivity + Supabase Contact Form - SAFE v6 (FINAL)
console.log('🎵 Arshia Portfolio JS v6 - Supabase SAFE');

// Use user's working keys
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';

// Local client (no global conflict)
let supabaseClient;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded - waiting Supabase CDN (safe v6)...');

  // Poll for Supabase CDN without redeclaration
  const supabaseCheck = setInterval(() => {
    if (window.supabase) {
      clearInterval(supabaseCheck);
      
      // Safe client creation
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase client ready v6!');
      
      // Initialize app
      initApp(supabaseClient);
    }
  }, 50);

  // CDN timeout
  setTimeout(() => {
    clearInterval(supabaseCheck);
    console.error('❌ Supabase CDN timeout - check index.html');
  }, 5000);
});

function initApp(supabaseClient) {
  // Smooth scroll
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form (matches HTML IDs)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');
  
  if (form && supabaseClient) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        if (status) {
          status.textContent = 'Please fill all fields!';
          status.style.color = '#ff4444';
        }
        return;
      }

      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending... ⏳';

      if (status) {
        status.textContent = 'Sending to Supabase...';
        status.style.color = '#ffaa00';
      }

      try {
        console.log('📤 Inserting:', { name, email });
        const { data, error } = await supabaseClient
          .from('contacts')
          .insert([{ name, email, message }]);

        if (error) throw error;

        console.log('✅ SUCCESS:', data);
        if (status) {
          status.innerHTML = '✅ <strong>Message saved to database!</strong>';
          status.style.color = '#00ff88';
        }
        form.reset();
      } catch (error) {
        console.error('❌ ERROR:', error);
        if (status) {
          status.textContent = `Error: ${error.message}`;
          status.style.color = '#ff4444';
        }
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
    console.log('✅ Contact form ready');
  } else {
    console.error('Form or client missing');
  }

  // Skills hover (if .skill exists)
  document.querySelectorAll('.skill').forEach(skill => {
    skill.style.transition = 'transform 0.3s';
    skill.addEventListener('mouseenter', () => skill.style.transform = 'scale(1.05)');
    skill.addEventListener('mouseleave', () => skill.style.transform = 'scale(1)');
  });

  console.log('🎉 Portfolio fully initialized!');
}

// Matrix rain background
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';

  const chars = '01アイウエオカキクケコ';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ffff60';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }
  }
  
  setInterval(draw, 35);
}

initMatrixRain(); // Run immediately

// Resize handler
window.addEventListener('resize', () => {
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
