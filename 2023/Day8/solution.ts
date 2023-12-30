import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

function gcd(a: number, b: number): number {
  // Base case
  if (b === 0) {
    return a;
  }
  // Recursive case
  return gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

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
  // Make a copy of the input lines
  const _inputLines = [...inputLines];

  const network: Network = {
    instructions: _inputLines.shift()!.trim().split(''),
    nodeMap: new Map<string, Node>(),
  };

  // Remove empty line
  _inputLines.shift();

  _inputLines.forEach((line) => {
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

function findEndingAddress(network: Network, startingAddresses = ['AAA']) {
  let stepsTakenToReachGoal = 0;
  let nextAddresses = startingAddresses;

  let i = 0;

  while (true) {
    const nodes = nextAddresses.map((address) => network.nodeMap.get(address)!);

    stepsTakenToReachGoal++;

    nextAddresses = nodes.map((node) => {
      return network.instructions[i] === 'R' ? node.right : node.left;
    });

    // If all nodes are ending nodes, we have reached the end
    if (nextAddresses.every((address) => address.endsWith('Z'))) {
      break;
    }

    if (++i >= network.instructions.length) {
      i = 0;
    }
  }

  return stepsTakenToReachGoal;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const network = parseNetwork(inputLines);

  sol = findEndingAddress(network);

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  const network = parseNetwork(inputLines);

  // Find all addresses that end with 'A':
  const addressesEndingWithA = [...network.nodeMap.values()].filter((node) => node.address.endsWith('A')).map((node) => node.address);

  const periods = addressesEndingWithA.map((address) => findEndingAddress(network, [address]));

  sol = periods.reduce((acc, period) => lcm(acc, period), 1);

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
