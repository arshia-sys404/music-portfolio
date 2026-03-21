// ---------------- Supabase Config ----------------
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------- Smooth Scroll ----------------
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// ---------------- Contact Form (Supabase) ----------------
const contactFeedback = document.getElementById('contact-feedback');

document.querySelector('#contact form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
        contactFeedback.textContent = 'Please fill in all fields!';
        contactFeedback.style.color = 'red';
        return;
    }

    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) throw error;

        contactFeedback.textContent = 'Message sent successfully! 🎉';
        contactFeedback.style.color = 'lightgreen';
        e.target.reset();
        console.log('Contact saved:', data);
    } catch (err) {
        console.error('Supabase error:', err);
        contactFeedback.textContent = 'Failed: ' + err.message;
        contactFeedback.style.color = 'red';
    }
});
