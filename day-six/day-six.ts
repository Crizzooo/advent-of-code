import { TEST_INPUT, INPUT } from "./inputs";

const _input = TEST_INPUT;

const getInput = () => {
  const lanternFish = _input;
  return { lanternFish };
}

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

function getFishCountAfterCycle(remainingCycle: number, fishCycle: number = 8) {
  // totalFish = 1
  let totalSpawnedFish = 1;

  while (remainingCycle > 0) {
    remainingCycle--;
    fishCycle--;
    if (fishCycle < 0) {
      // spawn a new fish for current remaining days
      totalSpawnedFish += getFishCountAfterCycle(remainingCycle);
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

const run = () => {
  const { lanternFish } = getInput();

  // pt 1
  // const school = new LanternFishSchool(lanternFish);
  // school.processDays(256);
  // console.log(school.school.length);

  // pt 2
  console.log(getFishCountAfterCycle(11, 3));
};

console.log(run());