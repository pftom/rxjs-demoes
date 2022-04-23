import DevToolsPlugin from "rxjs-spy-devtools-plugin";
import { create } from "rxjs-spy";

export const spy = create();
const devtoolsPlugin = new DevToolsPlugin(spy, {
  verbose: false,
});

spy.plug(devtoolsPlugin);