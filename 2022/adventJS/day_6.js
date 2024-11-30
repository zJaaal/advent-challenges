function createCube(size) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array[i] = `${' '.repeat(size / 2 - i + size / 2 - 1)}${`/\\`.repeat(
      i + 1
    )}${`_\\`.repeat(size)}`;

    array[size * 2 - i - 1] = `${' '.repeat(
      size / 2 - i + size / 2 - 1
    )}${`\\/`.repeat(i + 1)}${`_/`.repeat(size)}`;
  }
  return array.join('\n');
}

console.log(createCube(1));
console.log(createCube(2));
console.log(createCube(3));
console.log(createCube(4));
console.log(createCube(5));
