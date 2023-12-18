import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface ScratchCard {
  winningNumbers: number[];
  myNumbers: number[];
  matchedNumbers: number[];
  isCopy: boolean;
  cardIndex: number;
  isProcessed: boolean;
}

function parseScratchCards(inputLines: string[]): ScratchCard[] {
  return inputLines.map((line, i) => {
    const card = line.split('|');
    const winningNumbers = card[0].split(':')[1].trim().split(' ').map(n => parseInt(n));
    const myNumbers = card[1].trim().split(' ').filter(Boolean).map(n => parseInt(n));

    return {
      winningNumbers,
      myNumbers,
      matchedNumbers: myNumbers.filter(n => winningNumbers.includes(n)),
      isCopy: false,
      cardIndex: i,
      isProcessed: false,
    };
  });
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const scratchCards = parseScratchCards(inputLines);

  scratchCards
    .filter(card => card.matchedNumbers.length > 0)
    .forEach((card, i) => {
      const points = card.matchedNumbers.reduce((acc, n) => acc * 2, 1) / 2;

      sol += points;
    });

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  const scratchCards = parseScratchCards(inputLines);

  for (let i = 0; i < scratchCards.length; i++) {
    const card = scratchCards[i];

    if (card.matchedNumbers.length > 0) {
      // Copy scratch card from index i by length of matchedNumbers
      for (let j = card.cardIndex + 1; j < card.cardIndex + 1 + card.matchedNumbers.length; j++) {
        if (scratchCards[j].isCopy) {
          scratchCards[j].isProcessed = true;
        }

        if (scratchCards[j].isProcessed) {
          continue;
        }

        scratchCards.push({ ...scratchCards[j], isCopy: true });
      }
    }
  }

  sol = scratchCards.length;

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
