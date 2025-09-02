import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

import { Container } from "./di/container.js";
import { GameFacade } from "./facade/GameFacade.js";
import { HttpScoreService } from "./services/HttpScoreService.js";
import { KeyboardInputAdapter } from "./input/KeyboardInputAdapter.js";
import { SimulatedInputAdapter } from "./input/SimulatedInputAdapter.js";

import { defineMenuScene } from "./scenes/menu.js";
import { defineCharacterScene } from "./scenes/characterSelect.js";
import { defineHighScoresScene } from "./scenes/highScores.js";
import { defineGameScene } from "./scenes/game.js";
import { CONFIG } from "./config.js";

const k = kaboom({
  global: false,
  canvas: undefined,
  background: [13, 15, 26],
  debug: true,
});

k.loadSprite("cat", "./assets/cat.png");
k.loadSprite("dog", "./assets/dog.png");
k.loadSprite("capy", "./assets/capy.png");

const container = new Container();
container.register("k", () => k);
container.register("IScoreService", () => new HttpScoreService());
container.register("IInputAdapter", () => new KeyboardInputAdapter());

const game = new GameFacade({
  k: container.resolve("k"),
  scoreService: container.resolve("IScoreService"),
  inputAdapter: container.resolve("IInputAdapter"),
});

defineMenuScene(k, game);
defineCharacterScene(k, game);
defineHighScoresScene(k, game);
defineGameScene(k, game);

game.start();

window.__game = game;
