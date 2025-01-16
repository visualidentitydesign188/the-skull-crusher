export default async function Controls() {
    return `
    
    <div class="page-content controls-page">
        <header class="content-item">
            <button class="close-page">
                <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="29" stroke="white" stroke-width="2" />
                    <path d="M20 20L40 40M40 20L20 40" stroke="white" stroke-width="2" />
                </svg>
            </button>
        </header>
        <main>
            <div class="controls-title">
                <h1>Game Controls <br />
                    & Rules</h1>
            </div>

            <div class="controls-container">
                <div class="row">
                    <div class="control-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M3.741.064a.75.75 0 1 1 .606 1.372a2.1 2.1 0 0 0-.906.763a.75.75 0 1 1-1.248-.832A3.6 3.6 0 0 1 3.741.064M2.543 12.469l-.447-.508a5.8 5.8 0 0 1-1.07-1.786l-.775-2.07a1.19 1.19 0 0 1 2.203-.894l.62 1.415l-.016.06c.347.093 1.157.474 1.547 1.15a.625.625 0 1 0 1.082-.625c-.62-1.075-1.789-1.594-2.305-1.733l1.355-5.06a.894.894 0 1 1 1.727.463l-.925 3.452a.447.447 0 0 0 .863.232l1.272-4.747A.894.894 0 0 1 9.4 2.28L8.128 7.027a.447.447 0 1 0 .863.232l.682-2.546a.928.928 0 0 1 1.793.48l-1.962 7.32a1.93 1.93 0 0 1-.896 1.168a1.94 1.94 0 0 1-1.28.184l-3.64-.728a2.04 2.04 0 0 1-1.145-.668m9.613-10.645a.75.75 0 0 1 1.048.163a3.6 3.6 0 0 1 .689 1.902a.75.75 0 1 1-1.497.097a2.1 2.1 0 0 0-.403-1.114a.75.75 0 0 1 .163-1.048"
                                clip-rule="evenodd" />
                        </svg>
                        <h2>Hand Tracking</h2>
                    </div>
                    <p>Move your hand in front of the camera to control the crosshair. The game tracks your hand
                        position to aim at targets.Make sure only one hand is in the frame.</p>
                </div>
                <div class="row">
                    <div class="control-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="currentColor"
                                d="M528 56c0-13.3-10.7-24-24-24s-24 10.7-24 24v8H32C14.3 64 0 78.3 0 96v112c0 17.7 14.3 32 32 32h10c20.8 0 36.1 19.6 31 39.8L33 440.2c-2.4 9.6-.2 19.7 5.8 27.5S54.1 480 64 480h96c14.7 0 27.5-10 31-24.2L217 352h104.5c23.7 0 44.8-14.9 52.7-37.2l26.7-74.8H432c8.5 0 16.6-3.4 22.6-9.4l22.7-22.6H544c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32h-16zM321.4 304H229l16-64h105l-21 58.7c-1.1 3.2-4.2 5.3-7.5 5.3zM80 128h384c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16" />
                        </svg>
                        <h2>Shooting</h2>
                    </div>
                    <p>Close your hand into a fist to shoot. Quick successive shots can create combos for bonus
                        points.</p>
                </div>
                <div class="row">
                    <div class="control-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-3.3-5.375l3.075-1.35q.125-.05.238-.05t.237.05l3.05 1.35q.35.15.625-.112t.125-.613l-3.525-8.6q-.15-.35-.525-.35t-.525.35L7.95 15.9q-.15.35.125.613t.625.112" />
                        </svg>
                        <h2>Navigation</h2>
                    </div>
                    <p>The game automatically moves you through the tunnel. Focus on aiming and shooting at the skull
                        targets.</p>
                </div>
                <div class="row">
                    <div class="control-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M16 9h-3v5.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 8 14.5a2.5 2.5 0 0 1 2.5-2.5c.57 0 1.08.19 1.5.5V7h4m3-4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" />
                        </svg>
                        <h2>Sound Controls</h2>
                    </div>
                    <p>Toggle sound effects and music using the sound wave icon in the top right corner.</p>
                </div>

                <!-- rules -->
                <div class="row">
                    <div class="rule-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M13.037.057A.75.75 0 0 1 13.5.75V2.5h1.75a.75.75 0 0 1 .53 1.28l-3 3a.75.75 0 0 1-.53.22h-.377a4 4 0 1 1-4.797-2.892a.75.75 0 0 1 .347 1.46A2.5 2.5 0 1 0 10.29 7h-.23L8.53 8.53a.75.75 0 1 1-1.06-1.06L9 5.94V3.75a.75.75 0 0 1 .22-.53l3-3a.75.75 0 0 1 .817-.163M10.5 4.061V5.5h1.44l1.5-1.5H12V2.56zM4.82 2.33a6.5 6.5 0 0 1 3.853-.796a.75.75 0 1 0 .155-1.492a8 8 0 1 0 7.129 7.128a.75.75 0 1 0-1.492.155A6.5 6.5 0 1 1 4.82 2.331Z"
                                clip-rule="evenodd" />
                        </svg>
                        <h2>Objective</h2>
                    </div>
                    <p>Navigate through the tunnel and destroy all skull targets to complete the game. Aim for
                        the fastest completion time!</p>
                </div>
                <div class="row">
                    <div class="rule-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <h2>Scoring System</h2>
                    </div>
                    <ul>
                        <li>Each destroyed skull adds to your total score</li>
                        <li>"Divine" bonus: Destroy 5 skulls in quick succession</li>
                        <li>"Hell Crusher" achievement: Every 20 skulls destroyed</li>
                        <li>Time bonus: Complete the game faster for a better score</li>
                    </ul>
                </div>
                <div class="row">
                    <div class="rule-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36">
                            <path fill="#E0AA94" d="M15.977 9.36h3.789a.78.78 0 0 0 .058-.673l-3.846-4.705V9.36z" />
                            <path fill="#ffffff"
                                d="M12.804 22.277a9 9 0 0 0-.206-.973c-.62-2.223-1.14-3.164-.918-5.494c.29-1.584.273-4.763 4.483-4.268c1.112.131 2.843.927 3.834.91c.567-.01.98-1.157 1.017-1.539c.051-.526-.865-1.42-1.248-1.554a94 94 0 0 0-2.681-.824c-1.039-.301-.985-1.705-1.051-2.205a.6.6 0 0 1 .294-.591c.21-.124.375-.008.579.125l.885.648c.497.426-.874 1.24-.503 1.376c0 0 1.755.659 2.507.796c.412.075 1.834-1.529 1.917-2.47c.065-.74-3.398-4.083-5.867-5.381c-.868-.456-1.377-.721-1.949-.694c-.683.032-.898.302-1.748 1.03C8.302 4.46 4.568 11.577 4.02 13.152c-2.246 6.461-2.597 9.865-2.677 11.788a21 21 0 0 0-.076 1.758c.065 0-1 5 0 6s5.326 1 5.326 1c10 3.989 28.57 2.948 28.57-7.233c0-12.172-18.813-10.557-22.359-4.188" />
                            <path fill="#0e0e0e"
                                d="M20.63 32.078c-3.16-.332-5.628-1.881-5.767-1.97a1 1 0 0 1 1.075-1.687c.04.025 4.003 2.492 7.846 1.467c2.125-.566 3.867-2.115 5.177-4.601a1 1 0 0 1 1.77.932c-1.585 3.006-3.754 4.893-6.447 5.606c-1.257.332-2.502.374-3.654.253" />
                        </svg>
                        <h2>Victory Conditions</h2>
                    </div>
                    <p>Complete the game by destroying all 100 skull targets. As you destroy more skulls, they will
                        appear less frequently - making each shot count even more important.You must eliminate all 100
                        skulls to achieve victory.</p>
                </div>
            </div>
        </main>
    </div>
    `;
} 