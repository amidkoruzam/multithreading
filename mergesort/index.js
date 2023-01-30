import { pool } from "./pool.js";

pool
  .exec("mergeSort", [4, 2, 5, 10, 1, 9, 7, -1, -6])
  .then((result) => console.log(result));
