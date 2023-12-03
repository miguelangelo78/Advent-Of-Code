import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

/**
 * Returns true if the given colour is found too many times in the given line.
 * 
 * @param colour 
 * @param line 
 * @param howMany 
 * @returns 
 */
function checkForColour(
  colour: 'red' | 'green' | 'blue',
  line: string,
  howMany: number,
): boolean {
  const found = line.match(new RegExp(`[\\d]+ ${colour}`, 'g'))
    ?.map((x) => +x.match(/([\d]+)/)![1])!;

  return found.some((x) => x > howMany);
}

function getSumIdGames(
  inputLines: string[],
  howManyRed = 12,
  howManyGreen = 13,
  howManyBlue = 14
): number {
  const sums = inputLines.map((line) => {
    if (checkForColour('red', line, howManyRed)
      || checkForColour('green', line, howManyGreen)
      || checkForColour('blue', line, howManyBlue)) {
      // Too many of one colour
      return 0;
    }

    const gameId = +line.match(/Game ([\d]+)/)![1];

    return gameId;
  });

  return sums.reduce((a, b) => a + b);
}

// Part 1
const solution1 = getSumIdGames(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
//const solution2 = getSumCalibrationValues(inputLines, true);
//console.log(`Solution part 2: ${solution2}`);
