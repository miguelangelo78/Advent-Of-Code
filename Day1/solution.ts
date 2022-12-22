import * as fs from 'fs';
import _ from 'lodash';

const inputSplit = fs.readFileSync('input.txt', 'utf8').split('\n');

let elfCalories: number[] = [];

let accum = 0;

inputSplit.forEach((calorie) => {
  if(calorie) {
    accum += +calorie;
  } else {
    elfCalories.push(accum);
    accum = 0;
  };
});

elfCalories = _.sortBy(elfCalories);

// Part 1
const max = elfCalories[elfCalories.length - 1];
console.log('Solution part 1: ', max);

// Part 2
let last3Max = 0;
elfCalories.splice(elfCalories.length - 3, elfCalories.length - 1).forEach((elfCalories) => last3Max += elfCalories);
console.log('Solution part 2: ', last3Max);
