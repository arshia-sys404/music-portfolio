// Firebase Contact Form + Portfolio v1
console.log('🎵 Firebase Portfolio v1 - Fresh Start');

// Firebase config - REPLACE WITH YOUR CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded - Firebase ready');
  
  initMatrixRain();
  initSmoothScroll();
  initContactForm();
});

function initMatrixRain() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01アイウエオカキクケコ';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0ff';
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
  console.log('✅ Matrix rain started');
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        status.textContent = 'Fill all fields';
        status.className = 'status-error';
        return;
      }
      
      const btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.textContent = 'Sending...';
      status.className = 'status-sending';
      
      try {
        await db.collection('contacts').add({
          name,
          email,
          message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        status.textContent = 'Message saved!';
        status.className = 'status-success';
        form.reset();
        console.log('✅ Firebase save success');
      } catch (error) {
        status.textContent = 'Error: ' + error.message;
        status.className = 'status-error';
        console.error('Firebase error:', error);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }
    });
    console.log('✅ Firebase form ready');
  }
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('matrix-bg');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
