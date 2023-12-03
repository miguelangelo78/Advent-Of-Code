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
function checkTooManyForColour(
  line: string,
  colour: 'red' | 'green' | 'blue',
  howMany: number,
): boolean {
  const found = line.match(new RegExp(`[\\d]+ ${colour}`, 'g'))
    ?.map((x) => +x.match(/([\d]+)/)![1])!;

  return found.some((x) => x > howMany);
}

/**
 * Returns the fewest required of the given colour in the given line.
 * 
 * @param line 
 * @param colour 
 * @returns 
 */
function getFewest(
  line: string,
  colour: 'red' | 'green' | 'blue',
): number {
  const found = line.match(new RegExp(`([\\d]+) ${colour}`, 'g'))
    ?.map((x) => +x.match(/([\d]+)/)![1])!;

  return Math.max(...found);
}

function getSumIdGames(
  inputLines: string[],
  howManyRed = 12,
  howManyGreen = 13,
  howManyBlue = 14,
): number {
  const howMany = inputLines.map((line) => {
    if (checkTooManyForColour(line, 'red', howManyRed)
      || checkTooManyForColour(line, 'green', howManyGreen)
      || checkTooManyForColour(line, 'blue', howManyBlue)) {
      // Too many of one colour
      return 0;
    }

    const gameId = +line.match(/Game ([\d]+)/)![1];

    return gameId;
  });

  return howMany.reduce((a, b) => a + b);
}

function getPowerOfFewest(inputLines: string[]): number {
  const powerOfFewest = inputLines.map((line) => {
    const fewestReds = getFewest(line, 'red');
    const fewestGreens = getFewest(line, 'green');
    const fewestBlues = getFewest(line, 'blue');

    return fewestReds * fewestGreens * fewestBlues;
  });

  return powerOfFewest.reduce((a, b) => a + b);
}

// Part 1
const solution1 = getSumIdGames(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getPowerOfFewest(inputLines);
console.log(`Solution part 2: ${solution2}`);
