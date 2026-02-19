// Custom cursor removed
const projectItems = document.querySelectorAll('.project-item');

// Project hover effects
projectItems.forEach(item => {
    const title = item.querySelector('.project-title');
    
    item.addEventListener('mouseenter', () => {
        // Add individual project-specific effects
        const projectType = item.dataset.project;
        addProjectSpecificEffect(item, projectType);
    });
    
    item.addEventListener('mouseleave', () => {
        removeProjectSpecificEffect(item);
    });
});

// Project-specific visual effects
function addProjectSpecificEffect(item, projectType) {
    const visual = item.querySelector('.project-visual');
    const img = visual.querySelector('img, video');
    
    if (!img) {
        switch(projectType) {
            case 'seventeen-nanatour':
                visual.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                break;
            case 'ader-bno':
                visual.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                break;
            case 'blackyak':
                visual.style.background = 'linear-gradient(45deg, #2d3748, #4a5568)';
                break;
            case 'le-sserafim':
                visual.style.background = 'linear-gradient(45deg, #f093fb, #f5576c)';
                break;
            case 'tongue-samsung':
                visual.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                break;
            case 'we11done-central':
                visual.style.background = 'linear-gradient(45deg, #ffecd2, #fcb69f)';
                break;
            case 'ader-converse':
                visual.style.background = 'linear-gradient(45deg, #a8edea, #fed6e3)';
                break;
            case 'ader-meta':
                visual.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                break;
            case 'elle-beauty':
                visual.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
                break;
            case 'puma':
                visual.style.background = 'linear-gradient(45deg, #2d3748, #4a5568)';
                break;
            case 'zara':
                visual.style.background = 'linear-gradient(45deg, #ffecd2, #fcb69f)';
                break;
            case 'kitsune':
                visual.style.background = 'linear-gradient(45deg, #a8edea, #fed6e3)';
                break;
            case 'tongue-2021':
                visual.style.background = 'linear-gradient(45deg, #f093fb, #f5576c)';
                break;
            default:
                visual.style.background = '#f5f5f5';
        }
    }
    
    // Add subtle animation to the visual
    visual.style.transform = 'scale(1.02)';
    visual.style.transition = 'all 0.3s ease';
}

function removeProjectSpecificEffect(item) {
    const visual = item.querySelector('.project-visual');
    const img = visual.querySelector('img, video');
    
    visual.style.transform = 'scale(1)';
    
    if (!img) {
        visual.style.background = '#f5f5f5';
    }
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Removed typing effect as requested

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentIndex = Array.from(projectItems).findIndex(item => 
        item.matches(':hover')
    );
    
    if (e.key === 'ArrowDown' && currentIndex < projectItems.length - 1) {
        projectItems[currentIndex + 1].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        projectItems[currentIndex - 1].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
});

// Add subtle parallax effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.projects');
    
    if (parallax) {
        const speed = scrolled * 0.1;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add click sound effect (visual feedback)
projectItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = item.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.left + rect.width / 2 - size / 2;
        const y = rect.top + rect.height / 2 - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console signature
console.log(`
    ██╗  ██╗██╗   ██╗███████╗██╗  ██╗
    ██║  ██║██║   ██║██╔════╝██║  ██║
    ███████║██║   ██║███████╗███████║
    ██╔══██║██║   ██║╚════██║██╔══██║
    ██║  ██║╚██████╔╝███████║██║  ██║
    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
    
    3D Creative • Seoul • 2024
    
    Portfolio built with minimal aesthetics
    and maximum impact in mind.
`);