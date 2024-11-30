function selectSleigh(distance, sleighs) {
  const { name } = sleighs
    .reduce(
      (bestSleighs, sleigh, performance) => (
        (performance = sleigh.consumption * distance),
        performance <= 20 &&
          bestSleighs.push({ name: sleigh.name, performance }),
        bestSleighs
      ),
      [{ name: null }]
    )
    .pop();
  return name;
}
const distance = 30;
const sleighs = [
  { name: 'Gorusuke', consumption: 0.3 },
  { name: 'Madeval', consumption: 0.5 },
  { name: 'Lolivier', consumption: 0.7 },
  { name: 'Hyuuh', consumption: 1 },
];

console.log(selectSleigh(distance, sleighs));
