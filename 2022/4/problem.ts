import { INPUT } from "./input";


const SAMPLE_INPUT = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const problem = (input: string) => {
  const pairs = input.split('\n').map((s) => s.trim()).map((s) => {
    const [pair1, pair2] = s.split(',');
    console.log('pair1, pair2?', pair1, pair2);
    const makePair =(str: string) => {
      const [start, end] = str.split('-');
      return { start: Number(start), end: Number(end) } as { start: Number, end: Number };
    }


    return [makePair(pair1), makePair(pair2)];
  });



  let sum = 0;

  let pt2sum = 0;
  for (const [pair1, pair2] of pairs) {
    
    // pt1 - full containment
    // if pair1 or pair2 fully contain the other
    if ((pair1.start <= pair2.start && pair1.end >= pair2.end) ||
     (pair2.start <= pair1.start && pair2.end >= pair1.end)) {
      sum++;
    }

    // pt2 - any overlap
    // if the start of either pair is less than the max of the other pair, and/or greater than the min of the other pair, its a partial overlap
    if ((pair1.start <= pair2.end && pair1.start >= pair2.start) || (pair2.start <= pair1.end && pair2.start >= pair1.start)) {
      pt2sum++;
      console.log('overlap', { pair1, pair2 });
    }

  }
  return { sum, pt2sum };
};


// console.log('sample: ', problem(SAMPLE_INPUT));
console.log('input: ', problem(INPUT));