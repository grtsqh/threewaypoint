// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('about')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.work, .services, .about, .contact').forEach(section => {
    observer.observe(section);
});

// Skill bar animation
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.style.width;
        }, index * 200);
    });
}

// Project hover effects with data visualization
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        createDataVisualization(project);
    });
    
    project.addEventListener('mouseleave', () => {
        removeDataVisualization(project);
    });
});

// Data visualization creation (inspired by the reference artwork)
function createDataVisualization(project) {
    const visual = project.querySelector('.project-visual');
    
    // Create data overlay
    const dataOverlay = document.createElement('div');
    dataOverlay.className = 'data-overlay';
    dataOverlay.innerHTML = `
        <div class="data-grid">
            <div class="data-line"></div>
            <div class="data-line"></div>
            <div class="data-line"></div>
            <div class="data-circle">
                <div class="data-center"></div>
            </div>
            <div class="data-metrics">
                <div class="metric-point" data-value="2.5M">Views</div>
                <div class="metric-point" data-value="85%">Engagement</div>
                <div class="metric-point" data-value="15K">Shares</div>
            </div>
        </div>
    `;
    
    visual.appendChild(dataOverlay);
    
    // Add CSS styles dynamically
    if (!document.getElementById('data-viz-styles')) {
        const styles = document.createElement('style');
        styles.id = 'data-viz-styles';
        styles.textContent = `
            .data-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(10, 10, 10, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                animation: fadeInData 0.3s ease-out forwards;
            }
            
            @keyframes fadeInData {
                to { opacity: 1; }
            }
            
            .data-grid {
                position: relative;
                width: 80%;
                height: 80%;
            }
            
            .data-line {
                position: absolute;
                background: var(--accent);
                opacity: 0.3;
            }
            
            .data-line:nth-child(1) {
                top: 20%;
                left: 0;
                right: 0;
                height: 1px;
                animation: expandHorizontal 1s ease-out;
            }
            
            .data-line:nth-child(2) {
                top: 0;
                bottom: 0;
                left: 30%;
                width: 1px;
                animation: expandVertical 1s ease-out 0.2s both;
            }
            
            .data-line:nth-child(3) {
                bottom: 30%;
                left: 0;
                right: 0;
                height: 1px;
                animation: expandHorizontal 1s ease-out 0.4s both;
            }
            
            .data-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                border: 2px solid var(--accent);
                border-radius: 50%;
                animation: scaleIn 0.5s ease-out 0.6s both;
            }
            
            .data-center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 4px;
                height: 4px;
                background: var(--accent);
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .data-metrics {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            
            .metric-point {
                position: absolute;
                padding: 4px 8px;
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid var(--accent);
                font-size: 0.7rem;
                font-family: var(--font-mono);
                color: var(--accent);
                opacity: 0;
                animation: fadeInPoint 0.3s ease-out forwards;
            }
            
            .metric-point:nth-child(1) {
                top: 10%;
                right: 10%;
                animation-delay: 0.8s;
            }
            
            .metric-point:nth-child(2) {
                bottom: 20%;
                left: 10%;
                animation-delay: 1s;
            }
            
            .metric-point:nth-child(3) {
                top: 60%;
                right: 20%;
                animation-delay: 1.2s;
            }
            
            .metric-point::before {
                content: attr(data-value);
                display: block;
                font-weight: 500;
                color: white;
            }
            
            @keyframes expandHorizontal {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
            }
            
            @keyframes expandVertical {
                from { transform: scaleY(0); }
                to { transform: scaleY(1); }
            }
            
            @keyframes scaleIn {
                from { transform: translate(-50%, -50%) scale(0); }
                to { transform: translate(-50%, -50%) scale(1); }
            }
            
            @keyframes fadeInPoint {
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
}

function removeDataVisualization(project) {
    const dataOverlay = project.querySelector('.data-overlay');
    if (dataOverlay) {
        dataOverlay.style.animation = 'fadeOutData 0.3s ease-out forwards';
        setTimeout(() => {
            dataOverlay.remove();
        }, 300);
    }
}

// Add fadeout animation
const fadeOutStyles = document.createElement('style');
fadeOutStyles.textContent = `
    @keyframes fadeOutData {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyles);

// Cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.3;
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Hide cursor on project hover
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.transform = 'scale(2)';
    });
    
    project.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body.loaded * {
            animation-play-state: running;
        }
    `;
    document.head.appendChild(loadedStyles);
});

// Console easter egg
console.log(`
    ╭─────────────────────────────╮
    │   Content that spreads      │
    │   허쉬 - Creative Strategist │
    │   Built with ♥ and code    │
    ╰─────────────────────────────╯
    
    Looking for a developer too? 
    Let's create something amazing together.
`);