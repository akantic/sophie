import Player from "./Player";
import User from "./User";
import { Sprite, Texture, interaction } from "pixi.js";
import { Viewport, ViewportOptions } from 'pixi-viewport'
import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts"
import { Ticker } from "pixi.js";
import background from "../sprites/grass_background_1.jpg";

class GameWorld extends Viewport {
  
  private readonly players: Player[];
  private readonly _user: User;
  private readonly appTicker: Ticker; 

  get user(): User {
    return this._user;
  }

  initializeWorld() {
    this.addChild(new Sprite(Texture.from(background)))
  }

  initializeUser() {
    this.addChild(this.user);
    this.appTicker.add((d) => {
      this.user.playerController.movement(d);
    })
    this.follow(this.user).bounce({ sides: "all", time: 0, underflow: "center" });
  }

  initializeInteractivity() {
    this.on("mousemove", (e: interaction.InteractionEvent) => {
      this.user.rotation = Math.atan2(e.data.global.y - this.user.getGlobalPosition().y, e.data.global.x - this.user.getGlobalPosition().x);
    });

    this.on("mousedown", (e: interaction.InteractionEvent) => {
      this.user.playerController.shoot();
    })
  }

  constructor (options: ViewportOptions, appTicker: Ticker) {
    super( { ...options, worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
    this.players = [];
    this._user = new User();
    this.appTicker = appTicker;
    
    this.initializeWorld();
    this.initializeUser();
    this.initializeInteractivity();
  }


    
  
}

export default GameWorld;