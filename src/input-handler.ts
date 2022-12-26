export interface Action { }

export class MovementAction implements Action {
  dx: number;
  dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }
}

interface MovementMap {
  [key: string]: Action;
}

const MoveKeys: MovementMap = {
  ArrowUp: new MovementAction(0, -1),
  w: new MovementAction(0, -1),
  ArrowDown: new MovementAction(0, 1),
  s: new MovementAction(0, 1),
  ArrowLeft: new MovementAction(-1, 0),
  a: new MovementAction(-1, 0),
  ArrowRight: new MovementAction(1, 0),
  d: new MovementAction(1, 0),
};

export function handleInput(event: KeyboardEvent): Action {
  return MoveKeys[event.key];
}
