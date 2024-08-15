let readedWordsArray = [];
let readedWord = "";
let readingLetter = "";
let subject = document.getElementById("recepientText");

function addToHtml(where, what) {
  where.innerHTML = what;
}

function verifyword(readedWord) {
  switch(readedWord){
    case "._": 
        addToHtml("A",'')
  }
}

let singleClickTimer;
let holdTimer;
let isHolding = false;
let preventClick = false;

document.querySelector(".mousePad").addEventListener("mousedown", () => {
  isHolding = false; // Reset holding state
  preventClick = false; // Reset preventClick flag

  // Start the hold timer when the mouse button is pressed
  holdTimer = setTimeout(() => {
    isHolding = true; // Indicate that a hold action is in progress
    preventClick = true; // Prevent the click event from firing
    readingLetter = readingLetter.concat("_");
    verifyword();
  }, 200); // 1 second hold duration
});

document.querySelector(".mousePad").addEventListener("mouseup", () => {
  clearTimeout(holdTimer); // Cancel the hold action if the mouse is released early

  if (isHolding) {
    isHolding = false; // Reset the hold state
    preventClick = true; // Ensure the click event is prevented
  }
});

document.querySelector(".mousePad").addEventListener("click", () => {
  if (!preventClick) {
    singleClickTimer = setTimeout(() => {
      readingLetter = readingLetter.concat(".");
      verifyword();
    }, 250); // Small delay to distinguish single click
  }
});
