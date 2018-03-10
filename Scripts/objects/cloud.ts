module objects {
  export class Cloud extends objects.GameObject {
    // Private Instance Variables


    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "cloud");
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset():void {
      this.x = (Math.random() * (640 - this.width)) + this.halfWidth;
      this.y = -this.height;
      this._dx = (Math.random() * 4) - 2;
      this._dy = (Math.random() * 5) + 5;
    }

    public CheckBounds():void {
      // check the bottom border
      if(this.y >= 480 + this.height) {
        this.Reset();
      }

    }

    public Move():void {
      this.y += this._dy;
      this.x += this._dx;
    }

    public Start():void {
      this.Reset();
    }

    // Updates the Object every frame
    public Update():void {
      this.Move();
      this.CheckBounds();
    }

  }
}
