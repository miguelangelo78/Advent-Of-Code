import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '').split('\n');

function calculateGridDimensions(motions: { direction: string, steps: number }[]): { width: number, height: number } {
  let width = 1, maxWidth = 1;
  let height = 1, maxHeight = 1;

  motions.forEach((motion) => {
    switch (motion.direction) {
      case 'R': {
        width += motion.steps;
        if (width > maxWidth)
          maxWidth = width;
        break;
      }
      case 'U': {
        height += motion.steps;
        if (height > maxHeight)
          maxHeight = height;
        break;
      }
      case 'L': {
        width -= motion.steps;
        break;
      }
      case 'D': {
        height -= motion.steps;
        break;
      }
    }
  });

  return { width: maxWidth, height: maxHeight };
}

function part1() {
  let solution = 0;

  const motions = input.map((o) => {
    const split = o.split(' ');
    return {
      direction: split[0],
      steps: +split[1],
    }
  })

  console.log(calculateGridDimensions(motions))

  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  console.log('Solution part 2: ', solution);
}

part1();
part2();
