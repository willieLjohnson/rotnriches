export class Entity {
  constructor(
    public x: number,
    public y: number,
    public chars: string,
    public fg: string = "#fff",
    public bg: string = "#000",
    public name: string = "<Unnamed>",
    public blocksMovement: boolean = false
  ) {}

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}

export function spawnPlayer(x: number, y: number): Entity {
  return new Entity(x, y, "[]", "#ffff00", "#000", "Player", true);
}

export function spawnOrc(x: number, y: number): Entity {
  return new Entity(x, y, "()", "#ff0000", "#000", "Orc", true);
}

export function spawnTroll(x: number, y: number): Entity {
  return new Entity(x, y, "{}", "#00ff00", "#000", "Troll", true);
}
