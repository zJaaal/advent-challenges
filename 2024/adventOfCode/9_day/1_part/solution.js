import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The disk map uses a dense format to represent the layout of files and free space on the disk.
The digits alternate between indicating the length of a file and the length of free space.

So, a disk map like 12345 would represent a one-block file, two blocks of free space,
a three-block file, four blocks of free space, and then a five-block file.
A disk map like 90909 would represent three nine-block files in a row (with no free space between them).

Each file on disk also has an ID number based on the order of the files as they appear before they are rearranged,
starting with ID 0. So, the disk map 12345 has three files: a one-block file with ID 0,
a three-block file with ID 1, and a five-block file with ID 2.
Using one character for each block where digits are the file ID and . is free space,
the disk map 12345 represents these individual blocks:
0..111....22222
*/

function initMemory(numbers) {
  let id = 0;
  let lastAllocation = 0;
  return numbers.reduce((acc, number, i) => {
    const shift = i ? 1 : 0;

    if (i % 2) {
      acc['free'] ??= [];
      // Allocate free memory
      acc['free'].push(
        ...Array.from({ length: number }, (_, j) => j + lastAllocation + shift)
      );

      // if the number is 0, then the last allocation is the last number we added
      lastAllocation = number === 0 ? acc[id - 1].at(-1) : acc['free'].at(-1);
    } else {
      // Im assuming (I tested it) that there are not 0 block files
      // Allocate filled memory
      acc[id] = Array.from(
        { length: number },
        (_, j) => j + lastAllocation + shift
      );

      lastAllocation = acc[id].at(-1);

      // Increase the current id
      id++;
    }

    return acc;
  }, {});
}

function compress(memory) {
  const { free, ...ids } = memory;
  const newFreeMemory = [];

  const idsKeys = Object.keys(ids);

  for (let i = idsKeys.length - 1; i >= 0; i--) {
    const idMemory = ids[idsKeys[i]];

    for (let j = idMemory.length - 1; j >= 0; j--) {
      const currentFree = free.shift(); // get the first free memory

      if (currentFree === undefined || idMemory[j] < currentFree) {
        newFreeMemory.push(currentFree, ...free); // add the current free memory and the rest of the free memory
        memory.free = newFreeMemory; // Return the new freeMemory for debugging reasons
        return memory;
      }

      // Push the freedMemory to the newFreeMemory
      newFreeMemory.push(idMemory[j]);

      // Update the idMemory with the currentFree after the movement
      idMemory[j] = currentFree;
    }
  }

  return memory;
}

function solution(input) {
  const memory = initMemory(input.split('').map(Number));

  const compressedMemory = compress(memory);

  const { free, ...ids } = compressedMemory;

  const memoryKeys = Object.keys(ids);

  return memoryKeys.reduce((acc, key) => {
    const value = ids[key].reduce((acc, char, i) => {
      return acc + char * Number(key);
    }, 0);

    return acc + value;
  }, 0);
}

console.log(solution(input), '\n6288599492129');
// console.log(solution(testInput), '\n1928');
