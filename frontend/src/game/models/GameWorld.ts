import { Sprite, Texture, interaction, Ticker } from "pixi.js";
import { Viewport, ViewportOptions } from "pixi-viewport";
import { EngineConfig } from "@sophie/shared";

import Player from "./Player";
import User from "./User";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts";
import { lerp } from "../utils";
import background from "../sprites/grass_background_1.jpg";
import GameObject from "./GameObject";

class GameWorld extends Viewport {
  private static instance: GameWorld;

  players: { [key: string]: Player };

  playersIterable: Player[];

  user: User;

  engineTicker: Ticker;

  renderTicker: Ticker;

  engineConfig: EngineConfig;

  static create = (options: ViewportOptions, renderTicker: Ticker) => {
    GameWorld.instance = new GameWorld(options, renderTicker);
    return GameWorld.instance;
  };

  static get = () => {
    return GameWorld.instance;
  };

  private constructor(options: ViewportOptions, renderTicker: Ticker) {
    super({ ...options, worldWidth: WORLD_WIDTH, worldHeight: WORLD_HEIGHT });
    this.renderTicker = renderTicker;
    this.players = {};
    this.playersIterable = [];
  }

  initializeEngine(engineConfig: EngineConfig) {
    const engineTicker = new Ticker();
    engineTicker.autoStart = true;
    engineTicker.minFPS = engineConfig.updateRate;
    engineTicker.maxFPS = engineConfig.updateRate;
    this.engineTicker = engineTicker;
    this.engineConfig = engineConfig;
  }

  initializeWorld() {
    this.addChild(new Sprite(Texture.from(background)));
  }

  initializeUser(id: string) {
    this.user = new User(id);
    this.addPlayer(this.user);
    this.addChild(this.user);
    this.initializeInteractivity();
    this.engineTicker.add(() => {
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
    this.addGameObject(player);
  };

  removePlayer = (playerId: string) => {
    this.removeChild(this.players[playerId]);
    delete this.players[playerId];
    this.playersIterable = Object.values(this.players);
  };

  getPlayer = (playerId: string) => {
    return this.players[playerId];
  };

  addGameObject = (go: GameObject) => {
    const dt = 1 - 0.01 ** (1 / this.engineConfig.updateRate);
    this.renderTicker.add(() => {
      go.position = lerp(go.position, go.actualPosition, dt);
    });
    this.addChild(go);
  };
}

export default GameWorld;
