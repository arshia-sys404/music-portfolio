console.log("🎵 Arshia Portfolio - Firebase version");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWTqmj8M7GX34hLYIbT57XrH99r0dVRXA",
  authDomain: "arshia-sys444.firebaseapp.com",
  projectId: "arshia-sys444",
  storageBucket: "arshia-sys444.firebasestorage.app",
  messagingSenderId: "21932612701",
  appId: "1:21932612701:web:1bbf8749dc385b974601b4",
  measurementId: "G-HX36S0F9BS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - Firebase ready");

  // Smooth scrolling
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Contact form submission
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields!");
        return;
      }

      const btn = form.querySelector("button");
      btn.disabled = true;
      btn.textContent = "Sending... ⏳";

      try {
        const docRef = await db.collection("contacts").add({
          name,
          email,
          message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("✅ SUCCESS:", docRef.id);
        alert("✅ Message sent successfully!");
        form.reset();
      } catch (err) {
        console.error("❌ ERROR:", err);
        alert("❌ Error: " + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
    });
    console.log("✅ Contact form ready");
  }

  // Skills hover effects (enhance CSS)
  document.querySelectorAll(".skill-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.1)";
      item.style.boxShadow = "0 0 15px #fff, 0 0 30px #ff00ff";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
      item.style.boxShadow = "none";
    });
  });

  console.log("🎉 Portfolio fully initialized with Firebase!");
});
