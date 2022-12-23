import * as fs from 'fs';

const grid = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '').split('\n').map((row) => row.split(''));

function isVisible(grid: string[][], height: number, y: number, x: number): boolean {
  // Check vertically upwards:
  for (let yBackwards = y - 1; yBackwards >= 0; yBackwards--) {
    if (+grid[yBackwards][x] >= height) {
      break;
    } else if (yBackwards === 0) {
      return true;
    }
  }

  // Check vertically downwards:
  for (let yForwards = y + 1; yForwards <= grid.length - 1; yForwards++) {
    if (+grid[yForwards][x] >= height) {
      break;
    } else if (yForwards === grid.length - 1) {
      return true;
    }
  }

  // Check horizontally backwards:
  for (let xBackwards = x - 1; xBackwards >= 0; xBackwards--) {
    if (+grid[y][xBackwards] >= height) {
      break;
    } else if (xBackwards === 0) {
      return true;
    }
  }

  // Check horizontally forwards:
  for (let xForwards = x + 1; xForwards <= grid[y].length - 1; xForwards++) {
    if (+grid[y][xForwards] >= height) {
      break;
    } else if (xForwards === grid[y].length - 1) {
      return true;
    }
  }

  return false;
}

function getScenicScore(grid: string[][], height: number, y: number, x: number): number {
  let up: number = 1;
  let down: number = 1;
  let left: number = 1;
  let right: number = 1;

  // Check vertically upwards:
  for (let yBackwards = y - 1; yBackwards >= 0; yBackwards--) {
    if (+grid[yBackwards][x] >= height || yBackwards === 0) {
      up = y - yBackwards;
      break;
    }
  }

  // Check vertically downwards:
  for (let yForwards = y + 1; yForwards <= grid.length - 1; yForwards++) {
    if (+grid[yForwards][x] >= height || yForwards === grid.length - 1) {
      down = yForwards - y;
      break;
    }
  }

  // Check horizontally backwards:
  for (let xBackwards = x - 1; xBackwards >= 0; xBackwards--) {
    if (+grid[y][xBackwards] >= height || xBackwards === 0) {
      left = x - xBackwards;
      break;
    }
  }

  // Check horizontally forwards:
  for (let xForwards = x + 1; xForwards <= grid[y].length - 1; xForwards++) {
    if (+grid[y][xForwards] >= height || xForwards === grid[y].length - 1) {
      right = xForwards - x;
      break;
    }
  }

  return up * down * left * right;
}

function part1() {
  let solution = 0;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      if (isVisible(grid, +grid[y][x], y, x)) {
        console.log(`Visible: ${grid[y][x]} (x: ${x}, y: ${y})`)
        solution++;
      }
    }
  }

  solution += (grid.length + grid[0].length) * 2 - 4;

  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  const scenicScores = [];

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      const scenicScore = getScenicScore(grid, +grid[y][x], y, x);
      console.log(`Scenic score: ${grid[y][x]} (x: ${x}, y: ${y}) = ${scenicScore}`);
      scenicScores.push(scenicScore);
    }
  }

  solution = Math.max(...scenicScores);

  console.log('Solution part 2: ', solution);
}

part1();
part2();
