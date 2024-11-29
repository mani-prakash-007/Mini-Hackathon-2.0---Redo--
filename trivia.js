// All Blocks
let startBlock = document.querySelector(".startBlock");
let playerSetupBlock = document.querySelector(".playerSetupBlock");
let confirmationBlock = document.querySelector(".confirmationBlock");

//Variables using in Other Blocks
let player1Name;
let player2Name;
let alreadySelectedCategories = [];
let quizQuestions = [];

//Start Block
let startBlockButton = document.querySelector(".startBlockButton");

startBlockButton.addEventListener("click", () => {
  startBlock.classList.add("hide");
  playerSetupBlock.classList.remove("hide");
});

//Player Setup block
let player1Element = document.querySelector("#player1");
let player2Element = document.querySelector("#player2");
let categorySelectionElement = document.querySelector("#quizCategory");
let player1ErrorMessage = document.querySelector(".player1ErrorMessage");
let player2ErrorMessage = document.querySelector(".player2ErrorMessage");
let playerSetupBlockButton = document.querySelector(".playerSetupBlockButton");
let player1NameDisplayElement = document.querySelector(".player-1");
let player2NameDisplayElement = document.querySelector(".player-2");
let categoryDisplay = document.querySelector(".categoryDisplay");

playerSetupBlockButton.addEventListener("click", () => {
  player1Name = player1Element.value.trim();
  player2Name = player2Element.value.trim();
  console.log(categorySelectionElement.value);
  if (!player1Name) {
    player1ErrorMessage.textContent = "Enter Player-1 Name 🙄";
    player2ErrorMessage.textContent = "";
    return;
  } else if (!player2Name) {
    player1ErrorMessage.textContent = "";
    player2ErrorMessage.textContent = "Enter Player-2 Name 🙄";
    return;
  } else if (player1Name.toLowerCase() == player2Name.toLowerCase()) {
    errorMessage.textContent =
      "Player-1 and Player-2 Names are same. Use different names...!!";
  } else {
    player1ErrorMessage.textContent = "";
    player2ErrorMessage.textContent = "";
    player1NameDisplayElement.textContent = `Player-1 🦁: ${player1Name}`;
    player2NameDisplayElement.textContent = `Player-2 🐯: ${player2Name}`;
    categoryDisplay.textContent = `** ${categorySelectionElement.value} **`;
    generateQuestions(categorySelectionElement.value);
    playerSetupBlock.classList.add("hide");
    confirmationBlock.classList.remove("hide");
  }
});

//Helper Function to get Questions from
const generateQuestions = async (category) => {
  let easyQuestions = await fetch(
    `https://the-trivia-api.com/v2/questions?limit=2&categories=${category}&difficulties=easy`
  );
  let mediumQuestions = await fetch(
    `https://the-trivia-api.com/v2/questions?limit=2&categories=${category}&difficulties=medium`
  );
  let hardQuestions = await fetch(
    `https://the-trivia-api.com/v2/questions?limit=2&categories=${category}&difficulties=hard`
  );
  // quizQuestions.push(...(await easyQuestions.json()));
  // quizQuestions.push(...(await mediumQuestions.json()));
  // quizQuestions.push(...(await hardQuestions.json()));
  quizQuestions = [
    ...(await easyQuestions.json()),
    ...(await mediumQuestions.json()),
    ...(await hardQuestions.json()),
  ];
  quizQuestions.forEach((element) => {
    console.log(element);
    console.log(element.difficulty);
  });
};

//Confirmation Block

let confirmationBlockBackButton = document.querySelector(
  ".confirmationBlockBackButton"
);
let confirmationStartBackButton = document.querySelector(
  ".confirmationBlockStartButton"
);

confirmationBlockBackButton.addEventListener("click", () => {
  confirmationBlock.classList.add("hide");
  playerSetupBlock.classList.remove("hide");
});

confirmationStartBackButton.addEventListener("click", () => {
  console.log("displayQuestion function invoked");
});
