import { INPUT } from "./input";


const SAMPLE_INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const makeLetterHash = (str: string) => Array.from(str).reduce((acc, val) => ({ [val]: 1, ... acc }), {} as Record<string, number>);

const getValueOfLetter = (char: string) => {
  const values = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return values.indexOf(char);
};

const problem = (input: string) => {
  const rucksacks = input.split('\n');

  let sum = 0;

  for (const [idx, rucksack] of Object.entries(rucksacks)) {
    const midIdx = (rucksack.length + 1) / 2;

    const leftCompartment = rucksack.slice(0, midIdx);
    const rightCompartment = rucksack.slice(midIdx);
    const rightLetters = makeLetterHash(rightCompartment);

    let matchedLetter = '';
    for (const letter of leftCompartment) {
      if (rightLetters[letter]) {
        matchedLetter = letter;
        break;
      }
    }


    if (!matchedLetter) {
      throw new Error(`No match found in rupsack`);
    }

  }

  return sum;
};



const problem2 = (input: string) => {
  const rucksacks = input.split('\n');


  // part 2 
  const currentGroupHashes = [{}, {}];
  let sum = 0;
  for (const [idx, rucksack] of Object.entries(rucksacks)) {
    // every 3 rucksacks, lets look at the previous 2 rucksacks hashes and store the letter that is commoon among all three
    if ((Number(idx) + 1) % 3 === 0) {
      console.log('evaluating hashes at idx',   { idx, currentGroupHashes, rucksack });

      for (const char of rucksack) {
        // @ts-ignore
        if (currentGroupHashes[0][char] && currentGroupHashes[1][char]) {
          console.log('found a match', { char });
          sum += getValueOfLetter(char);
          break;
        }
      }
    }
    currentGroupHashes.pop();
    currentGroupHashes.unshift(makeLetterHash(rucksack));
  }
  return sum;
}



// console.log('sample: ', problem(SAMPLE_INPUT));
// console.log('input: ', problem(INPUT));
// console.log('sample: ', problem2(SAMPLE_INPUT));
console.log('input: ', problem2(INPUT));
