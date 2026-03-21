// Portfolio Interactivity + Supabase Contact Form - ULTIMATE FIX
console.log('Portfolio JS v3 - FIXED');

// Supabase config
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';

let supabase;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  
  // Wait for Supabase global from CDN
  const supabaseCheck = setInterval(() => {
    if (typeof window.supabase !== 'undefined') {
      clearInterval(supabaseCheck);
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase client ready!');
      initApp();
    }
  }, 100);
  
  setTimeout(() => {
    clearInterval(supabaseCheck);
    console.error('❌ Supabase CDN timeout');
  }, 5000);
});

function initApp() {
  // Smooth scroll
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact form - SIMPLIFIED
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Form submit triggered');
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
      }
      
      const btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      
      try {
        console.log('Attempting insert:', {name, email});
        const { data, error } = await supabase
          .from('contacts')
          .insert([{
            name: name,
            email: email,
            message: message
          }]);
          
        if (error) throw error;
        
        console.log('SUCCESS DATA:', data);
        form.reset();
        alert(`✅ Success! "${name}" message saved to Supabase. Check Table Editor.`);
      } catch (error) {
        console.error('INSERT ERROR:', error);
        alert(`❌ Error: ${error.message}`);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }
    });
    console.log('Form ready');
  }

  // Skills hover
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => item.style.transform = 'scale(1.05)');
    item.addEventListener('mouseleave', () => item.style.transform = 'scale(1)');
  });

  console.log('🎉 App initialized!');
}

// Polyfill for older browsers
if (!window.supabase) {
  console.warn('Supabase CDN not loaded - check index.html script tag');
}
