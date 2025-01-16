import * as THREE from "three";

export class HandControls {
  constructor(mediaPipeHands) {
    this.mediaPipeHands = mediaPipeHands;
  }

  isHandVisible() {
    return this.mediaPipeHands.results && 
           this.mediaPipeHands.results.multiHandLandmarks && 
           this.mediaPipeHands.results.multiHandLandmarks.length > 0;
  }

  getHandPosition() {
    if (!this.isHandVisible()) {
      return { x: 0.5, y: 0.5 };
    }

    // Get index finger tip position (landmark 8)
    const landmarks = this.mediaPipeHands.results.multiHandLandmarks[0];
    const indexTip = landmarks[8];
    
    return {
      x: indexTip.x,
      y: indexTip.y
    };
  }

  isHandClosed() {
    if (!this.isHandVisible()) return false;

    const landmarks = this.mediaPipeHands.results.multiHandLandmarks[0];
    
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const palm = landmarks[0];

    const distanceThreshold = 0.15;

    const indexDist = this.distance(indexTip, palm);
    const middleDist = this.distance(middleTip, palm);
    const ringDist = this.distance(ringTip, palm);
    const pinkyDist = this.distance(pinkyTip, palm);

    // Add some debug logging
    // console.log('Hand distances:', {
    //   index: indexDist,
    //   middle: middleDist,
    //   ring: ringDist,
    //   pinky: pinkyDist
    // });

    // Hand is considered closed if all fingertips are close to palm
    return indexDist < distanceThreshold && 
           middleDist < distanceThreshold && 
           ringDist < distanceThreshold && 
           pinkyDist < distanceThreshold;
  }

  distance(point1, point2) {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + 
      Math.pow(point1.y - point2.y, 2) + 
      Math.pow(point1.z - point2.z, 2)
    );
  }
}
