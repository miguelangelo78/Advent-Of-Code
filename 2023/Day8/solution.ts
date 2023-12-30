import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface Node {
  address: string;
  left: string;
  right: string;
}

interface Network {
  instructions: string[];
  nodeMap: Map<string, Node>;
}

function parseNetwork(inputLines: string[]) {
  const network: Network = {
    instructions: inputLines.shift()!.trim().split(''),
    nodeMap: new Map<string, Node>(),
  };

  // Remove empty line
  inputLines.shift();

  inputLines.forEach((line) => {
    const [address, leftRight] = line.split('=').map((x) => x.trim());

    const [left, right] = leftRight.split(',').map((x) => x.replace(/[\(\)]/g, '').trim())

    network.nodeMap.set(address, {
      address,
      left,
      right,
    });
  });

  return network;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const network = parseNetwork(inputLines);

  let stepsTakenToReachZZZ = 1;
  let i = 0;
  let found = false;

  const firstNode = network.nodeMap.get('AAA')!;
  let nextAddress = network.instructions[0] === 'R' ? firstNode.right : firstNode.left;

  while (!found) {
    const node = network.nodeMap.get(nextAddress)!;
    if (node.address === 'ZZZ') {
      found = true;
      break;
    }

    if (++i >= network.instructions.length) {
      i = 0;
    }

    stepsTakenToReachZZZ++;

    nextAddress = network.instructions[i] === 'R' ? node.right : node.left;
  }

  sol = stepsTakenToReachZZZ;

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
