export function log(text, color = null) {
  return console.log(text, color);
}

export function questionLog(text) {
  return log(`%c${text}`, "color: GoldenRod");
}

export function endQuestionLog() {
  return log("%c<!-- eof: question -->", "color: crimson");
}
