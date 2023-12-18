import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface Token {
  char: string;
  x: number;
  y: number;
  length: number;
}

function tokeniseLine(inputLine: string, y: number): Token[] {
  const tokens = [];

  const chars = inputLine.trim().split('');
  for (let x = 0; x < chars.length; x++) {
    let char = chars[x];

    if (char === '.' || !char) continue;

    let x2 = x;

    if (!isNaN(+char)) {
      while (!isNaN(+chars[x + 1])) {
        char += chars[x + 1];
        x++;
      }
    }

    tokens.push({ char, x: x2, y, length: char.length });
  }

  return tokens;
}

function tokeniseAllLines(inputLines: string[]): Token[] {
  return inputLines.map((inputLine, y) => tokeniseLine(inputLine, y)).flat();
}

function getTokenDistances(token1: Token, token2: Token): [number, number] {
  let xDistance, yDistance;

  if (token1.x >= token2.x) {
    xDistance = Math.abs(token1.x - token2.x);
  } else {
    xDistance = Math.abs((token1.x + token1.length - 1) - token2.x);
  }

  yDistance = Math.abs(token1.y - token2.y);

  return [xDistance, yDistance];
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  // Tokenise the input into a list of tokens
  const tokens = tokeniseAllLines(inputLines);

  const symbolTokens = tokens.filter((token) => isNaN(+token.char));
  const numberTokens = tokens.filter((token) => !isNaN(+token.char));

  // For each symbol token, check if there is an adjacent number in the X and Y axis
  for (let i = 0; i < symbolTokens.length; i++) {
    const symbolToken = symbolTokens[i];

    for (let j = 0; j < numberTokens.length; j++) {
      // Get distance from numberToken to symbolToken
      const [xDistance, yDistance] = getTokenDistances(numberTokens[j], symbolToken);

      if (xDistance <= 1 && yDistance <= 1) {
        sol += +numberTokens[j].char;
      }
    }
  }

  return sol;
}

function getSolution2(inputLines: string[]) {
  const tokens = tokeniseAllLines(inputLines);

  const gearTokens = tokens.filter((token) => token.char === '*');
  const numberTokens = tokens.filter((token) => !isNaN(+token.char));

  let sol = 0;

  for (let i = 0; i < gearTokens.length; i++) {
    const gearToken = gearTokens[i];

    let adjacentNumbers = [];

    for (let j = 0; j < numberTokens.length; j++) {
      const [xDistance, yDistance] = getTokenDistances(numberTokens[j], gearToken);

      if (xDistance <= 1 && yDistance <= 1) {
        adjacentNumbers.push(numberTokens[j]);
        if (adjacentNumbers.length === 2) {
          sol += adjacentNumbers.reduce((acc, curr) => acc * +curr.char, 1);
          break;
        }
      }
    }
  }

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
