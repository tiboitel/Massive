class KeyboardController {
    constructor(scene, gameObject) {
      this.scene = scene;
      this.gameObject = gameObject;
  
      // Set up keyboard input
      this.keys = scene.input.keyboard.addKeys('Z,Q,S,D,SPACE');

      // Set up key press events
      this.keys.Z.on('down', this.moveUp, this);
      this.keys.Q.on('down', this.moveLeft, this);
      this.keys.S.on('down', this.moveDown, this);
      this.keys.D.on('down', this.moveRight, this);
      this.keys.SPACE.on('down', this.action, this);
  
      // Set up key release events
      this.keys.Z.on('up', this.stopUp, this);
      this.keys.Q.on('up', this.stopLeft, this);
      this.keys.S.on('up', this.stopDown, this);
      this.keys.D.on('up', this.stopRight, this);
      this.keys.SPACE.on('up', this.stopAction, this);
    }

    action() {
      this.gameObject.isFiring = true;
    }

    stopAction() {
      this.gameObject.isFiring = false;
    }
  
    moveUp() {
      this.gameObject.speedY = -this.gameObject.speed;
    }
  
    moveLeft() {
        this.gameObject.speedX = -this.gameObject.speed;;    
    }
  
    moveDown() {
        this.gameObject.speedY = this.gameObject.speed;;
    }
  
    moveRight() {
      this.gameObject.speedX = this.gameObject.speed;;
    }
  
    stopUp() {
      if (this.keys.S.isUp) {
        this.gameObject.speedY = 0;
      }
    }
  
    stopLeft() {
      if (this.keys.D.isUp) {
        this.gameObject.speedX = 0;
    }
    }
  
    stopDown() {
      if (this.keys.Z.isUp) {
        this.gameObject.speedY = 0;
      }
    }

    stopRight() {
        if (this.keys.Q.isUp) {
            this.gameObject.speedX = 0;
        }
    }
}
   
    