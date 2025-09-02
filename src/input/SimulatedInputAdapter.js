import { IInputAdapter } from "./IInputAdapter.js";

export class SimulatedInputAdapter extends IInputAdapter {
  attach(k, actions) {
    const cleanups = [];

    function add(handler) {
      if (typeof handler === "function") {
        cleanups.push(handler);
      }
    }

    let dir = 1;

    add(
      k.loop(0.2, () => {
        if (Math.random() < 0.05) dir *= -1;
        if (dir < 0) actions.left();
        else actions.right();

        if (Math.random() < 0.12) actions.jump();
      })
    );

    return () => {
      cleanups.forEach((off) => {
        if (typeof off === "function") off();
      });
    };
  }
}
