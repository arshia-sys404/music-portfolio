// Supabase - NO DEFER - Load immediately
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Smooth scroll
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Wait for DOM + test Supabase
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactFeedback = document.getElementById('contact-feedback');
    
    if (!contactForm || !contactFeedback) {
        console.error('Contact elements missing!');
        return;
    }
    
    console.log('Supabase client:', supabaseClient);
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        console.log('Form data:', { name, email, message });
        
        if (!name || !email || !message) {
            contactFeedback.textContent = 'Please fill all fields!';
            contactFeedback.style.color = 'red';
            return;
        }
        
        contactFeedback.textContent = 'Sending...';
        contactFeedback.style.color = 'orange';
        
        try {
            const { data, error } = await supabaseClient
                .from('contacts')
                .insert([{ name, email, message }]);
                
            console.log('Supabase response:', { data, error });
            
            if (error) throw error;
            
            contactFeedback.textContent = '✅ Message sent to Supabase!';
            contactFeedback.style.color = 'lightgreen';
            contactForm.reset();
        } catch (err) {
            console.error('Full error:', err);
            contactFeedback.textContent = `❌ Error: ${err.message}`;
            contactFeedback.style.color = 'red';
        }
    });
});
