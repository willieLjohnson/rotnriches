export class Entity {
  x: number;
  y: number;
  fg: string;
  chars: string;
  bg: string;

  constructor(
    x: number,
    y: number,
    chars: string,
    fg: string = "#fff",
    bg: string = "#000"
  ) {
    this.x = x;
    this.y = y;
    this.fg = fg;
    this.chars = chars;
    this.bg = bg;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}
