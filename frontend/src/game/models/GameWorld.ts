import { Sprite, Texture, interaction, Ticker } from "pixi.js";
import { Viewport, ViewportOptions } from "pixi-viewport";

import Player from "./Player";
import User from "./User";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts";
import { lerp } from "../utils";
import background from "../sprites/grass_background_1.jpg";

class GameWorld extends Viewport {
  private static instance: GameWorld;

  players: { [key: string]: Player };

  playersIterable: Player[];

  user: User;

  private readonly appTicker: Ticker;

  static create = (options: ViewportOptions, appTicker: Ticker) => {
    GameWorld.instance = new GameWorld(options, appTicker);
    return GameWorld.instance;
  };

  static get = () => {
    return GameWorld.instance;
  };

  constructor(options: ViewportOptions, appTicker: Ticker) {
    super({ ...options, worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
    this.players = {};
    this.playersIterable = [];
    this.appTicker = appTicker;

    this.initializeWorld();
  }

  initializeWorld() {
    this.addChild(new Sprite(Texture.from(background)));
    this.appTicker.add(() => {
      this.playersIterable.forEach(p => {
        p.position = lerp(p.position, p.actualPosition, 0.15);
      });
    });
  }

  initializeUser(id: string) {
    this.user = new User(id);
    this.addPlayer(this.user);
    this.addChild(this.user);
    this.initializeInteractivity();
    this.appTicker.add(() => {
      this.user.playerController.movement();
    });
    this.follow(this.user).bounce({
      sides: "all",
      time: 0,
      underflow: "center"
    });
  }

  initializeInteractivity() {
    this.on("mousemove", (e: interaction.InteractionEvent) => {
      this.user.rotation = Math.atan2(
        e.data.global.y - this.user.getGlobalPosition().y,
        e.data.global.x - this.user.getGlobalPosition().x
      );
    });

    this.on("mousedown", () => {
      this.user.playerController.mouseDown = true;
    });

    this.on("mouseup", () => {
      this.user.playerController.mouseDown = false;
    });
  }

  createPlayer = (playerId: string) => {
    this.addPlayer(new Player(playerId));
  };

  addPlayer = (player: Player) => {
    this.players[player.id] = player;
    this.playersIterable = Object.values(this.players);
    this.addChild(player);
  };

  removePlayer = (playerId: string) => {
    this.removeChild(this.players[playerId]);
    delete this.players[playerId];
    this.playersIterable = Object.values(this.players);
  };

  getPlayer = (playerId: string) => {
    return this.players[playerId];
  };

  addToTicker = (f: (d: number) => void) => {
    this.appTicker.add(d => f(d));
  };
}

export default GameWorld;
