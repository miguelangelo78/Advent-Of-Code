import * as fs from 'fs';

const inputlines: string[] = fs.readFileSync('input.txt', 'utf8').split('\n');

function extractIndices(str: string): number[] {
  const split = str.split('-');
  return [+split[0], +split[1] ];
}

function part1() {
  let solution = 0;

  inputlines.forEach(line => {
    const ranges = line.split(',');
    const [group1LowerNumberIndex, group1HigherNumberIndex] = extractIndices(ranges[0]);
    const [group2LowerNumberIndex, group2HigherNumberIndex] = extractIndices(ranges[1]);

    if (
      (group1LowerNumberIndex <= group2LowerNumberIndex && group1HigherNumberIndex >= group2HigherNumberIndex) ||
      (group2LowerNumberIndex <= group1LowerNumberIndex && group2HigherNumberIndex >= group1HigherNumberIndex)
    ) {
      solution += 1;
    }
  });

  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  inputlines.forEach(line => {
    const ranges = line.split(',');
    const [group1LowerNumberIndex, group1HigherNumberIndex] = extractIndices(ranges[0]);
    const [group2LowerNumberIndex, group2HigherNumberIndex] = extractIndices(ranges[1]);

    if (
      (group2LowerNumberIndex >= group1LowerNumberIndex && group2LowerNumberIndex <= group1HigherNumberIndex) ||
      (group1LowerNumberIndex >= group2LowerNumberIndex && group1LowerNumberIndex <= group2HigherNumberIndex)
    ) {
      solution += 1;
    }
  });

  console.log('Solution part 2: ', solution);
}

part1();
part2();
