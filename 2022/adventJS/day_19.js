function sortToys(toys, positions) {
  let min = Math.min(...positions);

  return toys.reduce(
    (result, toy, i) => ((result[positions[i] - min] = toy), result),
    []
  );
}
