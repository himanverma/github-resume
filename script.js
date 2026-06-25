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
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Dynamic footer year
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // =====================
    // AI Chat Widget
    // =====================
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatSettingsBtn = document.getElementById('chatSettingsBtn');
    const chatSettings = document.getElementById('chatSettings');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatProvider = document.getElementById('chatProvider');
    const chatApiKey = document.getElementById('chatApiKey');
    const chatOllamaUrl = document.getElementById('chatOllamaUrl');
    const chatOllamaModel = document.getElementById('chatOllamaModel');
    const openaiKeyRow = document.getElementById('openaiKeyRow');
    const ollamaUrlRow = document.getElementById('ollamaUrlRow');
    const ollamaModelRow = document.getElementById('ollamaModelRow');
    const chatSettingsHint = document.getElementById('chatSettingsHint');
    const chatSaveSettings = document.getElementById('chatSaveSettings');

    const CHAT_SETTINGS_KEY = 'hv-chat-settings';

    function loadChatSettings() {
        try {
            const raw = localStorage.getItem(CHAT_SETTINGS_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) { /* ignore */ }
        return { provider: 'local', apiKey: '', ollamaUrl: 'http://localhost:11434', ollamaModel: 'llama3.2' };
    }

    function saveChatSettings() {
        const settings = {
            provider: chatProvider.value,
            apiKey: chatApiKey.value.trim(),
            ollamaUrl: chatOllamaUrl.value.trim() || 'http://localhost:11434',
            ollamaModel: chatOllamaModel.value.trim() || 'llama3.2'
        };
        localStorage.setItem(CHAT_SETTINGS_KEY, JSON.stringify(settings));
    }

    const settings = loadChatSettings();
    chatProvider.value = settings.provider;
    chatApiKey.value = settings.apiKey;
    chatOllamaUrl.value = settings.ollamaUrl;
    chatOllamaModel.value = settings.ollamaModel;

    function updateSettingsVisibility() {
        const provider = chatProvider.value;
        openaiKeyRow.style.display = provider === 'openai' ? 'flex' : 'none';
        ollamaUrlRow.style.display = provider === 'ollama' ? 'flex' : 'none';
        ollamaModelRow.style.display = provider === 'ollama' ? 'flex' : 'none';
        if (provider === 'local') {
            chatSettingsHint.textContent = 'Answers come from built-in resume knowledge. No API key required.';
        } else if (provider === 'openai') {
            chatSettingsHint.textContent = 'Your API key is stored locally in your browser only.';
        } else if (provider === 'ollama') {
            chatSettingsHint.textContent = 'Requires a running Ollama instance with CORS enabled.';
        }
    }

    updateSettingsVisibility();
    chatProvider.addEventListener('change', updateSettingsVisibility);

    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('open');
        chatToggle.classList.add('hidden');
        chatInput.focus();
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWidget.classList.remove('open');
        chatToggle.classList.remove('hidden');
    });

    chatSettingsBtn.addEventListener('click', () => {
        chatSettings.classList.toggle('open');
    });

    chatSaveSettings.addEventListener('click', () => {
        saveChatSettings();
        chatSettings.classList.remove('open');
    });

    // PDF Download Button
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            window.print();
        });
    }

    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${sender}`;
        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        if (sender === 'bot') {
            avatar.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 7.5"/></svg>';
        } else {
            avatar.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        }
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = formatText(text);
        msg.appendChild(avatar);
        msg.appendChild(bubble);
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return bubble;
    }

    function showTyping() {
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.id = 'chatTypingIndicator';
        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 7.5"/></svg>';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
        msg.appendChild(avatar);
        msg.appendChild(bubble);
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('chatTypingIndicator');
        if (el) el.remove();
    }

    function formatText(text) {
        let html = text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
        html = html.replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, '');
        html = html.replace(/\n/g, '<p>');
        html = html.replace(/<p><\/p>/g, '<p></p>');
        return html;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        appendMessage(text, 'user');
        chatInput.disabled = true;
        chatSend.disabled = true;
        showTyping();

        const settings = loadChatSettings();
        try {
            let response;
            if (settings.provider === 'openai') {
                response = await callOpenAI(text, settings.apiKey);
            } else if (settings.provider === 'ollama') {
                response = await callOllama(text, settings.ollamaUrl, settings.ollamaModel);
            } else {
                response = await callLocalKnowledge(text);
            }
            hideTyping();
            appendMessage(response, 'bot');
        } catch (err) {
            hideTyping();
            appendMessage('Sorry, I encountered an error: ' + err.message, 'bot');
        } finally {
            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    const SYSTEM_PROMPT = `You are an AI assistant embedded on Himanshu Verma's professional resume website. You have complete knowledge of his career, skills, and projects. Answer questions concisely and professionally. Use markdown formatting for emphasis and lists where appropriate.

