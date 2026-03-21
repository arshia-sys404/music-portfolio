// Supabase setup - immediate load
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';

let supabaseClient;

document.addEventListener('DOMContentLoaded', async function() {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client ready:', supabaseClient);

  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (!contactForm || !contactFeedback) {
    console.error('Missing form elements!');
    return;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submit triggered');

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    console.log('Data:', { name, email, message });

    if (!name || !email || !message) {
      contactFeedback.textContent = 'Fill all fields!';
      contactFeedback.style.color = '#ff4444';
      return;
    }

    contactFeedback.textContent = 'Sending...';
    contactFeedback.style.color = '#ffaa00';

    try {
      const { data, error } = await supabaseClient
        .from('contacts')
        .insert([{ name, email, message }]);

      console.log('Supabase result:', { data, error });

      if (error) throw error;

      contactFeedback.textContent = '✅ Sent to Supabase!';
      contactFeedback.style.color = '#44ff44';
      contactForm.reset();
    } catch (err) {
      console.error('Error:', err);
      contactFeedback.textContent = `❌ ${err.message}`;
      contactFeedback.style.color = '#ff4444';
    }
  });
});
