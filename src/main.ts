import { Entity } from "./entity";
import { Engine } from "./engine";

declare global {
  interface Window {
    engine: Engine;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const player = new Entity(Engine.WIDTH / 2, Engine.HEIGHT / 2, "[]", "#ff0");
  const npc = new Entity(Engine.WIDTH / 2 - 5, Engine.HEIGHT / 2, "{}", "#f00");
  const entities = [player, npc];
  window.engine = new Engine(entities, player);
});
