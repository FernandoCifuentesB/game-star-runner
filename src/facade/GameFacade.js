export class GameFacade {
  constructor({ k, scoreService, inputAdapter }) {
    this.k = k;
    this.scoreService = scoreService;
    this.inputAdapter = inputAdapter;
    this.currentCharacter = "cat";
    this.detachInput = null;
  }

  setCharacter(charKey) {
    this.currentCharacter = charKey;
    const pill = document.getElementById("char-pill");
    if (pill) pill.textContent = `Personaje: ${charKey}`;
  }

  start() {
    this.k.go("menu");
  }

  restart() {
    this.k.go("game", { character: this.currentCharacter });
  }

  async saveScore(name, score) {
    return this.scoreService.saveScore(name, score, this.currentCharacter);
  }

  showMenu() {
    this.k.go("menu");
  }

  async showHighScores() {
    this.k.go("highscores");
  }
}
