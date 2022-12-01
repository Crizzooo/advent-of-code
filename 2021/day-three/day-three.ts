import { TEST_INPUT, INPUT } from "./inputs";

const _input = INPUT;

const getInput = () => {
  const str = _input;

  return str.split('\n').map((s) => {
    let _s = (""+s).trim();
    return _s;
  });
}


type BitCounts = { [s: string]: number }[];

const runPartOne = () => {
  const input = getInput();
  console.log('input: ', input);


  const counts = input.reduce((acc, val, i) => {
    val.split('').map((char, i) => {
      if (!acc[i]) {
        acc[i] = {};
      }
      if (!acc[i][char]) {
        acc[i][char] = 0;
      }
      acc[i][char] ++;
    })
    return acc;
  }, [] as BitCounts);


  const mostCommonNumbers = reduceNumber(counts, (currCount, acc) => currCount > acc, -Infinity, '1');
  const leastCommonNumbers = reduceNumber(counts, (currCount, acc) => currCount < acc, Infinity, '0');

  const gammaRate = toBinary(mostCommonNumbers.join(''));
  const epsilonRate = toBinary(leastCommonNumbers.join(''));

  console.log(mostCommonNumbers);
  console.log(leastCommonNumbers);

  const inputLength = input[0].length;
  console.log(inputLength);

  let oxy = [...input];
  let carbon = [...input];
  for (let idx = 0; idx < inputLength; idx++) {
    // Take remaining inputs
    const oxyCountHash = createCountHash(oxy);
    const carbonCountHash = createCountHash(carbon);

    // create count hash
    const mostCommonNumbers = reduceNumber(oxyCountHash, (currCount, acc) => currCount > acc, -Infinity, '1');
    // console.log('most common numbers: ', mostCommonNumbers);
    console.log('oxy count hash for i', idx, oxy, oxyCountHash);
    console.log('most common numbers: ', mostCommonNumbers);

    const leastCommonNumbers = reduceNumber(carbonCountHash, (currCount, acc) => currCount < acc, Infinity, '0');

    

    oxy = oxy.filter((input) => {
      return input[idx] === mostCommonNumbers[idx];
    })

    carbon = carbon.filter((input) => {
      return input[idx] === leastCommonNumbers[idx];
    })

  
  }

  console.log(oxy);
  console.log(carbon);

  const oxyRate = toBinary(oxy.join(''));
  const carbonRate = toBinary(carbon.join(''));

  return {
    partOne: gammaRate * epsilonRate,
    partTwo: oxyRate * carbonRate,
  };
}

const toBinary = (str: string) => parseInt(str, 2);

const createCountHash = (input: string[]) => {
  return input.reduce((acc, val, i) => {
    val.split('').map((char, i) => {
      if (!acc[i]) {
        acc[i] = {};
      }
      if (!acc[i][char]) {
        acc[i][char] = 0;
      }
      acc[i][char] ++;
    })
    return acc;
  }, [] as BitCounts);
}

// garbage implementation 
const reduceNumber = (counts: BitCounts, shouldUpdate: (currCount: number, acc: number) => Boolean, initalValue: number, tieKey: '1' | '0') => {
  return counts.map((countHash) => {
    let highestKey = '';
    let highest = initalValue;
    for (let key in countHash) {
      if (countHash[key] === highest) {
        highest = countHash[tieKey];
        highestKey = tieKey;
      } else if (shouldUpdate(countHash[key], highest)) {
        highest = countHash[key];
        highestKey = key;
      }
    }
    return highestKey;
  });
}


console.log(runPartOne());