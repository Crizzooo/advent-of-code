import fs from 'fs';


type Command = {
  amount: number;
  startMove: number;
  endMove: number;
};

const problem = (input: { commands: Command[], stacks: string[][] }, pt: 'part-1' | 'part-2' ) => {
  // Process Commands
  input.commands.forEach((command, i) => {
    if (pt === 'part-1') {
      processCommandPart1(command, input.stacks)
    } else {
      processCommandPart2(command, input.stacks);
    }
    console.log(`after command ${i + 1} --`);
    console.log(input.stacks);
  });
  const topCrates = input.stacks.slice(1).reduce((acc, stack) => {
    return acc + stack[stack.length - 1];
  }, '');
  return topCrates;
};

// Part 1
const processCommandPart1 = (command: Command, stacks: string[][]) => {
  const { amount, startMove, endMove } = command;
  console.log('moving ', { amount, startMove, endMove });
  for (let i = 0; i < amount; i++) {
    const card = stacks[startMove].pop();
    stacks[endMove].push(card);
  }
}


// Part 2 
const processCommandPart2 = (command: Command, stacks: string[][]) => {
  const { amount, startMove, endMove } = command;
  // console.log('moving ', { amount, startMove, endMove });
  const boxesToMove = stacks[startMove].slice(stacks[startMove].length - amount);
  console.log('moving ', { boxesToMove })
  for (let i = 0; i < amount; i++) {
    stacks[startMove].pop();
  }
  console.log('adding to ', stacks[endMove]);
  stacks[endMove].push(...boxesToMove);
  console.log('after to ', stacks[endMove]);
}

const getInput = (fileName: string) => {
  const data = fs.readFileSync(fileName, 'utf8');
  const [board, moves] = data.split('\n\n');
  return convertInput({ board, moves });
}

const convertInput = (input: { board: string, moves: string }) => {
  const board = input.board.split("\n").map((row) => row.split(""));
  // take off column row and get total amount of columns
  const columnCount = Number(board.pop().join('').trim().slice(-1))
  const stacks: string[][] = [];
  for (let i = 0; i < columnCount; i++) {
    stacks.push([])
  }
  board.forEach((row) => {
    for (let i = 1, x = 0; i <= row.length; i += 4, x += 1) {
      const curr = row[i].trim();
      if (curr) {
        stacks[x].unshift(curr)
      }
    }
  });
  // just put an empty stack at the start, so indexes align with the commands
  stacks.unshift([]);

  const commands = input.moves.trim().split("\n").map((s) => s.trim()).map((s) => {
    const moveIdx = s.indexOf('move') + 4;
    const fromIdx = s.indexOf("from");
    const amount = Number(s.slice(moveIdx, fromIdx).trim());
    const [startMove, endMove] = s.slice(moveIdx).split('from')[1].split(' to ').map((s) => Number(s));
    return { amount, startMove, endMove };
  });
  return { commands, stacks }
}

// console.log('sample: ', problem(getInput('sample-input.txt'), 'part-2'));
console.log('sample: ', problem(getInput('input.txt'), 'part-2'));
