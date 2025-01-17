import gsap from 'gsap';

export class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;
        this.isTransitioning = false;
        this.loader = null;
        this.notFoundHandler = null;
        
        // Create container for pages
        this.container = document.createElement('div');
        this.container.id = 'page-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
        `;
        document.body.appendChild(this.container);
    }

    register(path, modulePromise) {
        this.routes.set(path, modulePromise);
    }

    on404(handler) {
        this.notFoundHandler = handler;
    }

    async navigate(path, pushState = true) {
        // Prevent navigation during transitions
        if (this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;

        try {
            // Show loading indicator
            this.showLoader();

            // Check if route exists
            if (!this.routes.has(path)) {
                if (this.notFoundHandler) {
                    // Set HTTP status code to 404
                    document.title = '404 - Page Not Found | The Skull Crusher';
                    this.notFoundHandler();
                    return;
                }
            }

            // Load the page module
            const pageModule = await this.routes.get(path)();
            const content = await pageModule.default();

            // Create container for the new page
            const newPage = document.createElement('div');
            newPage.className = 'page';
            newPage.innerHTML = content;

            // Handle close button click
            const closeBtn = newPage.querySelector('.close-page');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.close());
            }

            // Handle back home button click for 404 page
            const backHomeBtn = newPage.querySelector('.back-home');
            if (backHomeBtn) {
                backHomeBtn.addEventListener('click', () => {
                    this.close();
                    window.history.pushState(null, '', '/');
                });
            }

            // Transition out current page if it exists
            if (this.currentPage) {
                await this.transitionOut(this.currentPage);
                this.currentPage.remove();
            }

            // Add new page to container
            this.container.appendChild(newPage);
            this.currentPage = newPage;

            // Enable pointer events and show container
            this.container.style.pointerEvents = 'auto';
            gsap.to(this.container, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Transition in new page
            await this.transitionIn(newPage);

            // Update browser history
            if (pushState && path !== '404') {
                window.history.pushState({ path }, '', path);
            }

        } catch (error) {
            console.error('Navigation error:', error);
            this.showErrorMessage('Failed to load page. Please try again.');
        } finally {
            this.hideLoader();
            this.isTransitioning = false;
        }
    }

    async close() {
        if (!this.currentPage || this.isTransitioning) return;

        this.isTransitioning = true;

        try {
            // Fade out container
            await gsap.to(this.container, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });

            // Disable pointer events
            this.container.style.pointerEvents = 'none';

            // Remove current page
            if (this.currentPage) {
                this.currentPage.remove();
                this.currentPage = null;
            }

            // Update history
            window.history.pushState(null, '', '/');

        } catch (error) {
            console.error('Close error:', error);
        } finally {
            this.isTransitioning = false;
        }
    }

    transitionIn(element) {
        return new Promise(resolve => {
            const timeline = gsap.timeline({
                onComplete: resolve
            });

            // Fade in and scale up
            timeline
                .from(element, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                .from(element.querySelectorAll('.content-item'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, '-=0.2');
        });
    }

    transitionOut(element) {
        return gsap.to(element, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
        });
    }

    showLoader() {
        if (!this.loader) {
            this.loader = document.createElement('div');
            this.loader.className = 'page-loader';
            this.loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                </div>
            `;
            document.body.appendChild(this.loader);
        }

        gsap.set(this.loader, { display: 'flex', opacity: 0 });
        gsap.to(this.loader, { opacity: 1, duration: 0.2 });
    }

    hideLoader() {
        if (this.loader) {
            gsap.to(this.loader, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    this.loader.remove();
                    this.loader = null;
                }
            });
        }
    }

    showErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'page-error';
        errorElement.innerHTML = `
            <div class="error-content">
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(errorElement);

        gsap.from(errorElement, {
            opacity: 0,
            y: -20,
            duration: 0.3
        });

        setTimeout(() => {
            gsap.to(errorElement, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => errorElement.remove()
            });
        }, 3000);
    }
} 