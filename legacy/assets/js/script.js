// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mock Booking Form Submission
const bookingForm = document.querySelector('form');
if (bookingForm && window.location.pathname.includes('booking.html')) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Booking...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Appointment Booked Successfully! We will contact you shortly.');
            bookingForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
            window.location.href = 'index.html';
        }, 1500);
    });
}

// Mock Login Form Submission
const loginForm = document.querySelector('form');
if (loginForm && window.location.pathname.includes('login.html')) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = loginForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Logging in...';

        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    });
}

// Admin Stats Counter Animation
if (window.location.pathname.includes('admin.html')) {
    const stats = document.querySelectorAll('.text-blue');
    stats.forEach(stat => {
        const value = stat.innerText;
        if (value.match(/^\d+$/)) { // Only animate pure numbers
            let start = 0;
            const end = parseInt(value);
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    stat.innerText = end;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.ceil(start);
                }
            }, 16);
        }
    });

    // Simple notification mock
    setTimeout(() => {
        const bell = document.querySelector('.fa-bell');
        if (bell) {
            bell.style.animation = 'shake 0.5s ease';
        }
    }, 3000);
}

// Add CSS for shake animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
}
`;
document.head.appendChild(styleSheet);

