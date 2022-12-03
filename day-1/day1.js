const fs = require('fs');
const path = require('path');

// --- PART 1 ---
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString('utf-8');

const arrayOfCalories = input.split(';\n\n');

const sumOfEachElfCaloriesArray = arrayOfCalories.map((arr) =>
  arr.split(';').reduce((acc, el) => acc + Number(el), 0)
);

let maxTotalCalories = 0;
sumOfEachElfCaloriesArray.forEach((qty) => {
  if (qty > maxTotalCalories) maxTotalCalories = qty;
});

console.log(maxTotalCalories); // 70369

// --- PART TWO ---
let topOne = 0;
let topTwo = 0;
let topThree = 0;
sumOfEachElfCaloriesArray.forEach((qty) => {
  if (qty > topOne) topOne = qty;
  if (qty < topOne && qty > topTwo) topTwo = qty;
  if (qty < topTwo && qty > topThree) topThree = qty;
});

const totalTop3 = topOne + topTwo + topThree;

console.log(totalTop3); // 203002
