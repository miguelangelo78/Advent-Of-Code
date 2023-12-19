import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

interface MapRow {
  destination: number;
  source: number;
  range: number;
}

interface FarmMap {
  mapName: string;
  maps: MapRow[];
}

function parseFarmMap(inputLines: string[])
  : { farmMaps: FarmMap[], seeds: number[] } {
  let seeds = inputLines.find((line) => line.startsWith('seeds:'))!.split(':')[1].trim().split(' ').map((seed) => parseInt(seed));

  let farmMaps: FarmMap[] = [];

  for (let i = 0; i < inputLines.length; i++) {
    let inputLine = inputLines[i].trim();
    if (inputLine.endsWith(':')) {
      const mapName = inputLine.split(':')[0];

      const maps: MapRow[] = [];

      while ((inputLines[++i] ?? '').trim() !== '') {
        inputLine = inputLines[i];
        const [destination, source, range] = inputLine.split(' ').map((part) => parseInt(part));
        maps.push({ destination, source, range });
      }

      farmMaps.push({ mapName, maps });
    }
  }

  return { farmMaps, seeds };
}

function mapSourceToDestination(source: number, map: FarmMap): number {
  const mapRow = map.maps.find((mapRow) => mapRow.source <= source && mapRow.source + mapRow.range > source);

  if (!mapRow) {
    return source;
  }

  return mapRow.destination + source - mapRow.source;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  const { farmMaps, seeds } = parseFarmMap(inputLines);

  let results = seeds;

  for (const farmMap of farmMaps) {
    results = results.map(source => mapSourceToDestination(source, farmMap));
  }

  sol = Math.min(...results);

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
