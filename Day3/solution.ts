import * as fs from 'fs';

const rucksacks: string[] = fs.readFileSync('input.txt', 'utf8').split('\n');

function part1() {
  let solution = 0;

  rucksacks.forEach((line) => {
    const pocket1 = line.substring(0, line.length / 2).split('');
    const pocket2 = line.substring(line.length / 2).split('');
    
    const duplicates = [...new Set(pocket1.filter((item, index) => pocket2.indexOf(item) !== -1))];
    duplicates.forEach((item) => {
      solution += item.charCodeAt(0) - (item >= 'a' ? 96 : 38);
    })
  });
  console.log('Solution part 1: ', solution);
}

function part2() {
  let solution = 0;

  for(let i = 0; i <= rucksacks.length - 3; i += 3) {
    const rucksack1 = rucksacks[i].split('');
    const rucksack2 = rucksacks[i + 1].split('');
    const rucksack3 = rucksacks[i + 2].split('');

    let duplicates = [...new Set(rucksack1.filter((item, index) => rucksack2.indexOf(item) !== -1 && rucksack3.indexOf(item) !== -1))];
    duplicates.forEach((item) => {
      solution += item.charCodeAt(0) - (item >= 'a' ? 96 : 38);
    });
  }

  console.log('Solution part 2: ', solution);
}

part1();
part2();