RESUME CONTEXT:
Name: Himanshu Verma
Role: Senior / Lead Full Stack Developer
Experience: 12+ years
Location: Lucknow, India
Email: himan.verma@live.com
Phone: +91 8750784618
GitHub: github.com/himanverma

Summary: 12+ years architecting high-scale web & mobile ecosystems. Expert in Node.js, React/Next.js, and Laravel. Driving technical strategy, leading cross-functional teams, and implementing AI/LLM solutions in production.

Skills:
- Backend (Expert): Node.js, Express, AdonisJS, PHP; (Advanced): Laravel, REST APIs; (Proficient): Prisma ORM, Socket.io
- Frontend (Expert): React.js, Next.js, TailwindCSS; (Advanced): Zustand, Redux; (Proficient): Vite
- Mobile (Expert): React Native; (Advanced): NativeWind; (Proficient): Expo, Cross-platform
- Databases (Expert): MySQL; (Advanced): MongoDB, Redis; (Proficient): PostgreSQL
- Infrastructure (Expert): AWS, Docker; (Advanced): Auth0, CI/CD; (Proficient): Git
- AI & Emerging Tech (Expert): Ollama, Agentic AI; (Advanced): FunctionGemma, Prompt Engineering; (Proficient): LLM Orchestration

Experience:
1. Capital Numbers Infotech Pvt Ltd (Jan 2025 – Present) - Senior Software Developer
   - Architecting high-performance frontend with Next.js (App Router) & TailwindCSS, achieving <2s page load times
   - Designed scalable state management with Zustand, reducing boilerplate by 40% vs Redux
   - Leading Auth0 integration for centralized identity across client products
   - Projects: ottogusto.com, qverde.com

2. Payix | RePay (2020 – 2024) - Senior Software Engineer
   - Built core fintech modules for high-frequency payment processing with Node.js & React
   - Ensured 99.9% uptime for critical payment infrastructure
   - Engineered MySQL schemas & Redis caching for peak transaction loads
   - Containerized monoliths into Docker microservices
   - Mentored team of 5+ developers on code quality & testing

3. Appster LLP (2016 – 2018) - Senior Software Engineer
   - Scaled full-stack apps for global startups using Laravel & Node.js
   - Developed React Native mobile apps with offline-first architecture
   - Built real-time services with Socket.io

4. Zakoopi (RustOrange) (2015 – 2016) - Technical Lead & Architect
   - Spearheaded social discovery engine serving thousands of concurrent users
   - Migrated monolith to Service-Oriented Architecture
   - Optimized AWS infrastructure for cost & performance

5. Earlier Career:
   - Senior Team Leader at Futureworks Pvt Ltd (2014-2015)
   - UI/UX Developer at Cardinal Technology Solutions (2013-2014)
   - Team Leader / Web Developer at Maaraj Strategic Development (2012-2013)
   - Web Developer at Macro Info Solutions (2011-2012)

