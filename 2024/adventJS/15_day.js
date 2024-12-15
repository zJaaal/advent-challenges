console.clear();
console.log('----------------------------------');

/*
ChatGPT has arrived at the North Pole and the elf Sam Elfman is working on an application for managing gifts and children.

To enhance the presentation, he wants to create a function drawTable that receives an array of objects and converts it into a text table.

The drawn table should represent the object data as follows:

It has a header with the column name.
The column name has the first letter capitalized.
Each row should contain the values of the objects in the corresponding order.
Each value must be left-aligned.
Fields always leave a space on the left.
Fields leave the necessary space on the right to align the box.
*/
/**
 * @param {Array<Object>} data
 * @returns {string}
 */
function drawTable(data) {
  const header = Object.keys(data[0]);

  const columns = [];
  const columnWidths = [];

  for (let headerCell of header) {
    const column = data.map((row) => row[headerCell]);

    const parsedCells = [
      headerCell.replace(/^[a-z]/, (letter) => letter.toUpperCase()),
      ...column.map((cell) => cell.toString()),
    ];

    const width = Math.max(...parsedCells.map((cell) => cell.length));

    columnWidths.push(width);

    columns.push(parsedCells.map((cell) => cell.padEnd(width)));
  }

  const separator =
    columnWidths.map((width) => '+' + '-'.repeat(width + 2)).join('') + '+';

  let rowString = '';

  for (let i = 0; i < columns[0].length; i++) {
    for (let column of columns) {
      rowString += `| ${column[i]} `;
    }
    rowString += `|\n`;
    !i && (rowString += separator + '\n');
  }

  return `${separator}\n${rowString}${separator}`;
}

console.log(
  drawTable([
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' },
    { name: 'Charlie', city: 'New York' },
  ])
);
// +---------+-----------+
// | Name    | City      |
// +---------+-----------+
// | Alice   | London    |
// | Bob     | Paris     |
// | Charlie | New York  |
// +---------+-----------+

console.log(
  drawTable([
    { gift: 'Doll', quantity: 10 },
    { gift: 'Book', quantity: 5 },
    { gift: 'Music CD', quantity: 1 },
  ])
);
// +----------+----------+
// | Gift     | Quantity |
// +----------+----------+
// | Doll     | 10       |
// | Book     | 5        |
// | Music CD | 1        |
// +----------+----------+

// +----------+----------+
// | Gift     | Quantity |
// +----------+----------+
// | Doll     | 10       |
// | Book     | 5        |
// | Music CD | 1        |
// +----------+----------+
