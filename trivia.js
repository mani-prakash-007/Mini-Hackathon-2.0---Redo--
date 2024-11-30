// All Blocks
let startBlock = document.querySelector(".startBlock");
let playerSetupBlock = document.querySelector(".playerSetupBlock");
let confirmationBlock = document.querySelector(".confirmationBlock");
let quizDisplayBlock = document.querySelector(".quizDisplayBlock");

//Variables using in Other Blocks
let player1Name;
let player2Name;
let alreadySelectedCategories = [];
let quizQuestions = [];
let quizOptions = [];
let questionIndex = 0;
let playerIndex = 0;
let player1Score = 0;
let player2Score = 0;

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
  confirmationBlock.classList.add("hide");
  quizDisplayBlock.classList.remove("hide");
  feedQuestion();
});

//Quiz Block
let questionElement = document.querySelector(".question");
let optionButton = document;
let option1Element = document.querySelector(".option1");
let option2Element = document.querySelector(".option2");
let option3Element = document.querySelector(".option3");
let option4Element = document.querySelector(".option4");
let playerTurnIndicatorElement = document.querySelector(".playerTurnIndicator");
let difficultyLevelIndicator = document.querySelector(
  ".difficultyLevelIndicator"
);

const feedQuestion = () => {
  console.log(quizQuestions.length);
  if (quizQuestions.length == 0) {
    questionElement.textContent = "Loading...";
    option1Element.textContent = "Loading...";
    option2Element.textContent = "Loading...";
    option3Element.textContent = "Loading...";
    option4Element.textContent = "Loading...";
  } else if (quizQuestions.length > 0) {
    quizOptions = [
      quizQuestions[questionIndex].correctAnswer,
      ...quizQuestions[questionIndex].incorrectAnswers,
    ];
    shuffleOptions(quizOptions);
    difficultyLevelIndicator.textContent = `Difficulty : ${quizQuestions[questionIndex].difficulty}`;
    questionElement.textContent = quizQuestions[questionIndex].question.text;
    option1Element.textContent = quizOptions[0];
    option2Element.textContent = quizOptions[1];
    option3Element.textContent = quizOptions[2];
    option4Element.textContent = quizOptions[3];
  }
};

//Helper Function for Shuffling Options
const shuffleOptions = (optionsArray) => {
  for (let i = 0; i < optionsArray.length; i++) {
    let j = Math.floor(Math.random() * 4);
    let temp = optionsArray[i];
    optionsArray[i] = optionsArray[j];
    optionsArray[j] = temp;
  }
};
