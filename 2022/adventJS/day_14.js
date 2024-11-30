function getOptimalPath(path) {
  // Recursive approach
  // let result = new Set();
  // let traverseTree = (value, array, depth, position) => {
  //   if (!array[depth]) {
  //     result.add(value);
  //     return;
  //   }

  //   array[depth].forEach((cost, i) => {
  //     if (i == position + 1 || i == position)
  //       traverseTree(value + cost, array, depth + 1, i);
  //   });
  // };

  // traverseTree(0, path, 0, 0);

  // return result;

  //Another way to do it
  return path.reduceRight((previous, current) => {
    return current.map(
      (value, index) => value + Math.min(previous[index], previous[index + 1])
    );
  })[0];
}

let path = [[0], [3, 4], [9, 8, 1]];
console.log(getOptimalPath(path));
