import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

function scanForInvalidIdBlocks(numStr: string): number {
  console.log(`Scanning number: ${numStr}`);
  let i = 1;

  while(true) {
    const reference = numStr.substring(0, i);

    console.log(` Reference: ${reference}`);

    // Search for the reference in the remaining string with blocks of the same length
    // If all blocks match, we found an invalid ID
    let found = true;
    let looked = false;
    for (let j = i; j <= numStr.length - reference.length; j += reference.length) {
      looked = true;
      const block = numStr.substring(j, j + reference.length);
    
      if (numStr.length % block.length !== 0) {
        console.log(`   Not divisible by block length`);
        found = false;
        break;
      }

      if (block !== reference) {
        found = false;
        break;
      } else {
        console.log(`   Block matches reference`);
      }
    }

    if (found && looked) {
      console.log(`  Found invalid ID: ${numStr}`);
      return +numStr;
    }

    if (++i >= numStr.length) {
      break;
    }
  }

  return 0;
}

function scanForInvalidId(numStr: string): number {
  const first = numStr.substring(0, numStr.length / 2);
  const second = numStr.substring(numStr.length / 2);

  return first === second ? +numStr : 0;
}

function solution1(input: string[]): number {
  let result = 0;

  for (const line of input) {
    const ranges = line.split(',');
    for (const range of ranges) {
      const [start, end] = range.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        result += scanForInvalidId(`${i}`);
      }
    }
  }

  return result;
}

function solution2(input: string[]): number {
  let result = 0;

  for (const line of input) {
    const ranges = line.split(',');
    for (const range of ranges) {
      const [start, end] = range.split('-').map(Number);

      console.log(`Range: ${start} to ${end}`);
      for (let i = start; i <= end; i++) {
        result += scanForInvalidIdBlocks(`${i}`);
      }
    }
  }

  return result;
}

// Part 1
const solution1Result = solution1(inputLines);
console.log(`Solution part 1: ${solution1Result}`);

// Part 2
const solution2Result = solution2(inputLines);
console.log(`Solution part 2: ${solution2Result}`);