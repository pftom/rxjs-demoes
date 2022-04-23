import React, { useState, useEffect } from "react";
import jsonp from "jsonp";

export default function OperatorsNormal() {
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
          } else resolve(data);
        }
      );
    });
  };

  const debounce = (fn, delay) => {
    let timer;

    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const takeLatestRequest = (promiseCreator) => {
    let index = 0;
    return function () {
      index++;
      const promise = promiseCreator.apply(this, arguments);

      function guardLatest(func, reqIndex) {
        return function () {
          if (reqIndex === index) {
            func.apply(this, arguments);
          }
        };
      }

      return new Promise(function (resolve, reject) {
        promise.then(guardLatest(resolve, index), guardLatest(reject, index));
      });
    };
  };

  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    const latestRequest = takeLatestRequest(searchWikiPedia);
    let lastInputValue = "";

    inputSearch.addEventListener(
      "input",
      debounce((e) => {
        if (!e.target.value) return;
        if (lastInputValue === e.target.value) return;
        else lastInputValue = e.target.value;

        latestRequest(e.target.value)
          .then((data) => setItems(data[1] || []))
          .catch((err) => console.log(err));
      }, 250)
    );
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
