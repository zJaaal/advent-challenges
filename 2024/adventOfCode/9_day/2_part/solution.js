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


This time, attempt to move whole files to the leftmost span of free space blocks that could fit the file.
Attempt to move each file exactly once in order of decreasing file ID number starting with the file with the highest file ID number.
If there is no span of free space to the left of a file that is large enough to fit the file, the file does not move.
 */

function initMemory(numbers) {
  let id = 0;
  let lastAllocation = 0;
  return numbers.reduce((acc, number, i) => {
    const shift = i ? 1 : 0;

    if (i % 2) {
      acc['free'] ??= [];

      // Now we need to allocate the free memory in blocks
      const memoryBlock = number
        ? {
            block: Array.from(
              { length: number },
              (_, j) => j + lastAllocation + shift
            ),
          }
        : undefined;

      // If the number is 0, we don't have to allocate memory
      memoryBlock && acc['free'].push(memoryBlock);

      // if the number is 0, then the last allocation is the last number we added
      lastAllocation =
        number === 0 ? acc[id - 1].at(-1) : acc['free'].at(-1).block.at(-1);
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
  let { free, ...ids } = memory;
  const idsKeys = Object.keys(ids);

  for (let i = idsKeys.length - 1; i >= 0; i--) {
    const idMemory = ids[idsKeys[i]];

    // Find a free memory block that fits the file
    const fittingMemory = free.find((memoryBlock) => {
      return (
        memoryBlock.block.length >= idMemory.length && // If it fits
        memoryBlock.block[0] < idMemory[0] // If it is the leftmost span
      );
    });

    // If we find a fitting memory block, we need to move the file to it
    if (fittingMemory) {
      const freedMemory = idMemory.slice(0); // Copy the memory block

      let memoryToAllocate = fittingMemory.block.slice(0, idMemory.length); // Get the part of the memory block that we need

      memory[idsKeys[i]] = memoryToAllocate; // Allocate the memory

      fittingMemory.block = fittingMemory.block.slice(memoryToAllocate.length); // Fill the memory that we used

      // Allocate the freed memory into the free memory
      const memoryToAppend = free.find((memoryBlock) => {
        return (
          Math.abs(memoryBlock.block.at(-1) - freedMemory.at(-1)) === 1 ||
          Math.abs(memoryBlock.block.at(0) - freedMemory.at(0)) === 1
        );
      });

      if (memoryToAppend) {
        memoryToAppend.block.push(...freedMemory); // Push the freed memory into the free memory block
        memoryToAppend.block.sort((a, b) => a - b); // Sort to maintain consistency
      } else {
        free.push({ block: freedMemory }); // Create a new block of free memory
      }
      free = free.filter((memoryBlock) => memoryBlock.block.length); // Remove empty memory blocks
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

console.log(solution(input), '\n6321896265143');
// console.log(solution(testInput), '\n2858');
