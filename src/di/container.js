export class Container {
  constructor() {
    this._map = new Map();
  }
  register(key, factory) {
    this._map.set(key, factory);
  }
  resolve(key) {
    const f = this._map.get(key);
    if (!f) throw new Error("No existe dependencia: " + key);
    return f(this);
  }
}
