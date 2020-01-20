import Player from "./Player";
import User from "./User";
import { Sprite, Texture, interaction } from "pixi.js";
import { Viewport, ViewportOptions } from 'pixi-viewport'
import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts"
import { lerp } from "../utils";
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

  private _user!: User;
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


  constructor(options: ViewportOptions, appTicker: Ticker) {
    super({ ...options, worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
    this._players = {};
    this._playersIterable = [];
    this.appTicker = appTicker;

    this.initializeWorld();
  }

  initializeWorld() {
    this.addChild(new Sprite(Texture.from(background)))
    this.appTicker.add((d) => {
      this.playersI.forEach(p => {
        p.position = lerp(p.position, p.actualPosition, 0.15);
      });
    });
  }

  initializeUser(id: string) {
    this._user = new User(id);
    this.addPlayer(this.user);
    this.addChild(this.user);
    this.initializeInteractivity();
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
      this.user.playerController.mouseDown = true;
    })

    this.on("mouseup", (e: interaction.InteractionEvent) => {
      this.user.playerController.mouseDown = false;
    })
  }

  createPlayer = (playerId: string) => {
    this.addPlayer(new Player(playerId));
  }

  addPlayer = (player: Player) => {
    this._players[player.id] = player;
    this._playersIterable = Object.values(this._players);
    this.addChild(player);
  }

  removePlayer = (playerId: string) => {
    this.removeChild(this._players[playerId]);
    delete this._players[playerId];
    this._playersIterable = Object.values(this._players);
  }

  getPlayer = (playerId: string) => {
    return this._players[playerId];
  }

  addToTicker = (f: (d: number) => void) => {
    this.appTicker.add((d) => f(d));
  }

}

export default GameWorld;