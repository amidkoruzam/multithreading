import workerpool from "workerpool";

export const pool = workerpool.pool("./mergesort/sort.js");
