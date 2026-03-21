// Portfolio Interactivity + Supabase Contact Form
console.log('Portfolio JS loaded...');

// Supabase config
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready - initializing...');
  
  // Supabase client
  const { createClient } = supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase ready');
  
  // Smooth scrolling
  document.querySelectorAll('a[href^=\"#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showModal('error', 'Please fill all fields!');
        return;
      }
      
      // Show sending state
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      
      try {
        const { data, error } = await supabase
          .from('contacts')
          .insert([{ name, email, message }]);
          
        if (error) throw error;
        
        form.reset();
        showModal('success', `✅ Thanks ${name}! Your message has been saved to database.`);
        console.log('Contact saved:', data);
      } catch (error) {
        showModal('error', `Error: ${error.message}`);
        console.error('Supabase error:', error);
      } finally {
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }

  // Modal functions
  function showModal(type, message) {
    const modal = document.getElementById('feedback-modal');
    const icon = document.getElementById('modal-icon');
    const text = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');
    
    icon.textContent = type === 'success' ? '✅' : '❌';
    text.textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('show', type);
    
    // Auto close
    setTimeout(() => hideModal(modal), 5000);
    
    closeBtn.onclick = () => hideModal(modal);
    modal.onclick = (e) => {
      if (e.target === modal) hideModal(modal);
    };
  }
  
  function hideModal(modal) {
    modal.classList.remove('show', 'success', 'error');
    modal.classList.add('hidden');
  }

  // Skill hover animations
  document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
      skill.style.transform = 'scale(1.1) rotate(5deg)';
    });
    skill.addEventListener('mouseleave', () => {
      skill.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Intersection Observer for section animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.neon-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
  
  console.log('Portfolio fully interactive');
});
