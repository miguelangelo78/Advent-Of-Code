import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

class File {
  constructor(public size: number, public name: string) {}
}

class Tree {
  public root: Tree | null = null;
  public thisFullPath = '';

  constructor(
    public thisName: string,
    public parent: Tree | null = null,
    public rootNode: Tree | null = null,
    public files: File[] = [],
    public directories: Tree[] = [],
  ) {
    if(parent === null) {
      this.root = this;
      this.thisFullPath = '/';
    } else {
      this.root = rootNode;
      this.thisFullPath = `${parent.thisFullPath === '/' ? '' : parent.thisFullPath}/${thisName}`;
    }
  }
}

function exec_cd(args: string[], currDirPath: string, currDir: Tree): Tree {
//  let newCurrDir = '<NIL>';

  const cdPath = args[2];

  if (cdPath === '..') {
  //  newCurrDir = currDirPath.split('/').slice(0, -1).join('/');
 //   if(newCurrDir === '') {
  //    newCurrDir = '/';
 //   }
    currDir = currDir.parent !== null ? currDir.parent : currDir.root!!;
  } else if (cdPath === '/') {
 //   newCurrDir = cdPath;
    currDir = currDir.root!!;
  } else if (cdPath !== '.') {
 //   newCurrDir = `${currDirPath}${currDirPath !== '/' ? '/' : ''}${cdPath}`;
    const findNode = currDir.directories.find((dir) => dir.thisName === cdPath);
    if(!findNode) {
      throw new Error(`Could not find directory ${cdPath}`);
    }
    currDir = findNode;
  }

  return currDir;
}

function exec_ls(input: string[], execIndex: number, currDir: Tree, root: Tree): number {
  let nextLine = input[execIndex + 1].split(' ');

  while (nextLine[0] != '$') {
    if (nextLine[0] === 'dir') {
      // It's a directory
      // TODO: Check if this directory is already mapped
      currDir.directories.push(new Tree(nextLine[1], currDir, root));
    } else {
      // It's a file
      // TODO: Check if this file is already mapped
      currDir.files.push(new File(+nextLine[0], nextLine[1]));
    }
    execIndex++;
    if (!input[execIndex + 1]) {
      break;
    }
    nextLine = input[execIndex + 1].split(' ');
  }

  return ++execIndex;
}

function part1() {
  let solution = 0;

  let currDirPath = '/';

  let root = new Tree(currDirPath);
  let currDir = root;

  for (let i = 0; i < input.length; i++) {
    const args = input[i].split(' ');
    console.log('Prompt: ', args)

    if (args[0] === '$') {
      switch (args[1]) {
        case 'cd':
          currDir = exec_cd(args, currDirPath, currDir);
          console.log(currDirPath);
          break;
        case 'ls': {
          i = exec_ls(input, i, currDir, root) - 1;
          break;
        }
        default:
          throw new Error('This should not happen');
      }
    }
  }

  console.log(root)
  
  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  console.log('Solution part 1: ', solution);
}

part1();
part2();
