import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

const numberDictionary = Object.entries({
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
});

function findDigit(line: string, findFirst = true, extended = false): string {
  let _chars = line.trim().split('');
  if (!findFirst) _chars = _chars.reverse();

  for (let i = 0; i < _chars.length; i++) {
    // Check for spelled out number
    if (extended) {
      for (let j = 0; j < numberDictionary.length; j++) {
        const [key, value] = numberDictionary[j];
        const lineWindow = _chars.slice(i, i + key.length).join('');

        const _key = findFirst ? key : key.split('').reverse().join('');
        if (lineWindow === _key) {
          return value;
        }
      }
    }

    // Check for number
    if (!isNaN(Number(_chars[i]))) {
      return _chars[i];
    }
  }

  return '0';
}

function getSumCalibrationValues(inputLines: string[], extended = false): number {
  return inputLines.map((line) => {
    let firstNumber = findDigit(line.trim(), true, extended);
    let lastNumber = findDigit(line.trim(), false, extended);

    return +`${firstNumber}${lastNumber}`;
  })
    .reduce((acc, line) => acc + Number(line), 0);
}

// Part 1
const solution1 = getSumCalibrationValues(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSumCalibrationValues(inputLines, true);
console.log(`Solution part 2: ${solution2}`);