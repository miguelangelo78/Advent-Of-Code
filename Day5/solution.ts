import * as fs from 'fs';

const [ stackColumns, instructions ] = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const instructionsSplit = instructions.split('\n');

const stackColumnsSplit = stackColumns.split('\n');
const columnCount = +stackColumnsSplit.splice(-1)[0].trim().split(' ').splice(-1)[0];
let stacks: string[][];

function parse() {
  stacks = new Array(columnCount);

  stackColumnsSplit.forEach(column =>
    column.split('').forEach((char, index) => {
      if (char != ' ' && char != '[' && char != ']') {
        const stackIndex = Math.round(index / 4)

        if (stacks[stackIndex]) {
          stacks[stackIndex].push(char)
        } else {
          stacks[stackIndex] = [char];
        }
      }
  }
));
}

function part1() {
  let solution = '';

  parse();

  instructionsSplit.forEach(instructionLine => {
    const { 1: countStr, 3: fromStr, 5: toStr } = instructionLine.split(' ');

    let count = +countStr;
    let from = (+fromStr) - 1;
    let to = (+toStr) - 1;

    while(count--) {
      const char = stacks[from].shift();
      if (char)
        stacks[to].unshift(char);
    }
  });

  stacks.forEach(stack => solution += stack[0])

  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = '';

  parse();

  instructionsSplit.forEach(instructionLine => {
    const { 1: countStr, 3: fromStr, 5: toStr } = instructionLine.split(' ');

    let count = +countStr;
    let from = (+fromStr) - 1;
    let to = (+toStr) - 1;

    const sub = stacks[from].splice(0, count);

    if(stacks[to]) {
      stacks[to].unshift(...sub);
    } else {
      stacks[to] = [...sub]
    }
  });

  stacks.forEach(stack => solution += stack[0])

  console.log('Solution part 2: ', solution);
}

part1();
part2();
