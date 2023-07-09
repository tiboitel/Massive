class KeyboardController {
    constructor(scene, gameObject) {
      this.scene = scene;
      this.gameObject = gameObject;
  
      // Set up keyboard input
      this.keys = scene.input.keyboard.addKeys('Z,Q,S,D,W,A,SPACE');

      // Set up key press events
      this.keys.Z.on('down', this.moveUp, this);
      this.keys.W.on('down', this.moveUp, this);
      this.keys.Q.on('down', this.moveLeft, this);
      this.keys.A.on('down', this.moveLeft, this);
      this.keys.S.on('down', this.moveDown, this);
      this.keys.D.on('down', this.moveRight, this);
      this.keys.SPACE.on('down', this.action, this);
  
      // Set up key release events
      this.keys.Z.on('up', this.stopUp, this);
      this.keys.W.on('up', this.stopUp, this);
      this.keys.Q.on('up', this.stopLeft, this);
      this.keys.A.on('up', this.stopLeft, this);
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
      this.gameObject.body.setVelocityY(-this.gameObject.speed);
    }
  
    moveLeft() {
       this.gameObject.body.setVelocityX(-this.gameObject.speed);  
    }
  
    moveDown() {
       this.gameObject.body.setVelocityY(this.gameObject.speed);
    }
  
    moveRight() {
      this.gameObject.body.setVelocityX(this.gameObject.speed);
    }
  
    stopUp() {
      if (this.keys.S.isUp) {
        this.gameObject.body.setVelocityY(0);
      }
    }
  
    stopLeft() {
      if (this.keys.D.isUp) {
       this.gameObject.body.setVelocityX(0);
    }
  }
  
    stopDown() {
      if (this.keys.Z.isUp) {
        // this.gameObject.speedY = 0;
        this.gameObject.body.setVelocityY(0);
      }
    }

    stopRight() {
        if (this.keys.Q.isUp) {
            this.gameObject.body.setVelocityX(0);
        }
    }
}
   
    