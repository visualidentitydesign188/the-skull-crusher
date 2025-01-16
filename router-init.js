import { Router } from './router.js';

// Initialize router
const router = new Router();

router.register('/controls', () => import('./pages/controls.js'));
router.register('/story', () => import('./pages/story.js'));

document.addEventListener('DOMContentLoaded', () => {
    // Controls button
    const controlsBtn = document.querySelector('button.controls');
    if (controlsBtn) {
        controlsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('/controls');
        });
    }

    const storyBtn = document.querySelector('button.rules');
    if (storyBtn) {
        storyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('/story');
        });
    }

    window.addEventListener('popstate', (e) => {
        if (e.state?.path) {
            router.navigate(e.state.path, false);
        }
    });

    const path = window.location.pathname;
    if (path === '/controls' || path === '/story') {
        router.navigate(path, false);
    }
}); 