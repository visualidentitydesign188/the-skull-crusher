export class MediaPipeHands {
  constructor() {
    this.hands = null;
    this.camera = null;
    this.results = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      await this.loadMediaPipeScripts();

      const { Hands } = window;
      const { Camera } = window;

      if (!Hands || !Camera) {
        console.error('MediaPipe libraries not loaded properly');
        return;
      }

      this.hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      this.hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.5
      });

      this.hands.onResults((results) => {
        this.results = results;
      });

      // Use existing video element
      const videoElement = document.getElementById('input-video');
      if (!videoElement) {
        console.error('Video element not found');
        return;
      }

      this.camera = new Camera(videoElement, {
        onFrame: async () => {
          if (this.hands) {
            await this.hands.send({ image: videoElement });
          }
        },
        width: 1280,
        height: 720
      });

      await this.camera.start();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing MediaPipe:', error);
      this.isInitialized = false;
    }
  }

  async loadMediaPipeScripts() {
    const scripts = [
      'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
      'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'
    ];

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    try {
      await Promise.all(scripts.map(loadScript));
    } catch (error) {
      console.error('Error loading MediaPipe scripts:', error);
      throw error;
    }
  }

  update() {
    // This method is called every frame
    // The results are automatically updated through onResults callback
    if (!this.isInitialized) {
      return false;
    }
  }
}
