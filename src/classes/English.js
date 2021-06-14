class English {
  static getRandomLetter() {
    const ENGLISH_LETTER_COUNT = 26;
    const newEnglishLetterAsciiCode = Math.floor(Math.random() * ENGLISH_LETTER_COUNT) + 1 + 64;
    return String.fromCharCode(newEnglishLetterAsciiCode);
  }
}

export default English;
