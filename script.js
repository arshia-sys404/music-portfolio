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

// Purple Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#9932cc'; // Purple
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Twinkling Stars Background
function initStarsBg() {
    const canvas = document.getElementById('stars-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.01
        });
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.save();
            ctx.globalAlpha = star.opacity * 0.8 + 0.2;
            ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#9932cc';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            star.opacity += star.speed;
            if (star.opacity > 1 || star.opacity < 0) {
                star.speed = -star.speed;
            }
        });
    }
    
    setInterval(draw, 100);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recreate stars on resize
        stars.length = 0;
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                speed: Math.random() * 0.02 + 0.01
            });
        }
    });
}

initMatrixRain();
initStarsBg();

