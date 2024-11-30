import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Your handheld device indicates that the distress signal is coming from a beacon nearby.
The distress beacon is not detected by any sensor,
but the distress beacon must have x and y coordinates
each no lower than 0 and no larger than 4000000.

To isolate the distress beacon's signal,
you need to determine its tuning frequency,
 which can be found by multiplying its x coordinate by 4000000
 and then adding its y coordinate.

In the example above, the search space is smaller:
instead, the x and y coordinates can each be at most 20.
With this reduced search area, there is only a single position that
could have a beacon: x=14, y=11.
The tuning frequency for this distress beacon is 56000011.

Find the only possible position for the distress beacon.
What is its tuning frequency?
 */

function solution(input, maxRow) {
  let inputArray = input.split('\n');
  let sensors = [];
  inputArray.forEach((pairs) => {
    //Just parsing the data
    let [sensor, beacon] = pairs.split(':');
    let sensorCoors = sensor.match(/-?\d+/g).map((x) => +x);
    let beaconCoors = beacon.match(/-?\d+/g).map((x) => +x);

    //Create the sensors object
    sensors.push({
      x: sensorCoors[0],
      y: sensorCoors[1],
      distance:
        Math.abs(sensorCoors[0] - beaconCoors[0]) +
        Math.abs(sensorCoors[1] - beaconCoors[1]),
    });
  });

  let found = 0;
  let rowToCheck = 0;

  while (rowToCheck < maxRow) {
    let sensorsOnTouch = sensors
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

        return [minXOcuppy, maxXOcuppy];
      })
      .sort((x, y) => x[0] - y[0]);

    //Merge the ranges to know if all sensors cover the whole row
    let ranges = sensorsOnTouch.reduce(
      (merged, current, i) => {
        if (!i) return merged;

        let [start, end] = current;

        if (start <= merged.at(-1)[1]) {
          merged.at(-1)[1] = Math.max(end, merged.at(-1)[1]);
        } else merged.push(current);

        return merged;
      },
      [[sensorsOnTouch[0][0], sensorsOnTouch[0][1]]]
    );

    //If the sensors don't cover all the row,
    //then there will be 2 ranges and the end of the first one + 1 is the position where the beacon is
    if (ranges.length == 2) {
      found = ranges[0][1] + 1;
      break;
    }
    ++rowToCheck;
  }

  return found * 4000000 + rowToCheck;
}

console.log(solution(input, 4000000));

// console.log(solution(testInput, 20));
