import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Consult the report from the sensors you just deployed.
In the row where y=2000000, how many positions cannot contain a beacon?
 */

function solution(input, rowToCheck) {
  let inputArray = input.split('\n');
  let sensors = [];
  let beaconSetInRow = new Set();
  inputArray.forEach((pairs) => {
    let [sensor, beacon] = pairs.split(':');
    let sensorCoors = sensor.match(/-?\d+/g).map((x) => +x);
    let beaconCoors = beacon.match(/-?\d+/g).map((x) => +x);
    sensors.push({
      x: sensorCoors[0],
      y: sensorCoors[1],
      distance:
        Math.abs(sensorCoors[0] - beaconCoors[0]) +
        Math.abs(sensorCoors[1] - beaconCoors[1]),
    });

    if (beaconCoors[1] == rowToCheck)
      beaconSetInRow.add(`${beaconCoors[0]}/${beaconCoors[1]}`);
  });

  sensors = sensors
    .filter((sensor) => {
      //To see if a sensor can touch the row

      if (sensor.y == rowToCheck) return true;
      if (sensor.y > rowToCheck)
        return sensor.y - sensor.distance <= rowToCheck;
      else return sensor.y + sensor.distance >= rowToCheck;
    })
    .map((sensor) => {
      //This is the calculation to know how many blocks does the signal touches
      let distanceFromRow = Math.abs(rowToCheck - sensor.y);
      let totalRowOccupy = sensor.distance * 2 - distanceFromRow * 2 + 1;

      let maxXOcuppy = (totalRowOccupy - 1) / 2 + sensor.x;
      let minXOcuppy = Math.abs(sensor.x) - (totalRowOccupy - 1) / 2;

      return {
        ...sensor,
        minXOcuppation: minXOcuppy,
        maxXOcuppation: maxXOcuppy,
      };
    });

  let minXOcuppation = Math.min(...sensors.map((x) => x.minXOcuppation));
  let maxXOcuppation = Math.max(...sensors.map((x) => x.maxXOcuppation));

  let totalSpaces = Math.abs(minXOcuppation) + maxXOcuppation + 1;

  return totalSpaces - beaconSetInRow.size;
}

// console.log(solution(input, 2000000));
console.log(solution(testInput, 10));
