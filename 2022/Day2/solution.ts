import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

function part1() {
  const PlayLookup: any = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
  };

  function play(playA: number, playB: number): number {
    // If plays are the same
    if(playA === playB) {
      return playB + 3;
    }

    // If playA = Rock
    if (playA === PlayLookup.A) {
      // If playB = Paper
      if(playB === PlayLookup.Y) {
        return playB + 6;
      }
  
      // If playB = Scissors
      if (playB === PlayLookup.Z) {
        return playB;
      }
    }

    // If playA = Paper
    if (playA === PlayLookup.B) {
      // If playB = Rock
      if (playB === PlayLookup.X) {
        return playB;
      }

      // If playB = Scissors
      if (playB === PlayLookup.Z) {
        return playB + 6;
      }
    }

    // If playA = Scissors
    if (playA === PlayLookup.C) {
      // If playB = Rock
      if (playB === PlayLookup.X) {
        return playB + 6;
      }

      // If playB = Paper
      if (playB === PlayLookup.Y) {
        return playB;
      }
    }

    return 0;
  }

  let accum = 0;

  inputLines.forEach((line) => {
    const [opponent, human] = line.split(' ');
    accum += play(PlayLookup[opponent], PlayLookup[human]);
  });

  console.log('Solution part 1: ', accum);
}

function part2() {
  const PlayLookup: any = {
    A: 1,
    B: 2,
    C: 3,
    X: 0,
    Y: 1,
    Z: 2,
  };

  function play(playA: number, outcome: number): number {
    switch(outcome) {
      case 0: {
        // Must lose
        if (playA === PlayLookup.A) { // Chooses Rock
          return PlayLookup.C; // Play Scissors
        } else if(playA === PlayLookup.B) { // Chooses Paper
          return PlayLookup.A; // Play Rock
        }
        // Chooses Scissors, Play Paper
        return PlayLookup.B;
      }
      case 1: {
        // Must draw
        // Play same
        return playA + 3;
      }
      case 2: {
        // Must win
        if (playA === PlayLookup.A) { // Chooses Rock
          return PlayLookup.B + 6; // Play Paper
        } else if (playA === PlayLookup.B) { // Chooses Paper
          return PlayLookup.C + 6; // Play Scissor
        }
        // Chooses Scissor, Play Rock
        return PlayLookup.A + 6;
      }
    }

    return 0;
  }

  let accum = 0;

  inputLines.forEach((line) => {
    const [opponent, human] = line.split(' ');
    accum += play(PlayLookup[opponent], PlayLookup[human]);
  });

  console.log('Solution part 2: ', accum);
}

part1();
part2();
