export default async function Story() {
    return `
        <div class="page-content story-page">
            <header class="content-item">
                <button class="close-page">
                    <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="29" stroke="white" stroke-width="2"/>
                        <path d="M20 20L40 40M40 20L20 40" stroke="white" stroke-width="2"/>
                    </svg>
                </button>
            </header>
            <main>
                <video class="story-video" autoplay loop playsinline>
                    <source src="/videos/story.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </main>
        </div>
    `;
} 