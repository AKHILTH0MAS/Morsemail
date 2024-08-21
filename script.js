let readedWordsArray = [];
let readedWord = "";
let readedLetters = "";
let readingLetter = "";
let clickCount = 0;
let focusCounter = 0;
let capslock = false;
let controlFocus = false;

let mousePad = document.querySelector(".mousePad");
let recepientText = document.getElementById("recepientText");
let subjectText = document.getElementById("subjectText");
let bodyText = document.getElementById("bodyText");
let previewMorse = document.querySelector(".previewMorse");
let previewLetter = document.querySelector(".previewLetter");

let holdtimer;
let preventClick = false;
let focusText;
let controlFocusCounter = 0;

let possibleCombinations = new Map([
  // Letters
  ["._", "a"],
  ["_...", "b"],
  ["_._.", "c"],
  ["_..", "d"],
  [".", "e"],
  [".._.", "f"],
  ["__.", "g"],
  ["....", "h"],
  ["..", "i"],
  [".___", "j"],
  ["_._", "k"],
  ["._..", "l"],
  ["__", "m"],
  ["_.", "n"],
  ["___", "o"],
  [".__.", "p"],
  ["__._", "q"],
  ["._.", "r"],
  ["...", "s"],
  ["_", "t"],
  [".._", "u"],
  ["..._", "v"],
  [".__", "w"],
  ["_.._", "x"],
  ["_.__", "y"],
  ["__..", "z"],

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
  [".____.", "'"], // '
  ["_...._", "-"], // -
  ["_..._", "="], // =
  ["._._._.", "+"], // +
  ["._.._.", '"'], // "
]);

function addCursor() {
  let cursor = `<span class="cursor">|</span>`;
  focusText.insertAdjacentHTML("beforeend", cursor);
  let cursorVisible = true;
  setInterval(() => {
    let cursor = document.querySelector(".cursor");
    cursor.style.color = cursorVisible ? "#000" : "#fff";
    cursorVisible = !cursorVisible;
  }, 600);
}
function verifyLetter() {
  if (possibleCombinations.has(readingLetter)) {
    let letter = capslock
      ? possibleCombinations.get(readingLetter).toUpperCase()
      : possibleCombinations.get(readingLetter);
    previewLetter.innerHTML = letter;
    readedLetters = readedLetters.concat(letter);
    return letter;
  } else {
    previewLetter.innerHTML = "Letter";
    return "";
  }
}
function registerclick() {
  if (!controlFocus) {
    if (!preventClick) {
      clickCount++;
      setTimeout(() => {
        if (clickCount == 1) {
          singleClickEvent();
        } else if (clickCount == 2) {
          doubleClickEvent();
        } else if (clickCount == 3) {
          tripleClickEvent();
        } else if (clickCount == 4) {
          backspace();
        }
        clickCount = 0;
      }, 600);
    }
  } else {
    if (!preventClick) {
      clickCount++;
      setTimeout(() => {
        if (clickCount == 1) {
          singleClickChangeFocus();
        } else if (clickCount == 2) {
          doubleClickChangeFocus();
        }
        clickCount = 0;
      }, 400);
    }
  }
}

document.querySelector("body").addEventListener("mousedown", () => {
  preventClick = false;
  holdtimer = setTimeout(() => {
    preventClick = true;
    changeFocusOntoControlBox();
  }, 1000);
});
document.querySelector("body").addEventListener("mouseup", () => {
  clearTimeout(holdtimer);
});

document.querySelector("body").addEventListener("click", registerclick);

function singleClickEvent() {
  readingLetter = readingLetter.concat(".");
  previewMorse.innerHTML = readingLetter;
  verifyLetter();
}

function doubleClickEvent() {
  readingLetter = readingLetter.concat("_");
  previewMorse.innerHTML = readingLetter;
  verifyLetter();
}

function tripleClickEvent() {
  let letter = verifyLetter();
  readedWord = readedWord.concat(letter);
  focusText.innerHTML = readedWord;
  readingLetter = "";
  previewMorse.innerHTML = "Morse";
  previewLetter.innerHTML = "Letter";
  addCursor();
}

function backspace() {
  readingLetter = readingLetter.slice(0, readingLetter.length - 1);
  verifyLetter();
  previewMorse.innerHTML = readingLetter;
}

function ChangeWhereToType() {
  if (focusText != undefined) {
    focusText.style.border = "none";
    focusText.removeChild(document.querySelector(".cursor"));
  }
  if (focusCounter < 3) {
    focusCounter++;
  } else {
    focusCounter = 1;
  }
  if (focusCounter == 1) {
    focusText = recepientText;
    focusText.style.borderBottom = "1px solid #000";
  } else if (focusCounter == 2) {
    focusText.style.border = "none";
    focusText = subjectText;
    focusText.style.borderBottom = "1px solid #000";
  } else if (focusCounter == 3) {
    focusText.style.border = "none";
    focusText = bodyText;
    focusText.style.borderBottom = "1px solid #000";
  }
  readingLetter = "";
  readedWord = "";
}
ChangeWhereToType();
let focusItems = document.querySelectorAll(".ArrowBox");

function changeFocusOntoControlBox() {
  controlFocus = !controlFocus;
  if (controlFocus) {
    focusItems[controlFocusCounter].style.background = "#ececec";
  } else {
    focusItems[controlFocusCounter].style.background = "#FFF";
  }
}

function singleClickChangeFocus() {
  if (capslock && controlFocusCounter == 1) {
    focusItems[1].style.background = "#F2E8C6";
  } else {
    focusItems[controlFocusCounter].style.background = "#FFF";
  }
  if (controlFocusCounter < 5) {
    controlFocusCounter++;
  } else {
    controlFocusCounter = 0;
  }
  focusItems[controlFocusCounter].style.background = "#ececec";
}

function doubleClickChangeFocus() {
  if (controlFocusCounter == 0) {
    //backspace
    readedWord = readedWord.slice(0, -1);
    focusText.innerHTML = readedWord;
    addCursor();
  } else if (controlFocusCounter == 1) {
    //capslock
    capslock = !capslock;
    if (capslock) {
      focusItems[1].style.background = "#F2E8C6";
    }
  } else if (controlFocusCounter == 2) {
    // space
    readedWord = readedWord.concat(" ");
    focusText.innerHTML = readedWord;
    addCursor();
  } else if (controlFocusCounter == 3) {
    //enter
    readedWord = readedWord.concat("<br>");
    focusText.innerHTML = readedWord;
  } else if (controlFocusCounter == 4) {
    ChangeWhereToType();
  } else if (controlFocusCounter == 5) {
    //send
  }
}
