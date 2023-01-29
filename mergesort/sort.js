import { fileURLToPath } from "url";
import { parentPort, workerData, Worker } from "worker_threads";

const __filename = fileURLToPath(import.meta.url);

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

async function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);

  const l = new Worker(__filename, { workerData: { array: left } });
  const r = new Worker(__filename, { workerData: { array } });

  const pSortedL = new Promise((res) =>
    l.once("message", (result) => res(result))
  );

  const pSortedR = new Promise((res) =>
    r.once("message", (result) => res(result))
  );

  const [sortedL, sortedR] = await Promise.all([pSortedL, pSortedR]);

  return merge(sortedL, sortedR);
}

mergeSort(workerData.array).then((result) => parentPort.postMessage(result));
