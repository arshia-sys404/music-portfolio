// ORIGINAL Supabase code - Working contact form (before design changes)
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';

// Global supabase from CDN
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase ready:', supabase);

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^=\"#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('contact-name') || document.getElementById('contact-name').value.trim();
    const email = formData.get('contact-email') || document.getElementById('contact-email').value.trim();
    const message = formData.get('contact-message') || document.getElementById('contact-message').value.trim();
    
    console.log('Submitting:', {name, email, message});
    
    feedback.textContent = 'Sending...';
    feedback.style.color = 'orange';
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);
      
      console.log('Result:', {data, error});
      
      if (error) {
        feedback.textContent = 'Error: ' + error.message;
        feedback.style.color = 'red';
      } else {
        feedback.textContent = 'Success! Message saved. ';
        feedback.style.color = 'green';
        form.reset();
      }
    } catch (err) {
      console.error('Full error:', err);
      feedback.textContent = 'Network error. Check console.';
      feedback.style.color = 'red';
    }
  });
  
  console.log('Contact form ready');
});
