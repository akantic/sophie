import Player from "./Player";
import User from "./User";
import { Sprite, Texture, interaction } from "pixi.js";
import { Viewport, ViewportOptions } from 'pixi-viewport'
import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts"
import { Ticker } from "pixi.js";
import background from "../sprites/grass_background_1.jpg";

class GameWorld extends Viewport {

  private static instance: GameWorld;
  
  private _players: { [key: string]: Player }; 

  private _playersIterable: Player[];

  get players(): { [key: string]: Player } {
    return this._players;
  }

  get playersI(): Player[] {
    return this._playersIterable;
  }

  private readonly _user: User;
  private readonly appTicker: Ticker; 

  get user(): User {
    return this._user;
  }

  static create = (options: ViewportOptions, appTicker: Ticker) => {
    GameWorld.instance = new GameWorld(options, appTicker);
    return GameWorld.instance;
  }

  static get = () => {
    return GameWorld.instance;
  }

  constructor (options: ViewportOptions, appTicker: Ticker) {
    super( { ...options, worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
    this._players = {};
    this._playersIterable = [];
    this._user = new User("JURE");
    this.addPlayer(this._user);
    this.appTicker = appTicker;
    
    this.initializeWorld();
    this.initializeUser();
    this.initializeInteractivity();
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

  addPlayer = (player: Player) => {
    this._players[player.id] = player;
    this._playersIterable = Object.values(this._players);
  }

  removePlayer = (playerId: string) => {
    delete this._players[playerId];
    this._playersIterable = Object.values(this._players);
  }

  getPlayer = (playerId: string) => {
    return this._players[playerId];
  }

}

export default GameWorld;