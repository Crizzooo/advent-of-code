import { INPUT } from "./input";


const SAMPLE_INPUT = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const problem = (input: string) => {
  const lastX = 14;
  for(const [index, char] of input.split('').entries()) {
    // console.log({ index, char })
    if (index < lastX) {
      continue;
    }
    const lastXChars = input.slice(index - (lastX - 1), index + 1)
    const deduped = new Set(Array.from(lastXChars));
    const hasDupes = deduped.size < lastXChars.length;
    // console.log({ lastFour, index, char, hasDupes, deduped, size: deduped.size });

    
    if (hasDupes) {
      // console.log('has dupes', { lastFour, index, char });
    } else {
      // console.log('no dupes', { lastFour, index, char });
      return { lastX, index: index + 1 };
    }
    
  }
  throw new Error('oops?')
};


// console.log('sample: ', problem(SAMPLE_INPUT)); // 19
// console.log('sample: ', problem("bvwbjplbgvbhsrlpgdmjwftvncz")); // 5 , 23
// console.log('sample ', problem("nppdvjthqldpwncqszvftbrmjlhg")); // 6  , 23 
console.log(problem("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")); //  10 29 
console.log(problem("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));// 11 26
console.log('input: ', problem(INPUT));