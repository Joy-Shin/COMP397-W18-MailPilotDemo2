var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            // setup background sound
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;
            this._engineSound.volume = 0.3;
            this._cloudNum = 3;
            this._ocean = new objects.Ocean(this.assetManager);
            this._plane = new objects.Plane(this.assetManager);
            this._island = new objects.Island(this.assetManager);
            // create the cloud array
            this._clouds = new Array();
            // add clouds to the array
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud(this.assetManager);
            }
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoardManager = this._scoreBoard;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._plane.Update();
            this._island.Update();
            // check collision between plane and island
            managers.Collision.Check(this._plane, this._island);
            // update each cloud
            this._clouds.forEach(function (cloud) {
                cloud.Update();
                // check collision between pland and the current cloud
                managers.Collision.Check(_this._plane, cloud);
            });
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop();
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add ocean to the scene
            this.addChild(this._ocean);
            // add island to this scene
            this.addChild(this._island);
            // add plane to this scene
            this.addChild(this._plane);
            // add clouds to the scene
            this._clouds.forEach(function (cloud) {
                _this.addChild(cloud);
            });
            // add the Lives Label
            this.addChild(this._scoreBoard.LivesLabel);
            // add the Score Label
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map