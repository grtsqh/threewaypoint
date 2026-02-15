// Custom cursor
const cursor = document.querySelector('.cursor');
const projectItems = document.querySelectorAll('.project-item');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Project hover effects
projectItems.forEach(item => {
    const title = item.querySelector('.project-title');
    
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        
        // Add individual project-specific effects
        const projectType = item.dataset.project;
        addProjectSpecificEffect(item, projectType);
    });
    
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        removeProjectSpecificEffect(item);
    });
});

// Project-specific visual effects
function addProjectSpecificEffect(item, projectType) {
    const visual = item.querySelector('.project-visual');
    
    switch(projectType) {
        case 'fashion-x':
            visual.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            break;
        case 'streetwear':
            visual.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            break;
        case 'avant-garde':
            visual.style.background = 'linear-gradient(45deg, #f093fb, #f5576c)';
            break;
        case 'luxury':
            visual.style.background = 'linear-gradient(45deg, #ffecd2, #fcb69f)';
            break;
        case 'experimental':
            visual.style.background = 'linear-gradient(45deg, #a8edea, #fed6e3)';
            break;
        default:
            visual.style.background = '#ffffff';
    }
    
    // Add subtle animation to the visual
    visual.style.transform = 'scale(1.02)';
    visual.style.transition = 'all 0.3s ease';
}

function removeProjectSpecificEffect(item) {
    const visual = item.querySelector('.project-visual');
    visual.style.transform = 'scale(1)';
    visual.style.background = '#ffffff';
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add typing effect to project titles on load
window.addEventListener('load', () => {
    projectItems.forEach((item, index) => {
        const title = item.querySelector('.project-title');
        const text = title.textContent;
        title.textContent = '';
        
        setTimeout(() => {
            typeText(title, text, 50);
        }, index * 100);
    });
});

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

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