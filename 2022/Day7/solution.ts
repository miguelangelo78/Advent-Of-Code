import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '').split('\n');

class File {
  constructor(public size: number, public name: string) { }
}

class Tree {
  public root: Tree | null = null;
  public fullPath = '';
  public totalSize: number = 0;
  public flatTree: Tree[] | null = null;

  constructor(
    public name: string = '/',
    public parent: Tree | null = null,
    rootNode: Tree | null = null,
    public files: File[] = [],
    public directories: Tree[] = [],
  ) {
    if (parent === null) {
      this.root = this;
      this.flatTree = [];
      this.fullPath = this.name;
    } else {
      this.root = rootNode;
      this.fullPath = `${parent.fullPath === '/' ? '' : parent.fullPath}/${name}`;
    }
  }

  public pushFile(size: number, name: string) {
    if (this.files.find((file) => file.name === name && file.size === size)) {
      return;
    }

    this.files.push(new File(size, name));
    this.totalSize += size;

    // Push the size upstream
    let iterParent = this.parent;
    while (iterParent) {
      iterParent.totalSize += size;
      iterParent = iterParent.parent;
    }
  }

  public pushDirectory(name: string) {
    if (this.directories.find((dir) => dir.name === name)) {
      return;
    }
    const newDir = new Tree(name, this, this.root);

    this.directories.push(newDir);
    this.root?.flatTree?.push(newDir);
  }
}

function exec_cd(args: string[], currDir: Tree): Tree {
  const cdPath = args[2];

  if (cdPath === '..') {
    currDir = currDir.parent !== null ? currDir.parent : currDir.root!!;
  } else if (cdPath === '/') {
    currDir = currDir.root!!;
  } else if (cdPath !== '.') {
    const findNode = currDir.directories.find((dir) => dir.name === cdPath);
    if (!findNode) {
      throw new Error(`Could not find directory ${cdPath}`);
    }
    currDir = findNode;
  }

  return currDir;
}

function exec_ls(input: string[], execIndex: number, currDir: Tree): number {
  let nextLine = input[execIndex + 1].split(' ');

  while (nextLine[0] != '$') {
    if (nextLine[0] === 'dir') {
      // It's a directory
      currDir.pushDirectory(nextLine[1]);
    } else {
      // It's a file
      currDir.pushFile(+nextLine[0], nextLine[1]);
    }
    execIndex++;
    if (!input[execIndex + 1]) {
      break;
    }
    nextLine = input[execIndex + 1].split(' ');
  }

  return ++execIndex;
}

function parse_cmdHistory(input: string[]): Tree {
  const root = new Tree();
  let currDir = root;

  for (let i = 0; i < input.length; i++) {
    const args = input[i].split(' ');
    console.log('Cmd:', args)

    if (args[0] === '$') {
      switch (args[1]) {
        case 'cd':
          currDir = exec_cd(args, currDir);
          console.log('Current path: ', currDir.fullPath);
          break;
        case 'ls': {
          i = exec_ls(input, i, currDir) - 1;
          break;
        }
        default:
          throw new Error('This should not happen');
      }
    }
  }

  return root;
}

function getDirectoriesWithTotalSize(root: Tree, maxTotalSize: number = 100000): Tree[] {
  return root.flatTree?.filter((dir) => dir.totalSize <= maxTotalSize) ?? [];
}

function part1() {
  let solution = 0;

  const root = parse_cmdHistory(input);
  console.log(root);

  const directories = getDirectoriesWithTotalSize(root, 100000);
  directories.forEach((dir) => solution += dir.totalSize);

  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  const root = parse_cmdHistory(input);

  const totalDiskSize = 70000000;
  const requiredUnusedSpace = 30000000;
  const unusedSpace = totalDiskSize - root.totalSize;

  const candidates: number[] = [];

  root.flatTree?.forEach((dir) => {
    if (unusedSpace + dir.totalSize > requiredUnusedSpace) {
      candidates.push(dir.totalSize);
    }
  });

  solution = Math.min(...candidates);

  console.log('Solution part 2: ', solution);
}

part1();
part2();
