function fitsInOneBox(boxes) {
  return (
    boxes
      .sort((x, y) => y.l + y.w + y.h - (x.l + x.w + x.h))
      .filter(
        (box, i) =>
          !i ||
          (boxes[i - 1].l > box.l &&
            boxes[i - 1].w > box.w &&
            boxes[i - 1].h > box.h)
      ).length == boxes.length
  );
}

const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 },
  { l: 2, w: 10, h: 2 },
];

console.log(fitsInOneBox(boxes));
