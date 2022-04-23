import React, { useState } from "react";

export default function Merge() {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div className="count">{count}</div>
      <button className="plus-button" onClick={handlePlus}>
        +
      </button>
      <button className="minus-button" onClick={handleMinus}>
        -
      </button>
    </div>
  );
}
