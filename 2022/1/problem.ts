import { INPUT } from "./input";


const SAMPLE_INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const problem = (input: string) => {
  const elfTotals = input.split('\n\n');
  console.log('elfTotals?', elfTotals);

  const elfMaximums = elfTotals.map((n) => n.split('\n')).map((nums) => nums.reduce((a,b ) => Number(a) + Number(b) ,0));
  console.log('elfMaximums', elfMaximums);
  // 1
  // return Math.max(...elfMaximums)

  // 2
  const sorted = elfMaximums.sort((a,b) => b-a);
  console.log('sorted', sorted)
  return sorted.slice(0,3).reduce((a,b) => a + b, 0);
};


console.log('sample: ', problem(SAMPLE_INPUT));
console.log('input: ', problem(INPUT));