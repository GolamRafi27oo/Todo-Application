import { useState } from "react";
import { useStore } from "../store/bareStore";

export default function Bar() {
  const {
    bears,
    increasePopulation,
    removeAllBears,
    updateBears,
    getUpdate,
    getValue,
  } = useStore();

  return (
    <>
      <div className="flex gap-4">
        <h1>{bears}</h1>
        <button onClick={increasePopulation}>inc</button>
        <button onClick={removeAllBears}>Clear</button>
        <input
          className="bg-amber-50 text-black"
          type="number"
          onChange={(e) => getUpdate(Number(e.target.value))}
        />
        <button
          onClick={() => {
            updateBears(getValue);
          }}>
          Update value
        </button>
      </div>
    </>
  );
}
