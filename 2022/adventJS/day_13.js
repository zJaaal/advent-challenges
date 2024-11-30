function getFilesToBackup(lastBackup, changes) {
  return changes
    .reduce(
      (ids, backups) => (
        backups[1] > lastBackup &&
          !ids.includes(backups[0]) &&
          ids.push(backups[0]),
        ids
      ),
      []
    )
    .sort((x, y) => x - y);
}
const lastBackup = 1546300800;

const changes = [
  [1, 1546300800],
  [2, 1546300800],
  [1, 1546300900],
  [1, 1546301000],
  [3, 1546301100],
];

console.log(getFilesToBackup(lastBackup, changes));
