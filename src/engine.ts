import * as ROT from "rot-js";

import { generateDungeon } from "./procgen";
import { handleInput } from "./input-handler";
import { Entity } from "./entity";
import { GameMap } from "./game-map";

export class Engine {
  public static readonly WIDTH = 120;
  public static readonly HEIGHT = 60;
  public static readonly MAX_ROOMS = 200;
  public static readonly MIN_ROOM_SIZE = 1;
  public static readonly MAX_ROOM_SIZE = 20;
  public static readonly MAP_WIDTH = 115;
  public static readonly MAP_HEIGHT = 55;
  public static readonly MAX_MONSTERS_PER_ROOM = 2;

  display: ROT.Display;
  gameMap: GameMap;

  player: Entity;

  constructor(player: Entity) {
    this.player = player;

    this.display = new ROT.Display({
      width: Engine.WIDTH,
      height: Engine.HEIGHT,
      forceSquareRatio: true,
    });

    this.gameMap = generateDungeon(
      Engine.MAP_WIDTH,
      Engine.MAP_HEIGHT,
      Engine.MAX_ROOMS,
      Engine.MIN_ROOM_SIZE,
      Engine.MAX_ROOM_SIZE,
      Engine.MAX_MONSTERS_PER_ROOM,
      player,
      this.display
    );

    const container = this.display.getContainer()!;
    document.body.appendChild(container);

    window.addEventListener("keydown", (event) => {
      this.update(event);
    });
    this.gameMap.updateFov(this.player);
    this.render();
  }

  handleEnemyTurns() {
    this.gameMap.nonPlayerEntities.forEach((e) => {
      console.log(e.name);
    });
  }

  render() {
    this.gameMap.render();
  }

  update(event: KeyboardEvent) {
    this.display.clear();
    const action = handleInput(event);

    if (action) {
      action.perform(this, this.player);
    }
    this.handleEnemyTurns();
    this.gameMap.updateFov(this.player);
    this.render();
  }
}
