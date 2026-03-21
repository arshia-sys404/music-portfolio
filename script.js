// Supabase Config - Replace with your details
const SUPABASE_URL = 'https://llocnfzgmqogfmrqobod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qQmXqJ_1fkn8plW3E2awzw_2E8yD2sx';
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Upload beat
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('beat-name').value;
    const desc = document.getElementById('beat-desc').value;
    const file = document.getElementById('beat-file').files[0];

    if (file) {
        const { data } = await supabase.storage
            .from('beats')
            .upload(`beat-${Date.now()}.mp3`, file);
        await supabase.from('beats').insert([{ name, desc, url: data.path }]);
        loadBeats();
        e.target.reset();
    }
});

// Load beats
async function loadBeats() {
    const { data } = await supabase.from('beats').select();
    const grid = document.getElementById('beats-list');
    grid.innerHTML = data.map(beat => 
        `<div class="beat-card" onclick="playBeat('${beat.url}')">
            <h3>${beat.name}</h3>
            <p>${beat.desc}</p>
        </div>`
    ).join('');
}
loadBeats();

// Modal player
function playBeat(url) {
    const publicUrl = supabase.storage.from('beats').getPublicUrl(url).data.publicUrl;
    document.getElementById('audio-player').src = publicUrl;
    document.getElementById('modal').classList.add('active');
}
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('audio-player').pause();
}

// Contact form (placeholder)
document.querySelector('#contact form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Add backend later)');
});
