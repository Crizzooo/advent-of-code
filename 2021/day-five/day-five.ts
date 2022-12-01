import { TEST_INPUT, INPUT } from "./inputs";

const _input = INPUT;

type Coordinate = { x: number, y: number };
class Point {
  x: number;
  y: number;

  constructor( coords: Coordinate) {
    this.x = coords.x;
    this.y = coords.y;
  }
}

class Path {
  start: Point;
  end: Point;
  allPoints: Point[]
  isStraightPath: boolean

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
    this.isStraightPath = Path.determineIfStraightPath(start, end);
    this.allPoints = Path.calculatePointPath(start, end);
  }

  static determineIfStraightPath(start: Point, end: Point) {
    return (start.x === end.x 
      || start.y === end.y);
  }

  static calculatePointPath(start: Point, end: Point) {
    let xValues = Path.explodeRange(start.x, end.x);
    let yValues = Path.explodeRange(start.y, end.y);

    let allPoints: Point[];
    {
      if (!Path.determineIfStraightPath(start, end)) {
        allPoints = xValues.map((val, i) => new Point({ x: xValues[i], y: yValues[i] }));
      } else if (xValues.length > 1) {
        allPoints = xValues.map((val, i) => new Point({ x: val, y: yValues[0]}));
      } else if (yValues.length > 1) {
        allPoints = yValues.map((val, i) => new Point({ x: xValues[0], y: val}));
      } else {
        throw new Error('Could not generate points path');
      }
    }
    return allPoints;
  }

  static explodeRange(start: number, end: number) {
    if (start === end) {
      return [start]
    }
    let direction = 1;
    if (end < start) {
      direction = -1;
    }

    let path = [start]
    let curr = start;
    while (curr !== end) {
      curr += direction;
      path.push(curr);
    }
    return path;
  }
}

class BoardCell {
  paths = 0;
  x: number;
  y: number;

  constructor(coordinate: Coordinate) {
    this.x = coordinate.x;
    this.y = coordinate.y;
  }

  mark() {
    this.paths++;
    return this;
  }
}

class Board {
  MAX_SIZE: number;
  board: BoardCell[][];

  constructor(size: number) {
    this.MAX_SIZE = size;
    this.board = this.generateBoard();
  }

  generateBoard() {
    let size = this.MAX_SIZE;
    let board = [];
    for (let y = 0; y <= size; y++) {
      let row = [];
      for (let x = 0; x <= size; x++) {
        row.push(new BoardCell({ y, x }));
      }
      board.push(row)
    }
    return board;
  }

  iterateCells(iteratee: (cell: BoardCell, index: number) => any) {
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      row.forEach((cell, idx) => iteratee(cell, idx));
    }
  }

  logBoard() {
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      const paths = row.map((cell) => cell.paths);
      console.log(`[${paths.join(", ")}]`);
    }
  }

  markPath(path: Path) {
    console.log('marking path: ', path);
    let allPoints = path.allPoints;
    
    let marked: BoardCell[] = [];
    for (let point of allPoints) {
      const cell = this.board[point.y][point.x];
      cell.mark();
      marked.push(cell);
    }
    return marked;
  }
}

const getInput = () => {
  const str = _input;
  let maxSize = 0;
  const points = str.split('\n').map((s) => {
    let _s = (""+s).trim();
    let [ p1, p2 ] = _s.split(' ->');


    function getXY(str: string) {
      let [_x, _y] = str.split(',');
      if (!_x.length || !_y.length) {
        throw new Error(`Not a valid point: ${str}`)
      }
      let x = Number(_x.trim());
      let y = Number(_y.trim());
      if (x > maxSize) { maxSize = x};
      if (y > maxSize) { maxSize = y};
      return { x, y };
    }
    return [ new Point(getXY(p1)), new Point(getXY(p2))]
  });

  return { points, maxSize };
}

const run = () => {
  const { points, maxSize } = getInput();
  const paths = points.map(([ p1, p2]) => new Path(p1, p2));

  const board = new Board(maxSize);
  const straightPaths = paths; 
  // part 1
  //paths.filter((path) => path.isStraightPath);

  straightPaths.forEach((path) => board.markPath(path));
  
  let sum = 0;
  board.iterateCells((cell) => {
    if (cell.paths >= 2) sum += 1;
  })
  // board.logBoard();
  console.log('Sum: ', sum);

};

console.log(run());