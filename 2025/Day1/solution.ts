import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

function solution1(input: string[]): number {
  let dial = 50;
  let result = 0;

  for (const turn of input) {
    const direction = turn.slice(0, 1);
    const distance = parseInt(turn.slice(1), 10);
    
    if (direction === 'R') {
      dial += distance;

      while (dial > 99) {
        dial -= 100;
      }
    }

    if (direction === 'L') {
      dial -= distance;

      while (dial < 0) {
        dial += 100;
      }
    }

    if (dial === 0) {
      result++;
    }
  }

  return result;
}

function solution2(input: string[]): number {
  let dial = 50;
  let result = 0;

  for (const turn of input) {
    const direction = turn.slice(0, 1);
    const distance = parseInt(turn.slice(1), 10);
    const step = direction === 'R' ? 1 : -1;

    for (let i = 0; i < distance; i++) {
      dial += step;

      if (dial > 99) {
        dial = 0;
      }

      if (dial < 0) {
        dial = 99;
      }

      if (dial === 0) {
        result++;
      }
    }

    console.log(`Dial after ${direction}${distance}: ${dial}, result = ${result}`);
  }

  return result;
}

// Part 1
const solution1Result = solution1(inputLines);
console.log(`Solution part 1: ${solution1Result}`);

// Part 2
const solution2Result = solution2(inputLines);
console.log(`Solution part 2: ${solution2Result}`);