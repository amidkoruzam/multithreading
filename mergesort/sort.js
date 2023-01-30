import workerpool from "workerpool";
import { pool } from "./pool.js";

function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

export async function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);

  const l = pool.exec("mergeSort", [left]);
  const r = pool.exec("mergeSort", [array]);

  const [sortedL, sortedR] = await Promise.all([l, r]);

  return merge(sortedL, sortedR);
}

workerpool.worker({
  mergeSort: mergeSort,
});
