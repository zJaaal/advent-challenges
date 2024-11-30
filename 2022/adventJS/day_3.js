function distributeGifts(packOfGifts, reindeers) {
  return ((reindeers.join('').length * 2) / packOfGifts.join('').length) >> 0;
}

console.log(
  distributeGifts(
    ['music'],
    [
      'midudev',
      'pheralb',
      'codingwithdani',
      'carlosble',
      'blasco',
      'facundocapua',
      'madeval',
      'memxd',
    ]
  )
);
