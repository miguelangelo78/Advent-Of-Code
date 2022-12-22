import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

function hasDuplicates(arr: string[]) {
  return (new Set(arr)).size !== arr.length;
}

function part1() {
  let solution = 0;

  const stream = input.split('');

  let window;

  for (let i = 0; i <= stream.length - 4; i++) {
    window = [ stream[i], stream[i + 1], stream[i + 2], stream[i + 3] ];
    if (!hasDuplicates(window)) {
      solution = i + window.length;
      break;
    }
  }
  
  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  const stream = input.split('');

  let window;
  let windowSize = 14;

  for (let i = 0; i <= stream.length - windowSize; i++) {
    window = [];
    for (let windowIndex = 0; windowIndex < windowSize; windowIndex ++) {
      window[windowIndex] = stream[i + windowIndex];
    }

    if (!hasDuplicates(window)) {
      solution = i + window.length;
      break;
    }
  }

  console.log('Solution part 1: ', solution);
}

part1();
part2();
