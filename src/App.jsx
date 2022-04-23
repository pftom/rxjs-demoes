import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MergeRxJS from "./pages/merge/merge-rxjs";
import MergeNormal from "./pages/merge/merge";
import NestedNormal from "./pages/nested/nested-normal";
import NestedRxJS from "./pages/nested/nested-rxjs";
import OperatorsNormal from "./pages/operators/operators-normal";
import OperatorsRxJS from "./pages/operators/operators-rxjs";
import DebugRxJS from "./pages/debug/debug-rxjs";
import StateManagement from "./pages/state-management";

import { spy } from "./utils";
import { of } from "rxjs";
import { tag } from "rxjs-spy/operators/tag";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              对 Stream 进行合并操作
              <ul>
                <li>
                  <Link to="/merge-normal">merge-normal</Link>
                </li>
                <li>
                  <Link to="/merge-rxjs">merge-rxjs</Link>
                </li>
              </ul>
            </li>
            <li>
              多重嵌套 Stream
              <ul>
                <li>
                  <Link to="/nested-normal">nested-normal</Link>
                </li>
                <li>
                  <Link to="/nested-rxjs">nested-rxjs</Link>
                </li>
              </ul>
            </li>
            <li>
              Operators 的强大魔法
              <ul>
                <li>
                  <Link to="/operators-normal">operators-normal</Link>
                </li>
                <li>
                  <Link to="/operators-rxjs">operators-rxjs</Link>
                </li>
              </ul>
            </li>
            <li>
              实现状态管理
              <ul>
                <li>
                  <Link to="/state-management">state-management</Link>
                </li>
              </ul>
            </li>
            <li>
              Debug RxJS 应用
              <ul>
                <li>
                  <Link to="/debug-rxjs">debug-rxjs</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <hr />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/merge-normal" element={<MergeNormal />} />
          <Route path="/merge-rxjs" element={<MergeRxJS />} />
          <Route path="/nested-normal" element={<NestedNormal />} />
          <Route path="/nested-rxjs" element={<NestedRxJS />} />
          <Route path="/operators-normal" element={<OperatorsNormal />} />
          <Route path="/operators-rxjs" element={<OperatorsRxJS />} />
          <Route path="/debug-rxjs" element={<DebugRxJS />} />
          <Route path="/state-management" element={<StateManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    spy.teardown();
  });
}
