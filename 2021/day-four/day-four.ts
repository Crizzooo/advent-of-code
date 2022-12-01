import { TEST_INPUT, INPUT } from "./inputs";

const _input = INPUT;

const getInput = () => {
  const str = _input;

  const [numbers, ...rest] = str.split('\n').map((s) => {
    let _s = (""+s).trim();
    return _s;
  });

  const boards = rest.reduce((boards, val) => {
    if (!val.length) {
      boards.push([] as number[][]);
      return boards;
    }
    let currBoard = boards[boards.length - 1];
    currBoard.push(val.split(' ').filter(Boolean).map(s => Number(s)));
    return boards;
  }, [] as number[][][]);

  return {
    numbers: numbers.split(',').map((s) => Number(s)),
    boards
  };
}

const runPartOne = () => {
  const { numbers, boards } = getInput();
  const { board, lastNum, unmarkedNumbers } = getStatsOnBoardComplete(boards, numbers)
  console.log(lastNum, board, unmarkedNumbers);

  const sumUnmarked = unmarkedNumbers.reduce((a, b) => a + b, 0);

  const allBoardStats = boards.map((board) => getStatsOnBoardComplete([board], numbers)).sort(( { numIdx }, { numIdx: numIdx2}) => numIdx > numIdx2 ? -1 : 1);
  const lastToFill = allBoardStats[0];

  return {
    partOne: sumUnmarked * lastNum,
    partTwo: lastToFill.unmarkedNumbers.reduce((a, b) => a + b, 0) * lastToFill.lastNum 
  };
}

const getColumns = (board: number[][]) => {
  return board.reduce((acc, val, i, arr) => {
    const col: number[] = [];
    for (let row of board) {
      col.push(row[i])
    }
    acc.push(col)
    return acc;
  }, [] as number[][]);
}

const getStatsOnBoardComplete = (boards: number[][][], numbers: number[]) => {

  let numHash: { [key: string]: any } = {};

  
  const isInHash = (num: number) => num in numHash;
  for (let [numIdx, num] of numbers.entries()) {

    numHash[num] = true;
    for (const [idx, board] of boards.entries()) {
      const rows = board;
      const columns = getColumns(board);
      // Detects match on every number in either a row or a column
      if (rows.some((row) => row.every(isInHash)) || columns.some((col) => col.every(isInHash))) {
        const unmarkedNumbers = board.reduce((acc, row) => {
          for (const num of row) {
            if (!isInHash(num)) {
              acc.push(num)
            }
          }
          return acc;
        }, [] as number[]);
        const winning = [ ...rows, ...columns ].filter((row) => row.every(isInHash));
        return { board, lastNum: num, numIdx, boardIndex: idx, unmarkedNumbers, markedNumbers: numbers.filter(isInHash), winning };
      }
    }

  }

  throw new Error('no winning board');
}



console.log(runPartOne());