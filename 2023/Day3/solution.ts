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
  const tokens = [];

  for (let y = 0; y < inputLines.length; y++) {
    tokens.push(...tokeniseLine(inputLines[y], y));
  }

  return tokens;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  // Tokenise the input into a list of tokens
  const tokens = tokeniseAllLines(inputLines);

  const symbolTokens = tokens.filter((token) => isNaN(+token.char));
  const numberTokens = tokens.filter((token) => !isNaN(+token.char));

  // For each symbol token, check if there is a number token in the 8 directions
  for (let i = 0; i < symbolTokens.length; i++) {
    const symbolToken = symbolTokens[i];

    for (let j = 0; j < numberTokens.length; j++) {
      // Get distance from numberToken to symbolToken

      const numberToken = numberTokens[j];

      let xDistance, yDistance;

      if (numberToken.x >= symbolToken.x) {
        xDistance = Math.abs(numberToken.x - symbolToken.x);
      } else {
        xDistance = Math.abs((numberToken.x + numberToken.length - 1) - symbolToken.x);
      }

      yDistance = Math.abs(numberToken.y - symbolToken.y);

      if (xDistance <= 1 && yDistance <= 1) {
        sol += +numberToken.char;
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
      const numberToken = numberTokens[j];

      let xDistance, yDistance;

      if (numberToken.x >= gearToken.x) {
        xDistance = Math.abs(numberToken.x - gearToken.x);
      } else {
        xDistance = Math.abs((numberToken.x + numberToken.length - 1) - gearToken.x);
      }

      yDistance = Math.abs(numberToken.y - gearToken.y);

      if (xDistance <= 1 && yDistance <= 1) {
        adjacentNumbers.push(numberToken);
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
