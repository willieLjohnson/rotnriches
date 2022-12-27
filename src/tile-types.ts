export interface Graphic {
  chars: string;
  fg: string;
  bg: string;
}

export interface Tile {
  walkable: boolean;
  transparent: boolean;
  visible: boolean;
  seen: boolean;
  dark: Graphic;
  light: Graphic;
}

export const FLOOR_TILE: Tile = {
  walkable: true,
  transparent: true,
  visible: false,
  seen: false,
  dark: { chars: " ", fg: "#fff", bg: "#333377" },
  light: { chars: " ", fg: "#fff", bg: "#c8b432" },
};

export const WALL_TILE: Tile = {
  walkable: false,
  transparent: false,
  visible: false,
  seen: false,
  dark: { chars: " ", fg: "#fff", bg: "#000066" },
  light: { chars: " ", fg: "#fff", bg: "#826e32" },
};
