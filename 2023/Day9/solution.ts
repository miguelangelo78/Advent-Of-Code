import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

function getCoeffs(sensor: number[]): number[][] {
  const listCoeffs = [];
  let coeffs: number[] = [];

  let lastSensors = [...sensor];

  while (true) {
    // Get differences between each number:
    for (let i = 0; i < lastSensors.length - 1; i++) {
      coeffs.push(lastSensors[i + 1] - lastSensors[i]);
    }

    listCoeffs.push([...coeffs]);

    if (coeffs.length > 0 && coeffs.every((coeff) => coeff === 0)) {
      // We've reached the end of the list
      break;
    }

    lastSensors = [...coeffs];

    coeffs = [];
  }

  return listCoeffs;
}

function parseSensors(inputLines: string[]) {
  const sensors: number[][] = inputLines.map((line) => line.trim().split(' ').map((char) => +char));

  const listCoeffs = sensors.map((sensor) => getCoeffs(sensor));

  return { sensors, listCoeffs };
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const { sensors, listCoeffs } = parseSensors(inputLines);

  const extrapolated = listCoeffs.map((coeffs) => coeffs.reduce((acc, coeff) => acc + coeff.at(-1)!, 0));

  sol = sensors.map((sensor) => sensor.at(-1)!).reduce((acc, sensor, index) => acc + sensor + extrapolated[index], 0);

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  const { sensors, listCoeffs } = parseSensors(inputLines);

  const extrapolated = listCoeffs.map((coeffs) => coeffs.reverse().reduce((acc, coeff) => coeff[0] - acc, 0));

  sol = sensors.map((sensor) => sensor[0]).reduce((acc, sensor, index) => acc + sensor - extrapolated[index], 0);

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
