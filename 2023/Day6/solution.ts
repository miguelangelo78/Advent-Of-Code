import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface BoatRace {
  time: number;
  distance: number;
}

function parseBoatRaces(inputLines: string[], ignoreSpaces = false) {
  let timesTmp = inputLines[0].split(':')[1].trim().split(' ');
  if (ignoreSpaces) timesTmp = [timesTmp.join('')];
  const times = timesTmp.filter(Boolean).map((x) => parseInt(x));

  let distancesTmp = inputLines[1].split(':')[1].trim().split(' ');
  if (ignoreSpaces) distancesTmp = [distancesTmp.join('')];
  const distances = distancesTmp.filter(Boolean).map((x) => parseInt(x));

  const boatRaces: BoatRace[] = [];

  times.forEach((time, i) => {
    boatRaces.push({
      time,
      distance: distances[i],
    });
  });

  return boatRaces;
}

function calculateWaysToWin(boatRace: BoatRace): number {
  const { time, distance } = boatRace;

  let waysToWin = 0;

  for (let holdTime = 1; holdTime <= time; holdTime++) {
    // The hold time will be the time the boat is not moving
    // Once the boat starts moving, it will move at a speed of how many seconds we've been holding it
    // And it will keep moving for the rest of the time
    // So the traveled distance will be the distance we need to travel minus the time we've been holding the boat
    const traveledDistance = holdTime * (time - holdTime);

    // If the traveled distance is greater than the distance we need to travel, we've won
    if (traveledDistance > distance) {
      waysToWin++;
    }
  }

  return waysToWin;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const boatRaces = parseBoatRaces(inputLines);

  const waysToWin = boatRaces.map((boatRace) => calculateWaysToWin(boatRace));

  sol = waysToWin.reduce((acc, curr) => acc * curr, 1);

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  const boatRaces = parseBoatRaces(inputLines, true);

  const waysToWin = boatRaces.map((boatRace) => calculateWaysToWin(boatRace));

  sol = waysToWin.reduce((acc, curr) => acc * curr, 1);

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
