import React, { useState, useEffect } from "react";
import jsonp from "jsonp";
import {
  fromEvent,
  switchMap,
  debounceTime,
  filter,
  map,
  distinctUntilChanged,
} from "rxjs";
import { tag } from "rxjs-spy/operators/tag";
import { spy } from "../../utils";

export default function OperatorsRxJS() {
  const [items, setItems] = useState([]);

  const searchWikiPedia = (search) => {
    return new Promise((resolve, reject) => {
      return jsonp(
        `http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=${search}&callback=JSON_CALLBACK`,
        null,
        (err, data) => {
          if (err) {
            console.log("err", err);
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        tag("map"),
        filter((val) => val),
        debounceTime(250),
        tag("debounceTime"),
        distinctUntilChanged(),
        tag("distinctUntilChanged"),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });
  }, []);

  return (
    <div>
      <input type="text" className="search" />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
