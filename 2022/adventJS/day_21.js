function printTable(gifts) {
  let maxQuantityLength = Math.max(
    ...gifts.map((x) => (x.quantity + '').length),
    'Quantity'.length
  );
  let maxNameLength = Math.max(
    ...gifts.map((x) => x.name.length),
    'Gift'.length
  );

  let basesLength = maxNameLength + maxQuantityLength + 7;

  let result = `${'+'.repeat(basesLength)}\n| ${'Gift'.padEnd(
    maxNameLength
  )} | ${'Quantity'.padEnd(maxQuantityLength)} |\n| ${'-'.repeat(
    maxNameLength
  )} | ${'-'.repeat(maxQuantityLength)} |\n`;

  gifts.forEach(({ name, quantity }) => {
    result += `| ${name.padEnd(maxNameLength)} | ${(quantity + '').padEnd(
      maxQuantityLength
    )} |\n`;
  });

  result += '*'.repeat(basesLength);

  return result;
}

console.log(
  printTable([
    { name: 'PlayStation 5', quantity: 9234782374892 },
    { name: 'Book Learn Web Dev', quantity: 23531 },
  ])
);

// ++++++++++++++++++++++++++++++++++++++
// | Gift               | Quantity      |
// | ------------------ | ------------- |
// | PlayStation 5      | 9234782374892 |
// | Book Learn Web Dev | 23531         |
// **************************************
