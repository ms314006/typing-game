class TypingGame {
  constructor() {
    this.started = false;
    this.currentLetter = null;
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
    this.currentLetter = '';
  }

  getTypingGameStarted() {
    return this.started;
  }

  setNewCurrentLetter(letter) {
    this.currentLetter = letter;
  }

  checkIsLetterCorrect(letter) {
    return this.currentLetter === letter;
  }

  getCurrentLetter() {
    return this.currentLetter;
  }
}

export default TypingGame;
