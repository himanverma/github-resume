// Modern Resume - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    const THEME_KEY = 'hv-theme';
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            themeToggle?.classList.add('active');
        } else {
            root.removeAttribute('data-theme');
            themeToggle?.classList.remove('active');
        }
    }
    
    function detectPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        return media.matches ? 'dark' : 'light';
    }
    
    let currentTheme = detectPreferredTheme();
    applyTheme(currentTheme);
    
    themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, currentTheme);
        applyTheme(currentTheme);
    });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem(THEME_KEY)) {
            currentTheme = event.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
        }
    });

    // Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.getAttribute('data-text');
        let index = 0;
        typewriter.textContent = '';
        
        function type() {
            if (index < text.length) {
                typewriter.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        setTimeout(type, 500);
    }

    // Particle Background
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resize();
        window.addEventListener('resize', resize);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        
        // Pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all major elements
    document.querySelectorAll('.section-header, .skill-group, .timeline-item, .project-card, .education-card, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // Dynamic footer year
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