Key Projects:
- BoloBill Voice Commerce: AI voice shopping experience for Indian kiranas—Hindi/English speech-to-order, WhatsApp sharing, UPI billing, and inventory automation. (Next.js, Node.js, WhatsApp API, AWS)
- Safe Ride Track: Real-time fleet tracking console with live GPS, geofencing alerts, and driver scorecards. (React, TypeScript, WebSockets, Map APIs)
- AptitudeClasses 360: Competitive exam prep platform hosting 30 years of solved papers, 30k+ MCQs, Sunday live quizzes, and Zoom-powered personality labs. (Next.js, Laravel, PostgreSQL, Zoom SDK)
- Enterprise Fintech Engine: Multi-tenant payment gateway stack with audit-ready ledgers, configurable routing, and 99.9% uptime guarantees. (Node.js, React, MySQL, Redis)
- Real-time Event Systems: Webhook ingestion pipeline handling thousands of concurrent events with self-healing workers and audit trails. (Node.js, Redis Pub/Sub, Socket.io)
- Dynamic E-commerce: SSR marketplace architecture with composable product schemas, lightning-fast faceted search, and CMS-connected merchandising. (Next.js, Prisma, TailwindCSS)

Education: Bachelor of Computer Applications (BCA)

Availability: Available for senior/lead roles, consulting, and architecture opportunities.`;

    async function callOpenAI(message, apiKey) {
        if (!apiKey) throw new Error('Please enter your OpenAI API key in settings.');
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 600
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || 'OpenAI API error');
        return data.choices[0].message.content;
    }

    async function callOllama(message, baseUrl, model) {
        const url = (baseUrl || 'http://localhost:11434').replace(/\/$/, '') + '/api/chat';
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: model || 'llama3.2',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                stream: false,
                options: { temperature: 0.7, num_predict: 600 }
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Ollama API error');
        return data.message?.content || data.response || 'No response from Ollama.';
    }

    async function callLocalKnowledge(message) {
        await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
        const q = message.toLowerCase();

        if (q.includes('experience') || q.includes('years') || q.includes('career')) {
            return `Himanshu has **12+ years** of professional experience spanning full-stack development, technical leadership, and architecture.\n\nKey highlights:\n- Currently Senior Software Developer at Capital Numbers Infotech (since Jan 2025)\n- 4 years at Payix | RePay as Senior Software Engineer (2020–2024)\n- 2 years at Appster LLP as Senior Software Engineer (2016–2018)\n- Technical Lead at Zakoopi (2015–2016)\n- Earlier roles in team leadership and web development from 2011–2015`;
        }
        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('technology')) {
            return `Himanshu's core technical stack:\n\n**Backend (Expert):** Node.js, Express, AdonisJS, PHP\n**Frontend (Expert):** React.js, Next.js, TailwindCSS\n**Mobile (Expert):** React Native\n**Databases (Expert):** MySQL\n**Infrastructure (Expert):** AWS, Docker\n**AI (Expert):** Ollama, Agentic AI\n\nHe also works with Laravel, MongoDB, Redis, PostgreSQL, Auth0, CI/CD, Zustand, Redux, Socket.io, and more.`;
        }
        if (q.includes('node') || q.includes('react') || q.includes('next') || q.includes('laravel') || q.includes('php')) {
            return `Himanshu is an **expert** in **Node.js**, **React.js**, and **Next.js**, with **advanced** proficiency in **Laravel** and **PHP**. He has architected production systems using these technologies for over a decade, including high-frequency fintech platforms, real-time event systems, and SSR e-commerce marketplaces.`;
        }
        if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('bolobill') || q.includes('safe ride') || q.includes('aptitude')) {
            return `Notable projects include:\n\n- **BoloBill Voice Commerce** — AI voice shopping for Indian kiranas with speech-to-order, WhatsApp sharing, UPI billing (Next.js, Node.js, AWS)\n- **Safe Ride Track** — Real-time fleet tracking with GPS, geofencing, and driver scorecards (React, TypeScript, WebSockets)\n- **AptitudeClasses 360°** — Exam prep platform with 30k+ MCQs, live quizzes, Zoom labs (Next.js, Laravel, PostgreSQL)\n- **Enterprise Fintech Engine** — Multi-tenant payment gateway with 99.9% uptime (Node.js, React, MySQL, Redis)\n- **Real-time Event Systems** — Webhook pipeline with self-healing workers (Node.js, Redis Pub/Sub, Socket.io)`;
        }
        if (q.includes('ai') || q.includes('llm') || q.includes('ollama') || q.includes('agentic') || q.includes('machine learning') || q.includes('ml ')) {
            return `Himanshu has hands-on production experience with **AI/LLM solutions**:\n\n- **Ollama** (Expert) — local LLM deployment and integration\n- **Agentic AI** (Expert) — building autonomous agent workflows\n- **FunctionGemma** (Advanced) — function-calling with open models\n- **Prompt Engineering** (Advanced) — optimizing LLM outputs\n- **LLM Orchestration** (Proficient) — multi-model pipeline management\n\nHe is actively implementing AI solutions in production environments.`;
        }
        if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('available')) {
            return `Himanshu is **available for opportunities**. You can reach him at:\n\n- **Email:** himan.verma@live.com\n- **Phone:** +91 8750784618\n- **GitHub:** github.com/himanverma\n- **Location:** Lucknow, India\n\nHe is open to senior/lead roles, consulting, and architecture opportunities.`;
        }
        if (q.includes('current') || q.includes('now') || q.includes('present') || q.includes('capital')) {
            return `Himanshu is currently a **Senior Software Developer** at **Capital Numbers Infotech Pvt Ltd** (Jan 2025 – Present).\n\nKey work:\n- Architecting high-performance frontend with Next.js (App Router) & TailwindCSS, achieving **<2s** page load times\n- Designed scalable state management with Zustand, reducing boilerplate by **40%** vs Redux\n- Leading **Auth0** integration for centralized identity across client products\n- Projects: **ottogusto.com**, **qverde.com**`;
        }
        if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('college') || q.includes('university')) {
            return `Himanshu holds a **Bachelor of Computer Applications (BCA)**, which gave him a foundation in computer science, software engineering principles, and application development.`;
        }
        if (q.includes('payix') || q.includes('repay') || q.includes('fintech') || q.includes('payment')) {
            return `At **Payix | RePay** (2020–2024) as Senior Software Engineer, Himanshu:\n\n- Built core **fintech modules** for high-frequency payment processing with Node.js & React\n- Ensured **99.9% uptime** for critical payment infrastructure\n- Engineered **MySQL** schemas & **Redis** caching for peak transaction loads\n- Containerized monoliths into **Docker** microservices\n- Mentored a team of **5+ developers** on code quality & testing`;
        }
        if (q.includes('lead') || q.includes('mentor') || q.includes('team') || q.includes('manage')) {
            return `Himanshu has significant **leadership experience**:\n\n- Mentored **5+ developers** at Payix | RePay\n- Served as **Technical Lead & Architect** at Zakoopi, spearheading a social discovery engine\n- Held **Senior Team Leader** role at Futureworks Pvt Ltd (2014–2015)\n- Leads technical strategy and cross-functional teams in current role`;
        }
        if (q.includes('docker') || q.includes('aws') || q.includes('devops') || q.includes('infrastructure') || q.includes('cloud')) {
            return `Himanshu is an **expert** in **AWS** and **Docker**. He has:\n\n- Containerized monoliths into Docker microservices at Payix\n- Optimized AWS infrastructure for cost & performance at Zakoopi\n- Built CI/CD pipelines and managed cloud deployments across multiple roles\n- Ensured 99.9% uptime for critical infrastructure`;
        }
        if (q.includes('mobile') || q.includes('react native') || q.includes('app')) {
            return `Himanshu is an **expert** in **React Native** mobile development. He has:\n\n- Built cross-platform mobile apps with offline-first architecture at Appster LLP\n- Used NativeWind and Expo in various projects\n- Delivered mobile solutions for global startups`;
        }

        return `That's a great question. Here's what I know based on Himanshu's resume:\n\nHe is a **Senior Full Stack Developer** with **12+ years** of experience, specializing in **Node.js**, **React/Next.js**, and **Laravel**. He has led technical teams, architected high-scale systems, and is actively implementing **AI/LLM** solutions in production.\n\nFeel free to ask about his **skills**, **projects**, **work experience**, **AI expertise**, or **contact details** for more specific information.`;
    }
});
