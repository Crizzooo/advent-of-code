import { INPUT } from "./input";


const SAMPLE_INPUT = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

const problem = (input: string, alllowLog: boolean) => {
  

  // On each round
  let rows = input.trim().split("\n").map((row) => row.trim().split(""));

  const rowCount = rows.length;
  const colCount = rows[0].length;

  const getNextCell = (args: { rowIdx: number, colIdx: number, }): { rowIdx: number; colIdx: number } | null => { 
    const { rowIdx, colIdx } = args;
    let direction = rows[rowIdx][colIdx];
    if (direction === ">") {
      const nextCol = colIdx === colCount - 1 ? 0 : colIdx + 1;
      const nextCell = { rowIdx, colIdx: nextCol }
      // console.log('nextCell for cell', { rowIdx, colIdx, cur: rows[rowIdx][colIdx], nextCell });
      return nextCell;
    } else if (direction == "v") {
      const nextRow = rowIdx === rowCount - 1 ? 0 : rowIdx + 1;
      const nextCell = { rowIdx: nextRow, colIdx: colIdx };
      // console.log('nextCell for cell', { rowIdx, colIdx, cur: rows[rowIdx][colIdx], nextCell });
      return nextCell;
    } else {
      return null;
    }
  }

  const canMove = (args: { rowIdx: number, colIdx: number, }) => {
    const { rowIdx, colIdx } = args;
    const nextCell = getNextCell({ rowIdx, colIdx });
    if (nextCell === null) return false;

    const nextCellVal = rows[nextCell.rowIdx][nextCell.colIdx];
    if (nextCellVal === ".") {
      return true;
    } else {
      return false;
    }
  };
  
  const logRows = () => {
    if (!alllowLog) return;
    console.log(`[`);
    rows.forEach((row) => console.log(row.join("")))
    console.log(`]`);
  }

  const processDirection = (direction: ">" | "v") => {
    let fishDidMove = false;
    // Store the cells that are able to move
    const moveQueue: { rowIdx, colIdx }[] = [];
    for (let colIdx = colCount - 1; colIdx >= 0; colIdx--) {
      for (let [rowIdx, row] of rows.entries()) {

          // 1. Move each member of herd and direction that is able to
          // to process each >, we should scan from the downmost column and work back upwards
          let currVal = row[colIdx];
          if (canMove({ rowIdx, colIdx }) && currVal === direction) {
            // console.log({ currVal, rowIdx, colIdx, canMove: true});
            // store the ones that can move
            moveQueue.push({ rowIdx, colIdx });
          }

      }
    }

    if (moveQueue.length) {
      fishDidMove = true;
    }
    // process moves
    for (const { rowIdx, colIdx} of moveQueue) {
        const curr = rows[rowIdx][colIdx];
        const nextCell = getNextCell({ rowIdx, colIdx });
        if (!nextCell) {
          throw new Error('how?');
        }
        // replace current with "."
        rows[rowIdx][colIdx] = ".";
        // replace nextCell with current direction
        rows[nextCell.rowIdx][nextCell.colIdx] = curr;
    }
    return fishDidMove;
  }

  let fishDidMove = true;
  let count = 0;
  
  console.log('start')
  logRows();
  while (fishDidMove) {
    // reset
    fishDidMove = false;

    // Handle the eastern herd
    if (processDirection(">")) {
      fishDidMove = true;
    }

    // Handle the southern herd
    if (processDirection("v")) {
      fishDidMove = true;
    }

    console.log(`after round ${count}`, fishDidMove);
    
    logRows();

    // 5. increment round
    count++;
  }


  return count;
};


// console.log('sample: ', problem(SAMPLE_INPUT));
console.log('input: ', problem(INPUT, false));

