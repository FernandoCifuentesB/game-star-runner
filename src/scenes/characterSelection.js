import { CONFIG } from "../config.js";

export function defineCharacterScene(k, game) {
  k.scene("character", () => {
    const chars = ["cat", "dog", "capy"];
    let idx = chars.indexOf(game.currentCharacter);
    if (idx < 0) idx = 0;

    k.add([
      k.text("Selecciona personaje", { size: 28 }),
      k.pos(k.center().x, 60),
      k.anchor("center"),
    ]);

    const cards = chars.map((key, i) => {
      const x = k.center().x + (i - 1) * 160;
      return k.add([
        k.sprite(key, { width: 64, height: 64 }),
        k.pos(x, 160),
        k.anchor("center"),
        { key },
      ]);
    });

    function render() {
      cards.forEach((c, i) => {
        c.scale = i === idx ? 1.4 : 1.0;
        c.outline = i === idx ? 4 : 0;
      });
    }
    render();

    k.onKeyPress("left", () => {
      idx = (idx - 1 + chars.length) % chars.length;
      render();
    });
    k.onKeyPress("right", () => {
      idx = (idx + 1) % chars.length;
      render();
    });
    k.onKeyPress("enter", () => {
      game.setCharacter(chars[idx]);
      k.go("menu");
    });
    k.onKeyPress("escape", () => k.go("menu"));
  });
}
