import { FLOOR_TILE, WALL_TILE, Tile } from "./tile-types";
import { GameMap } from "./game-map";
import { Display } from "rot-js";
import { Entity, spawnOrc, spawnTroll } from "./entity";

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

  intersects(other: RectangularRoom): boolean {
    return (
      this.x <= other.x + other.width &&
      this.x + this.width >= other.x &&
      this.y <= other.y + other.height &&
      this.y + this.width >= other.y
    );
  }

  public get center(): [number, number] {
    const centerX = this.x + Math.floor(this.width / 2);
    const centerY = this.y + Math.floor(this.height / 2);
    return [centerX, centerY];
  }

  get bounds(): Bounds {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height,
    };
  }
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  mapWidth: number,
  mapHeight: number,
  maxRooms: number,
  minSize: number,
  maxSize: number,
  maxMonsters: number,
  player: Entity,
  display: Display
): GameMap {
  const dungeon = new GameMap(mapWidth, mapHeight, display, [player]);
  const rooms: RectangularRoom[] = [];

  for (let count = 0; count < maxRooms; count++) {
    const width = generateRandomNumber(minSize, maxSize);
    const height = generateRandomNumber(minSize, maxSize);

    const x = generateRandomNumber(0, mapWidth - width - 1);
    const y = generateRandomNumber(0, mapHeight - height - 1);

    const newRoom = new RectangularRoom(x, y, width, height);

    if (rooms.some((r) => r.intersects(newRoom))) {
      continue;
    }

    dungeon.addRoom(x, y, newRoom.tiles);
    placeEntities(newRoom, dungeon, maxMonsters);
    rooms.push(newRoom);
  }

  const startPoint = rooms[0].center;
  player.x = startPoint[0];
  player.y = startPoint[1];

  for (let index = 0; index < rooms.length - 1; index++) {
    const first = rooms[index];
    const second = rooms[index + 1];

    for (let tile of connectRooms(first, second)) {
      dungeon.tiles[tile[1]][tile[0]] = { ...FLOOR_TILE };
    }
  }

  return dungeon;
}

function placeEntities(
  room: RectangularRoom,
  dungeon: GameMap,
  maxMonsters: number
) {
  const numberOfMonstersToAdd = generateRandomNumber(0, maxMonsters);
  for (let i = 0; i < numberOfMonstersToAdd; i++) {
    const bounds = room.bounds;
    const x = generateRandomNumber(bounds.x1 + 1, bounds.x2 - 1);
    const y = generateRandomNumber(bounds.y1 + 1, bounds.y2 - 1);
    if (!dungeon.entities.some((e) => e.x == x && e.y == y)) {
      if (Math.random() < 0.8) {
        dungeon.entities.push(spawnOrc(x, y));
      } else {
        dungeon.entities.push(spawnTroll(x, y));
      }
    }
  }
}

interface Bounds {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
