import { TEST_INPUT, INPUT } from "./inputs";

const _input = TEST_INPUT;

const getInput = () => {
  const lanternFish = _input;
  return { lanternFish };
}

// Brute Force OOP
class LanternFish {
  INITIAL_DAYS_ON_CREATE = 8;
  DEFAULT_CYCLE_ON_RESET = 6;
  dayOfCycle: number;
  firstDay: boolean;

  // A new fish school begin its cycle at the chosen day of cycle, else it must be its first day and should begin at 6
  constructor(initialDays?: number) {
    this.dayOfCycle = initialDays || this.INITIAL_DAYS_ON_CREATE;
    this.firstDay = initialDays !== undefined ? false : true;
  }

  handleDay() {
    if (this.firstDay) {
      this.firstDay = false;
    } else {
      this.dayOfCycle -= 1;
    }
  }

  resetCycle() {
    this.dayOfCycle = this.DEFAULT_CYCLE_ON_RESET;
  }

}

class LanternFishSchool {
  school: LanternFish[];
  days: number;

  constructor(initialFish: number[]) {
    this.school = initialFish.map((num) => new LanternFish(num));
    this.days = 0;
  }

  processDays(days: number) {
    let count = 0;
    while (count < days) {
      this.processDay();
      // this.logSchool();
      count++;
    }
  }

  processDay() {
    for(const fish of this.school) {
      fish.handleDay();

      if (fish.dayOfCycle < 0) {
        this.school.push(new LanternFish());
        fish.resetCycle();
      }
    }
    this.days++;
  }

  logSchool() {
    console.log(`After ${this.days} day(s): `, this.school.map((fish) => fish.dayOfCycle).join(', '));
  }
}

// Recursive - still too slow
function getFishCountAfterCycle(remainingCycle: number, fishCycle: number = 8) {
  // totalFish = 1
  let totalSpawnedFish = 1;
  console.log('processing ', remainingCycle);
  while (remainingCycle > 0) {
    remainingCycle--;
    fishCycle--;
    if (fishCycle < 0) {
      // spawn a new fish for current remaining days
      totalSpawnedFish += getFishCountAfterCycle(remainingCycle, );
      fishCycle = 6; // reset the fish
    }
  }
  return totalSpawnedFish;
  // while remainingCycle
    // decrement this fishCycle
    // if fish goes below 0 
      // spawn new fish and add its count to this count
    // reset fishCycle to 6
}

/**
 * Actual Optimized Solution
 * Just keep track of the total fish for however many days are in their cycle
 * Each day:
 * - handle 0s by adding to 6 and 8
 * - handle other numbers by adding to the index below
 */

// Try a fish count
type FishHash = {
  '0': number,
  '1': number,
  '2': number,
  '3': number,
  '4': number,
  '5': number,
  '6': number,
  '7': number,
  '8': number,
};

const countFishInHash = (fishHash: FishHash) => {
  let sum = 0;
  for (const [key, value] of Object.entries(fishHash)) {
    sum += value;
  }
  return sum;
}

const createFishHash = (fish: number[]) => {
  const fishHash: FishHash = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
  }
  for (const days of fish) {
    // @ts-ignore
    fishHash[String(days)]++;
  }
  return fishHash;
}

const processFishHash = (daysRemaining: number, fishHash: FishHash) => {

  if (daysRemaining < 0) return countFishInHash(fishHash);

  while (daysRemaining > 0) {

    let createdFish = fishHash[0];
    fishHash['0'] = 0;
    // Process a day by decrementing timer of each fish
    for (let i = 1; i <= 8; i++) {
      const dayOfCycle = String(i);
      // @ts-ignore
      const fishCount = fishHash[dayOfCycle];

      // @ts-ignore
      fishHash[String(dayOfCycle - 1)] += fishCount; 
      // @ts-ignore
      fishHash[String(dayOfCycle)] = 0; 
      // at 0, add a fish to index 9 to create new
      //       add a fish to 6
      // decrement count of current
      // increment count of below
    }  
    // Handle all the fish that were at 0 for next day
    fishHash['6'] += createdFish;
    fishHash['8'] += createdFish;


    daysRemaining--;
    // handle created fish by adding 1 to index 8 and adding 1 to index 6
    console.log('fish hash', fishHash);
  }
  return countFishInHash(fishHash);
  // }
}

const run = () => {
  const { lanternFish } = getInput();


  // pt 1
  // const school = new LanternFishSchool(lanternFish);
  // school.processDays(256);
  // console.log(school.school.length);
  console.log('test: ', lanternFish.reduce((a, b) => a + getFishCountAfterCycle(256, b), 0));
  // pt 2
  // console.log(getFishCountAfterCycle(11, 3));
  // getFishCountAfterCycle(256, lanternFish);

  // console.log(createFishHash(lanternFish));
  // const hash = createFishHash(lanternFish);
  // console.log('hash ', hash);
  // console.log(processFishHash(3, hash));
};

console.log(run());



