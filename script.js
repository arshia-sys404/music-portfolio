// ---------------- Supabase Config ----------------
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------- Smooth Scroll ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// ---------------- Upload Beat ----------------
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('beat-name').value;
    const desc = document.getElementById('beat-desc').value;
    const file = document.getElementById('beat-file').files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    try {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('beats')
            .upload(`beat-${Date.now()}.mp3`, file);

        if (uploadError) throw uploadError;

        await supabase.from('beats').insert([{ name, desc, url: uploadData.path }]);
        loadBeats();
        e.target.reset();
        alert('Beat uploaded successfully!');
    } catch (err) {
        console.error(err);
        alert('Failed to upload beat: ' + err.message);
    }
});

// ---------------- Load Beats ----------------
async function loadBeats() {
    const { data, error } = await supabase.from('beats').select();
    if (error) {
        console.error(error);
        return;
    }

    const grid = document.getElementById('beats-list');
    grid.innerHTML = data.map(beat => 
        `<div class="beat-card" onclick="playBeat('${beat.url}')">
            <h3>${beat.name}</h3>
            <p>${beat.desc}</p>
        </div>`).join('');
}
loadBeats();

// ---------------- Modal Player ----------------
function playBeat(url) {
    const publicUrl = supabase.storage.from('beats').getPublicUrl(url).data.publicUrl;
    document.getElementById('audio-player').src = publicUrl;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('audio-player').pause();
}

// ---------------- Contact Form (FULL SUPABASE) ----------------
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
        console.error('Supabase insert error:', err);
        contactFeedback.textContent = 'Failed to send: ' + err.message;
        contactFeedback.style.color = 'red';
    }
});
