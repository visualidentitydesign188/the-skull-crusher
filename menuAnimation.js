import gsap from 'gsap';
import SplitType from 'split-type';

let menuOpen = false;
let menuTL;

function createTimeline() {
    if (menuTL) {
        menuTL.kill();
    }

    menuTL = gsap.timeline({ paused: true });

    gsap.set('#overlay-menu', {
        clipPath: 'inset(0% 0% 0% 100%)',
        display: 'block',
        opacity: 1
    });

    menuTL
        .fromTo('#overlay-menu', {
            clipPath: 'inset(0% 0% 0% 100%)',
        }, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.inOut'
        })
        .from('.intro p.menu-text .line', {
            yPercent: 100,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.1
        }, .5)
        .from('.about p.menu-text .line', {
            yPercent: 100,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.1
        }, .5);

    if (menuOpen) {
        menuTL.progress(1);
    }
}

function initSplitText() {
    const menuText = document.querySelectorAll('.menu-text');
    menuText.forEach(text => {
        // Clean up previous split
        if (text.splitType) {
            text.splitType.revert();
        }

        const splitText = new SplitType(text, { types: 'lines,words' });
        text.splitType = splitText; // Store reference for cleanup

        // Clear existing line containers
        const oldContainers = text.querySelectorAll('.line-container');
        oldContainers.forEach(container => container.remove());

        // Wrap each line in a container div
        splitText.lines.forEach(line => {
            const container = document.createElement('div');
            container.className = 'line-container';
            line.parentNode.insertBefore(container, line);
            container.appendChild(line);
        });
    });

    gsap.set('.menu-text .line-container', { overflow: "hidden" });
    
    // Recreate the timeline after splitting text
    createTimeline();
}

// Initialize split text (which will also create the timeline)
initSplitText();

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initSplitText, 200);
});

// Toggle menu function
function toggleMenu() {
    if (!menuOpen) {
        gsap.set('#overlay-menu', { display: 'block' });
        menuTL.play();
    } else {
        menuTL.reverse();
        menuTL.eventCallback("onReverseComplete", () => {
            gsap.set('#overlay-menu', { display: 'none' });
        });
    }
    menuOpen = !menuOpen;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.burning-head').addEventListener('click', toggleMenu);
    document.querySelector('.close-btn').addEventListener('click', toggleMenu);
});

export { toggleMenu }; 