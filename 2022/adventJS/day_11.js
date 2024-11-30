function getCompleted(part, total) {
  //Euclid Algorithm
  let reduceFraction = (n, d) => {
    let a = n;
    let b = d;
    while (b) {
      let c = b;
      b = a % b;
      a = c;
    }
    return `${n / a}/${d / a}`;
  };

  let [partSeconds, totalSeconds] = [part, total].map((time) =>
    time
      .split(':')
      .reduce((seconds, time, i) => seconds + time * 60 ** (2 - i), 0)
  );
  let result = reduceFraction(partSeconds, totalSeconds);
  return result;
}

console.log(getCompleted('03:30:30', '05:50:50'));
