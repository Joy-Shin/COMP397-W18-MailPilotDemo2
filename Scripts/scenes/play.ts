module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _ocean: objects.Ocean;
    private _plane: objects.Plane;
    private _island: objects.Island;
    private _clouds: objects.Cloud[];
    private _cloudNum: number;

    private _engineSound:createjs.AbstractSoundInstance;

    private _scoreBoard: managers.ScoreBoard;

    // Public Properties


    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods



    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      // setup background sound
      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.3;

      this._cloudNum = 3;
      this._ocean = new objects.Ocean(this.assetManager);
      this._plane = new objects.Plane(this.assetManager);
      this._island = new objects.Island(this.assetManager);

      // create the cloud array
      this._clouds = new Array<objects.Cloud>();

      // add clouds to the array
      for (let count = 0; count < this._cloudNum; count++) {
         this._clouds[count] =  new objects.Cloud(this.assetManager);
      }

      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoardManager = this._scoreBoard;

      this.Main();
    }

    public Update(): void {
      this._ocean.Update();
      this._plane.Update();
      this._island.Update();

      // check collision between plane and island
      managers.Collision.Check(this._plane, this._island);

      // update each cloud
      this._clouds.forEach(cloud => {
        cloud.Update();
        // check collision between pland and the current cloud
        managers.Collision.Check(this._plane, cloud);
      });

      if(this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.OVER;
      }
    }

    // This is where the fun happens
    public Main(): void {
      // add ocean to the scene
      this.addChild(this._ocean);

      // add island to this scene
      this.addChild(this._island);

      // add plane to this scene
      this.addChild(this._plane);

      // add clouds to the scene
      this._clouds.forEach(cloud => {
        this.addChild(cloud);
      });

      // add the Lives Label
      this.addChild(this._scoreBoard.LivesLabel);

      // add the Score Label
      this.addChild(this._scoreBoard.ScoreLabel);

    }
  }
}
