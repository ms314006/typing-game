class TypingGame {
  constructor() {
    this.started = false;
    this.letterQueue = [];
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
    this.letterQueue = [];
  }

  getTypingGameStarted() {
    return this.started;
  }

  addNewCurrentLetterToQueue(letter) {
    this.letterQueue.unshift(letter);
  }

  checkIsLetterCorrect(letter) {
    if (this.getCurrentLetter() === letter) {
      this.letterQueue.pop();
      return true;
    }
    return false;
  }

  getCurrentLetter() {
    return this.letterQueue[1];
  }

  getNextLetter() {
    return this.letterQueue[0];
  }
}

export default TypingGame;
