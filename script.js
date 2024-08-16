let readedWordsArray = [];
let readedWord = "";
let readedLetters = "";
let readingLetter = "";
let clickCount = 0;

let mousePad = document.querySelector(".mousePad");
let recepientText = document.getElementById("recepientText");
let previewWord = document.querySelector(".previewWord");
let previewMorse = document.querySelector(".previewMorse");
let previewLetterTyping = document.querySelector(".previewLetterTyping");

let possibleCombinations = new Map([
  // Letters
  ["._", "A"],
  ["_...", "B"],
  ["_._.", "C"],
  ["_..", "D"],
  [".", "E"],
  [".._.", "F"],
  ["__.", "G"],
  ["....", "H"],
  ["..", "I"],
  [".___", "J"],
  ["_._", "K"],
  ["._..", "L"],
  ["__", "M"],
  ["_.", "N"],
  ["___", "O"],
  [".__.", "P"],
  ["__._", "Q"],
  ["._.", "R"],
  ["...", "S"],
  ["_", "T"],
  [".._", "U"],
  ["..._", "V"],
  [".__", "W"],
  ["_.._", "X"],
  ["_.__", "Y"],
  ["__..", "Z"],

  // Numbers
  ["_____", "0"],
  [".____", "1"],
  ["..___", "2"],
  ["...__", "3"],
  ["...._", "4"],
  [".....", "5"],
  ["_....", "6"],
  ["__...", "7"],
  ["___..", "8"],
  ["____.", "9"],

  // Special Characters
  [".__._.", "@"], // @
  ["._._._", "."], // .
  ["__..__", ","], // ,
  ["_.._.", "/"], // /
  // [".____.", "'"],   // '
  ["_...._", "-"], // -
  ["_..._", "="], // =
  [".__._.", "+"], // +
  ["._.._.", '"'], // "
]);

function verifyLetter() {
  if (possibleCombinations.has(readingLetter)) {
    let letter = possibleCombinations.get(readingLetter);
    previewLetterTyping.innerHTML = letter;
    readedLetters = readedLetters.concat(letter);
    previewWord.innerHTML = readedWord;
    return letter;
  } else {
    return "";
  }
}
function registerclick() {
  if (!preventClick) {
    clickCount++;
    setTimeout(() => {
      if (clickCount == 1) {
        singleClickEvent();
      } else if (clickCount == 2) {
        doubleClickEvent();
      } else if (clickCount == 3) {
        tripleClickEvent();
      }
      clickCount = 0;
    }, 600);
  }
}
let holdtimer;
let preventClick = false;
mousePad.addEventListener("mousedown", () => {
  preventClick = false;
  holdtimer = setTimeout(() => {
    preventClick = true;
    fourClickEvent();
  }, 1000);
});
mousePad.addEventListener("mouseup", () => {
  clearTimeout(holdtimer);
});
mousePad.addEventListener("click", registerclick);

function singleClickEvent() {
  console.log("One click");
  readingLetter = readingLetter.concat(".");
  previewMorse.innerHTML = readingLetter;
  verifyLetter();
}
function doubleClickEvent() {
  console.log("double click");
  readingLetter = readingLetter.concat("_");
  previewMorse.innerHTML = readingLetter;
  verifyLetter();
}
function tripleClickEvent() {
  console.log("triple click");
  let letter = verifyLetter();
  readedWord = readedWord.concat(letter);
  readingLetter = "";
  previewWord.innerHTML = readedWord;
  console.log(readedWord);
}
function fourClickEvent() {
  console.log("fourth click");
  readedWordsArray.push(readedWord);
  readedWord = "";
  readingLetter = "";
  previewMorse.innerHTML = ":)";
  previewLetterTyping.innerHTML = ":)";
  previewWord.innerHTML = ":)";
  console.log(readedWordsArray.toString());
  let sentence = '';   
  readedWordsArray.forEach(element => {
    sentence = sentence.concat(element, "");
  })
  recepientText.innerHTML = sentence;
}
