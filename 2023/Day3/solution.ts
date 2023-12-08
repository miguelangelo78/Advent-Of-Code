import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface Token {
  char: string;
  x: number;
  y: number;
  length: number;
}

function tokenise(inputLine: string, y: number): Token[] {
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

function getSolution1(inputLines: string[]) {
  let sol = 0;
  const tokens = [];

  // Tokenise the input into a list of tokens
  for (let y = 0; y < inputLines.length; y++) {
    tokens.push(...tokenise(inputLines[y], y));
  }

  const symbolTokens = tokens.filter((token) => isNaN(+token.char));
  const numberTokens = tokens.filter((token) => !isNaN(+token.char));

  // For each symbol token, check if there is a number token in the 8 directions
  for (let i = 0; i < symbolTokens.length; i++) {
    const symbolToken = symbolTokens[i];

    for(let j = 0; j < numberTokens.length; j++) {
      const numberToken = numberTokens[j];

      // TODO: Get distance from numberToken to symbolToken 
    }
  }

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${getSolution1}`);

// Part 2
//const solution2 = getSolution2(inputLines);
//console.log(`Solution part 2: ${solution2}`);
