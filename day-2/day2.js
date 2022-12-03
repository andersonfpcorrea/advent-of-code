const fs = require('fs');
const path = require('path');

// --- PART ONE --- //

const roundScore = {
  lose: 0,
  draw: 3,
  win: 6,
};

const plays = {
  rock: { name: 'rock', score: 1 },
  paper: { name: 'paper', score: 2 },
  scissors: { name: 'scissors', score: 3 },
};

const strategyOf = {
  myOpponent: {
    A: plays.rock,
    B: plays.paper,
    C: plays.scissors,
  },
  myself: {
    X: plays.rock,
    Y: plays.paper,
    Z: plays.scissors,
  },
};

const wins = {
  X: 'C',
  Y: 'A',
  Z: 'B',
  A: 'Z',
  B: 'X',
  C: 'Y',
};

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString('utf-8');

const allRounds = input.split('\n').map((arr) => arr.split(' '));

const calcRoundScore = (arr) => {
  const [oppPlay, myPlay] = arr;
  // If I win:
  if (wins[myPlay] === oppPlay)
    return strategyOf.myself[myPlay].score + roundScore.win;
  // If there is a draw:
  if (strategyOf.myOpponent[oppPlay].name === strategyOf.myself[myPlay].name)
    return strategyOf.myself[myPlay].score + roundScore.draw;
  // If I lose:
  if (wins[oppPlay] === myPlay)
    return strategyOf.myself[myPlay].score + roundScore.lose;
};

const allRoundsScores = allRounds.map((arr) => calcRoundScore(arr));

const myTotalScore = allRoundsScores.reduce((acc, el) => acc + el, 0);

console.log(myTotalScore); // 9651

// --- PART TWO --- //

const myselfNeedTo = {
  lose: 'X',
  draw: 'Y',
  win: 'Z',
};

const loses = {
  A: 'Y',
  B: 'Z',
  C: 'X',
  X: 'B',
  Y: 'C',
  Z: 'A',
};

const calcRoundScoreBasedOnElf = (arr) => {
  const [oppPlay, outcome] = arr;
  // If outcome is to win
  if (outcome === myselfNeedTo.win) {
    return roundScore.win + strategyOf.myself[loses[oppPlay]].score;
  }
  // If outcome is to draw:
  if (outcome === myselfNeedTo.draw) {
    return roundScore.draw + strategyOf.myOpponent[oppPlay].score;
  }
  // If outcome is to lose
  if (outcome === myselfNeedTo.lose) {
    return roundScore.lose + strategyOf.myself[wins[oppPlay]].score;
  }
};

const allRoundsScores2 = allRounds.map((arr) => calcRoundScoreBasedOnElf(arr));

const myTotalScore2 = allRoundsScores2.reduce((acc, el) => acc + el, 0);

console.log(myTotalScore2); // 10560
