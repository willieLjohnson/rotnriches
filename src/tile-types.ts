export interface Graphic {
  chars: string;
  fg: string;
  bg: string;
}

export interface Tile {
  walkable: boolean;
  transparent: boolean;
  dark: Graphic;
}

export const FLOOR_TILE: Tile = {
  walkable: false,
  transparent: true,
  dark: { chars: ' ', fg: '#fff', bg: '#333377' },
};

export const WALL_TILE: Tile = {
  walkable: false,
  transparent: false,
  dark: { chars: ' ', fg: '#fff', bg: '#000066' },
};
