/**
 * Had fun over-modeling this one out, to keep the core logic very readable and not requiring much thought.
 */
import { INPUT } from "./input";


const SAMPLE_INPUT = `A Y
B X
C Z`;


type Entity = 'Rock' | 'Paper' | 'Scissors';




const characterToEntity = (character: string) => {
  if (character === 'A' || character === 'X') {
    return 'Rock'
  } else if (character === 'B' || character === 'Y') {
    return 'Paper'
  } else if (character === 'C' || character === 'Z') {
    return 'Scissors'
  }
  throw new Error('Invalid character');
}

const characterToWinningPlayer = (character: string): 0 | 1 | 2 => {
  if (character === 'Y') {
    return 0;
  } else if (character === 'X') {
    return 1;
  } else if (character === 'Z') {
    return 2;
  }
  throw new Error('unreachable');
}

const problem1 = (input: string) => {
  const rounds = input.split('\n').map((n) => n.trim().split(' ').map(characterToEntity));
  console.log('rounds?', rounds);
  let player2Score = 0;
  for (const round of rounds) {
    let [player1, player2] = round;
    player2Score += calculateRoundScore(player1, player2).p2Score;
  }

  return { player2Score }
};

const problem2 = (input: string) => {
  const lines = input.split('\n').map((n) => n.trim().split(' '));
  
  let player2Score = 0;
  for (const [a, b] of lines) {
    const player1 = characterToEntity(a);
    const winningPlayer = characterToWinningPlayer(b);


    // logic to determine what entity player2 should select, to achieve the desired winning player
    let player2Entity: Entity;
    if (winningPlayer === 0) {
      player2Entity = player1;
    } else if (winningPlayer === 1) {
      player2Entity = EntityHash[player1].beats;
    } else if (winningPlayer === 2) {
      player2Entity = EntityHash[player1].losesTo;
    } else {
      throw new Error('unreachable');
    }

    console.log('determined player2Entity', { player1, winningPlayer, player2Entity });
    player2Score += calculateRoundScore(player1, player2Entity).p2Score;
  }
  return player2Score;
}



const calculateRoundScore = (player1: Entity, player2: Entity) => {
  const winningPlayer = detectWinningPlayer(player1, player2);


  const scoreForPlayer2Entity =  getEntityValue(player2);
  const scoreForPlayer2Outcome = winningPlayerToScore(winningPlayer, 2);
  const p2Score = scoreForPlayer2Entity + scoreForPlayer2Outcome;

  console.log('round result', { player1, player2, winningPlayer, scoreForPlayer2Entity, scoreForPlayer2Outcome, p2Score });
  return { p2Score };
};


/*
 Core game logic, models, and utils
 */
const Rock = {
  beats: 'Scissors',
  losesTo: 'Paper',
} as const;

const Paper = {
  beats: 'Rock',
  losesTo: 'Scissors',
} as const;

const Scissors = {
  beats: 'Paper',
  losesTo: 'Rock',
} as const;


const EntityHash: { [Key in Entity as string]: { beats: Entity, losesTo: Entity }} = {
  'Rock': Rock,
  'Paper': Paper,
  'Scissors': Scissors,
}



const getEntityValue = (entity: Entity) => {
  switch (entity) {
    case 'Rock':
      return 1;
    case 'Paper':
      return 2;
    case 'Scissors':
      return 3;
  }
}

const detectWinningPlayer = (entity1: Entity, entity2: Entity): 0 | 1 | 2 => {
  if (entity1 === entity2) {
    return 0;
  } else if (EntityHash[entity1].beats === entity2) {
    return 1;
  } else if (EntityHash[entity2].beats === entity2) {
    return 2;
  }
  throw new Error('Impossible logic in detectWinningPlayer');
}


const winningPlayerToScore = (winningPlayer: 1 | 2 | 0, desiredPlayer = 1 | 2 ) => {
  if (winningPlayer === desiredPlayer) return 6;
  else if (winningPlayer === 0) return 3;
  else return 0;
}




// console.log('sample: ', problem(SAMPLE_INPUT));
// console.log('input: ', problem(INPUT));

// console.log('sample: ', problem2(SAMPLE_INPUT));
// console.log('input: ', problem2(INPUT));
