const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString('utf-8');

// --- PART ONE --- //

const arrayOfRucksacks = input.split('\n');

/**
 * @param {string} str
 * @returns
 */
const findRepeatedItemIn = (str) => {
  const arrayOfLetters = str.split('');
  const sack1 = arrayOfLetters.slice(0, str.length / 2);
  const sack2 = arrayOfLetters.slice(str.length / 2);
  let repeated;
  sack1.forEach((letter, i) => {
    sack2.forEach((l) => {
      if (letter === l) repeated = letter;
    });
  });
  return repeated;
};

const Z_CODE_VALUE = 90;
const A_TO_Z_ADJUST = 38;
const a_TO_z_ADJUST = 96;

/**
 * @param {string} str
 * @returns
 */
const calcPriorityOf = (str) => {
  const value = str.charCodeAt();
  if (value <= Z_CODE_VALUE) return value - A_TO_Z_ADJUST;
  return value - a_TO_z_ADJUST;
};

const arrayWithRepeatedItems = arrayOfRucksacks.map((sack) =>
  findRepeatedItemIn(sack)
);

const arrayWithPriorities = arrayWithRepeatedItems.map((item) =>
  calcPriorityOf(item)
);

const sumOfPriorities = arrayWithPriorities.reduce((acc, el) => acc + el, 0);

console.log(sumOfPriorities); // 8298

// -- PART TWO --

const arrayOfThreeElves = [];
let counter = 0;
let groupStr = '';
arrayOfRucksacks.forEach((sack) => {
  if (counter < 3) {
    groupStr += ` ${sack}`;
    counter++;
  }
  if (counter === 3) {
    arrayOfThreeElves.push(groupStr.trimStart().split(' '));
    counter = 0;
    groupStr = '';
  }
});

/**
 * @param {string} arrOfSacks
 * @returns
 */
const findRepeatedTypeIn = (arrOfSacks) => {
  const [sack1, sack2, sack3] = arrOfSacks;
  let repeated;
  sack1.split('').forEach((item) => {
    if (sack2.includes(item) && sack3.includes(item)) repeated = item;
  });
  return repeated;
};

const arrayOfTypesPerGroup = arrayOfThreeElves.map((group) =>
  findRepeatedTypeIn(group)
);

const sumOfPriorityByGroup = arrayOfTypesPerGroup
  .map((el) => calcPriorityOf(el))
  .reduce((acc, el) => acc + el, 0);

console.log(sumOfPriorityByGroup); // 2708

/*
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:andersonfpcorrea/advent-of-code.git
git push -u origin main
*/
