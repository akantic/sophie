import GameLoop from "./core/GameLoop";

import engineRenderer from "./debug/EngineRenderer";

GameLoop.get().start();

engineRenderer.run(GameLoop.get().engine, 200);
