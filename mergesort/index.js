import { Worker } from "worker_threads";

const worker = new Worker("./mergesort/sort.js", {
  workerData: { array: [4, 2, 5, 10, 1, 9, 7, -1, -6] },
});

const result = await new Promise((res) =>
  worker.once("message", (result) => res(result))
);

console.log(result);
