document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const heroVisual = document.querySelector('.hero-visual');
    const form = document.querySelector('form');
    const resultBox = document.querySelector('.result-box');
    const navLinks = document.querySelectorAll('.nav-links a');

    const savedTheme = localStorage.getItem('bike-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    const syncThemeButton = () => {
        const darkEnabled = body.classList.contains('dark-theme');
        if (toggleBtn) {
            toggleBtn.textContent = darkEnabled ? '☀️ Light' : '🌙 Dark';
            toggleBtn.setAttribute('aria-pressed', String(darkEnabled));
        }
    };

    syncThemeButton();

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const darkEnabled = body.classList.contains('dark-theme');
            localStorage.setItem('bike-theme', darkEnabled ? 'dark' : 'light');
            syncThemeButton();
        });
    }

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const currentPath = window.location.pathname;

        if (href === '/' && currentPath === '/') {
            link.classList.add('active');
        } else if (href && href !== '/' && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });

    if (heroVisual) {
        window.addEventListener('mousemove', (event) => {
            const offsetX = (event.clientX / window.innerWidth - 0.5) * 12;
            const offsetY = (event.clientY / window.innerHeight - 0.5) * 12;
            heroVisual.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }

    if (form) {
        const inputs = form.querySelectorAll('input, select');
        const liveTag = document.createElement('div');
        liveTag.className = 'live-status';
        liveTag.textContent = 'Live form ready';
        form.appendChild(liveTag);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                liveTag.textContent = 'Inputs updating live';
                liveTag.classList.add('active');
            });
        });

        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('.predict-btn');
            if (submitBtn) {
                submitBtn.textContent = 'Predicting...';
                submitBtn.disabled = true;
            }
        });
    }

    if (resultBox) {
        resultBox.classList.add('is-live');
    }
});
