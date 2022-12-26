import { FLOOR_TILE, WALL_TILE, Tile } from "./tile-types";
import { GameMap } from "./game-map";
import { Display } from "rot-js";

class RectangularRoom {
  tiles: Tile[][];

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.tiles = new Array(this.height);
    this.buildRoom();
  }

  buildRoom() {
    for (let y = 0; y < this.height; y++) {
      const row = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        const isWall =
          x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1;
        row[x] = isWall ? { ...WALL_TILE } : { ...FLOOR_TILE };
      }
      this.tiles[y] = row;
    }
  }

  public get center(): [number, number] {
    const centerX = this.x + Math.floor(this.width / 2);
    const centerY = this.y + Math.floor(this.height / 2);
    return [centerX, centerY];
  }
}

function* connectRooms(
  a: RectangularRoom,
  b: RectangularRoom
): Generator<[number, number], void, void> {
  let current = a.center;
  const end = b.center;

  let horizontal = Math.random() < 0.5;
  let axisIndex = horizontal ? 0 : 1;

  while (current[0] !== end[0] || current[1] !== end[1]) {
    const direction = Math.sign(end[axisIndex] - current[axisIndex]);
    if (direction !== 0) {
      current[axisIndex] += direction;
      yield current;
    } else {
      axisIndex = axisIndex === 0 ? 1 : 0;
      yield current;
    }
  }
}

export function generateDungeon(
  width: number,
  height: number,
  display: Display
): GameMap {
  const dungeon = new GameMap(width, height, display);
  const room1 = new RectangularRoom(20, 15, 10, 15);
  const room2 = new RectangularRoom(35, 15, 10, 15);

  dungeon.addRoom(room1.x, room1.y, room1.tiles);
  dungeon.addRoom(room2.x, room2.y, room2.tiles);

  for (let tile of connectRooms(room1, room2)) {
    dungeon.tiles[tile[1]][tile[0]] = { ...FLOOR_TILE };
  }

  return dungeon;
}
