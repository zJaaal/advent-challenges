export const input = [
  {
    items: [71, 86],
    operation: (old) => Math.floor((old * 13) / 3),
    test: (value) => (value % 19 == 0 ? 6 : 7),
    inspections: 0,
  },
  {
    items: [66, 50, 90, 53, 88, 85],
    operation: (old) => Math.floor((old + 3) / 3),
    test: (value) => (value % 2 == 0 ? 5 : 4),
    inspections: 0,
  },
  {
    items: [97, 54, 89, 62, 84, 80, 63],
    operation: (old) => Math.floor((old + 6) / 3),
    test: (value) => (value % 13 == 0 ? 4 : 1),
    inspections: 0,
  },
  {
    items: [82, 97, 56, 92],
    operation: (old) => Math.floor((old + 2) / 3),
    test: (value) => (value % 5 == 0 ? 6 : 0),
    inspections: 0,
  },
  {
    items: [50, 99, 67, 61, 86],
    operation: (old) => Math.floor((old * old) / 3),
    test: (value) => (value % 7 == 0 ? 5 : 3),
    inspections: 0,
  },
  {
    items: [61, 66, 72, 55, 64, 53, 72, 63],
    operation: (old) => Math.floor((old + 4) / 3),
    test: (value) => (value % 11 == 0 ? 3 : 0),
    inspections: 0,
  },
  {
    items: [59, 79, 63],
    operation: (old) => Math.floor((old * 7) / 3),
    test: (value) => (value % 17 == 0 ? 2 : 7),
    inspections: 0,
  },
  {
    items: [55],
    operation: (old) => Math.floor((old + 7) / 3),
    test: (value) => (value % 3 == 0 ? 2 : 1),
    inspections: 0,
  },
];

export const part2Input = [
  {
    items: [71, 86],
    operation: (old) => old * 13,
    test: (value) => (value % 19 == 0 ? 6 : 7),
    inspections: 0,
    testNumber: 19,
  },
  {
    items: [66, 50, 90, 53, 88, 85],
    operation: (old) => old + 3,
    test: (value) => (value % 2 == 0 ? 5 : 4),
    inspections: 0,
    testNumber: 2,
  },
  {
    items: [97, 54, 89, 62, 84, 80, 63],
    operation: (old) => old + 6,
    test: (value) => (value % 13 == 0 ? 4 : 1),
    inspections: 0,
    testNumber: 13,
  },
  {
    items: [82, 97, 56, 92],
    operation: (old) => old + 2,
    test: (value) => (value % 5 == 0 ? 6 : 0),
    inspections: 0,
    testNumber: 5,
  },
  {
    items: [50, 99, 67, 61, 86],
    operation: (old) => old * old,
    test: (value) => (value % 7 == 0 ? 5 : 3),
    inspections: 0,
    testNumber: 7,
  },
  {
    items: [61, 66, 72, 55, 64, 53, 72, 63],
    operation: (old) => old + 4,
    test: (value) => (value % 11 == 0 ? 3 : 0),
    inspections: 0,
    testNumber: 11,
  },
  {
    items: [59, 79, 63],
    operation: (old) => old * 7,
    test: (value) => (value % 17 == 0 ? 2 : 7),
    inspections: 0,
    testNumber: 17,
  },
  {
    items: [55],
    operation: (old) => old + 7,
    test: (value) => (value % 3 == 0 ? 2 : 1),
    inspections: 0,
    testNumber: 3,
  },
];
export const testInput = [
  {
    items: [79, 98],
    operation: (old) => Math.floor((old * 19) / 3),
    test: (value) => (value % 23 == 0 ? 2 : 3),
    inspections: 0,
  },
  {
    items: [54, 65, 75, 74],
    operation: (old) => Math.floor((old + 6) / 3),
    test: (value) => (value % 19 == 0 ? 2 : 0),
    inspections: 0,
  },
  {
    items: [79, 60, 97],
    operation: (old) => Math.floor((old * old) / 3),
    test: (value) => (value % 13 == 0 ? 1 : 3),
    inspections: 0,
  },
  {
    items: [74],
    operation: (old) => Math.floor((old + 3) / 3),
    test: (value) => (value % 17 == 0 ? 0 : 1),
    inspections: 0,
  },
];
export const part2TestInput = [
  {
    items: [79, 98],
    operation: (old) => old * 19,
    test: (value) => (value % 23 == 0 ? 2 : 3),
    inspections: 0,
    testNumber: 23,
  },
  {
    items: [54, 65, 75, 74],
    operation: (old) => old + 6,
    test: (value) => (value % 19 == 0 ? 2 : 0),
    inspections: 0,
    testNumber: 19,
  },
  {
    items: [79, 60, 97],
    operation: (old) => old ** 2,
    test: (value) => (value % 13 == 0 ? 1 : 3),
    inspections: 0,
    testNumber: 13,
  },
  {
    items: [74],
    operation: (old) => old + 3,
    test: (value) => (value % 17 == 0 ? 0 : 1),
    inspections: 0,
    testNumber: 17,
  },
];
