import { TEST_INPUT, INPUT } from "./inputs";

const _input = INPUT;

const getInput = () => {
  const str = _input;

  return str.split('\n').map((s) => {
    let [ direction, num ] = s.trim().split(' ');
    return [ direction, Number(num) ]
  }) as [string, number][];
}



const runPartOne = () => {
  const input = getInput();
  console.log('input: ', input);
  const [finalHorizontal, finalDepth] = input.reduce(( [horizontal, depth], [direction, num], i) => {
    switch (direction) {
      case 'forward':
        return [ horizontal + num, depth ];
      case 'down':
        return [ horizontal, depth + num];
      case 'up':
        return [ horizontal, depth - num];
      default:
        throw new Error(`unrecognized direction ${direction}`);
    }
  }, [0, 0]);
  return finalDepth * finalHorizontal;
}

const runPartTwo = () => {
  const input = getInput();
  console.log('input: ', input);
  const [finalHorizontal, finalDepth, finalAim] = input.reduce(( [horizontal, depth, aim], [direction, num], i) => {
    switch (direction) {
      case 'forward':
        return [ horizontal + num, depth + (aim*num), aim ];
      case 'down':
        return [ horizontal, depth, aim + num];
      case 'up':
        return [ horizontal, depth, aim - num];
      default:
        throw new Error(`unrecognized direction ${direction}`);
    }
  }, [0, 0, 0]);
  return finalHorizontal * finalDepth;
}

console.log(runPartTwo());