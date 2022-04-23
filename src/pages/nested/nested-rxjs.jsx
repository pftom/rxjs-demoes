import React, { useState, useEffect } from "react";
import { fromEvent, mapTo, tap, takeUntil, mergeMap, mergeAll } from "rxjs";

export default function NestedRxJS() {
  useEffect(() => {
    let canvas = document.querySelector(".canvas");
    let ctx = canvas.getContext("2d");

    const draw = (e) => {
      ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };

    ctx.beginPath();

    fromEvent(canvas, "mousedown")
      .pipe(tap((e) => ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop)))
      .pipe(
        mergeMap(
          fromEvent(canvas, "mousemove").pipe(
            takeUntil(fromEvent(canvas, "mouseup"))
          )
        )
      )
      .subscribe((e) => {
        console.log("he", e);
        // draw(e);
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
