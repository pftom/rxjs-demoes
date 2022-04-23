import React, { useState, useEffect } from "react";
import { fromEvent, merge, mapTo, scan } from "rxjs";

export default function Merge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    merge(
      fromEvent(document.querySelector(".plus-button"), "click").pipe(mapTo(1)),
      fromEvent(document.querySelector(".minus-button"), "click").pipe(
        mapTo(-1)
      )
    )
      .pipe(scan((total, curr) => total + curr, 0))
      .subscribe((val) => {
        setCount(val);
      });
  }, []);

  return (
    <div>
      <div className="count">{count}</div>
      <button className="plus-button">+</button>
      <button className="minus-button">-</button>
    </div>
  );
}
