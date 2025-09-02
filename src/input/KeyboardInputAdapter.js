import { IInputAdapter } from "./IInputAdapter.js";

export class KeyboardInputAdapter extends IInputAdapter {
  attach(k, actions) {
    const cleanups = [];

    function add(handler) {
      if (typeof handler === "function") {
        cleanups.push(handler);
      }
    }

    add(k.onKeyDown("left", actions.left));
    add(k.onKeyDown("a", actions.left));
    add(k.onKeyRelease("left", actions.stop));
    add(k.onKeyRelease("a", actions.stop));

    add(k.onKeyDown("right", actions.right));
    add(k.onKeyDown("d", actions.right));
    add(k.onKeyRelease("right", actions.stop));
    add(k.onKeyRelease("d", actions.stop));

    add(k.onKeyPress("space", actions.jump));
    add(k.onKeyPress("up", actions.jump));
    add(k.onKeyPress("w", actions.jump));

    add(k.onKeyPress("escape", actions.pause));

    return () => {
      cleanups.forEach((off) => {
        if (typeof off === "function") off();
      });
    };
  }
}
