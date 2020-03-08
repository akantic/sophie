import { TilingSprite, Texture, interaction, Ticker } from "pixi.js";
import { Viewport, ViewportOptions } from "pixi-viewport";
import { EngineConfig, WorldSize } from "@sophie/shared";

import Player from "./Player";
import User from "./User";
import { lerp } from "../utils";
import background from "../sprites/grass_background_1.jpg";
import GameObject from "./GameObject";

class GameWorld extends Viewport {
  private static instance: GameWorld;

  gameObjects: { [key: string]: GameObject };

  gameObjectsIterable: GameObject[];

  players: { [key: string]: Player };

  playersIterable: Player[];

  user: User;

  engineTicker: Ticker;

  renderTicker: Ticker;

  engineConfig: EngineConfig;

  static create = (
    options: ViewportOptions,
    renderTicker: Ticker,
    worldSize: WorldSize
  ) => {
    GameWorld.instance = new GameWorld(options, renderTicker, worldSize);
    return GameWorld.instance;
  };

  static get = () => {
    return GameWorld.instance;
  };

  private constructor(
    options: ViewportOptions,
    renderTicker: Ticker,
    worldSize: WorldSize
  ) {
    super({
      ...options,
      worldWidth: worldSize.width,
      worldHeight: worldSize.height
    });
    this.renderTicker = renderTicker;
    this.players = {};
    this.playersIterable = [];
    this.gameObjects = {};
  }

  initializeEngine(engineConfig: EngineConfig) {
    const engineTicker = new Ticker();
    engineTicker.autoStart = true;
    engineTicker.minFPS = engineConfig.updateRate;
    engineTicker.maxFPS = engineConfig.updateRate;
    this.engineTicker = engineTicker;
    this.engineConfig = engineConfig;
  }

  initializeWorld(worldSize: WorldSize) {
    const backgroundTexture = Texture.from(background);
    const backgroundSprite = new TilingSprite(
      backgroundTexture,
      worldSize.width,
      worldSize.height
    );
    this.addChild(backgroundSprite);
    const dt = 1 - 10e-7 ** (1 / this.engineConfig.updateRate);
    this.renderTicker.add(() => {
      this.gameObjectsIterable.forEach(go => {
        go.position = lerp(go.position, go.actualPosition, dt);
      });
    });
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
    delete this.players[playerId];
    this.playersIterable = Object.values(this.players);
    this.destroyGameObject(playerId);
  };

  getPlayer = (playerId: string) => {
    return this.players[playerId];
  };

  addGameObject = (go: GameObject) => {
    this.gameObjects[go.id] = go;
    this.gameObjectsIterable = Object.values(this.gameObjects);
    this.addChild(go);
  };

  destroyGameObject = (id: string) => {
    const gameObject = this.gameObjects[id];
    this.removeChild(gameObject);
    delete this.gameObjects[id];
    this.gameObjectsIterable = Object.values(this.gameObjects);
  };
}

export default GameWorld;
