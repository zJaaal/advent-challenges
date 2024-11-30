function countHours(year, holidays) {
  return holidays.reduce(
    (count, day, i) => (
      (i = new Date(day + '/' + year).getDay()),
      i > 0 && i < 6 ? (count += 2) : count
    ),
    0
  );
}

console.log(countHours(2020, ['01/06', '04/01', '12/31']));
