function decorateTree(base) {
  let combinations = new Map([
    ['PP', 'P'],
    ['BB', 'B'],
    ['RR', 'R'],
    ['BP', 'R'],
    ['PB', 'R'],
    ['PR', 'B'],
    ['RP', 'B'],
    ['BR', 'P'],
    ['RB', 'P'],
  ]);
  let baseArray = base.split(' ');
  let result = [];

  baseArray
    .slice(0, -1)
    .reduce(
      (acc, _) => (
        (acc = acc
          .slice(0, -1)
          .map((letter, i) => combinations.get(letter + acc[i + 1]))),
        result.unshift(acc.join(' ')),
        acc
      ),
      baseArray
    );

  return [...result, base];
}

const base = 'B P R P';
console.log(decorateTree(base));
