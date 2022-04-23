import React, { useState, useEffect } from "react";

export default function NestedNormal() {
  useEffect(() => {
    let canvas = document.querySelector(".canvas");
    let ctx = canvas.getContext("2d");

    const draw = (e) => {
      ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };

    ctx.beginPath();

    canvas.addEventListener("mousedown", (e) => {
      ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop);
      canvas.addEventListener("mousemove", draw);
    });

    canvas.addEventListener("mouseup", (e) => {
      canvas.removeEventListener("mousemove", draw);
    });
  });

  return (
    <div>
      <canvas
        className="canvas"
        style={{ border: "1px solid black" }}
        width={400}
        height={400}
      ></canvas>
    </div>
  );
}
