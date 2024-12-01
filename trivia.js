// All Blocks
let startBlock = document.querySelector(".startBlock");
let playerSetupBlock = document.querySelector(".playerSetupBlock");
let confirmationBlock = document.querySelector(".confirmationBlock");
let quizDisplayBlock = document.querySelector(".quizDisplayBlock");
let resultBlock = document.querySelector(".resultBlock");
let exitBlock = document.querySelector(".exitBlock");

//Variables using in Other Blocks
let player1Name;
let player2Name;
let quizQuestions = [];
let quizOptions = [];
let questionIndex = 0;
let playerIndex = 0;
let player1Score = 0;
let player2Score = 0;

//Start Block
let startBlockButton = document.querySelector(".startBlockButton");

//Event Listener - Start Block
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

//Event Listeners - Playersetup Block
playerSetupBlockButton.addEventListener("click", () => {
  player1Name = player1Element.value.trim();
  player2Name = player2Element.value.trim();
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
};

//Confirmation Block
let confirmationBlockBackButton = document.querySelector(
  ".confirmationBlockBackButton"
);
let confirmationStartBackButton = document.querySelector(
  ".confirmationBlockStartButton"
);
let questionLoaderIndicator = document.querySelector(
  ".questionLoaderIndicator"
);

//Event Listener - Confirmation Block
confirmationBlockBackButton.addEventListener("click", () => {
  quizQuestions = [];
  questionLoaderIndicator.textContent = "";
  confirmationBlock.classList.add("hide");
  playerSetupBlock.classList.remove("hide");
});

//Event Listener - Confirmation Block
confirmationStartBackButton.addEventListener("click", () => {
  if (quizQuestions.length == 0) {
    questionLoaderIndicator.textContent =
      "Loading Questions. Click Start again...!!!";
    return;
  } else {
    feedQuestion();
    questionLoaderIndicator.textContent = "";
  }
  confirmationBlock.classList.add("hide");
  quizDisplayBlock.classList.remove("hide");
});

//Quiz Block
let questionElement = document.querySelector(".question");
let optionButton = document.querySelectorAll(".optionButton");
let option1Element = document.querySelector(".option1");
let option2Element = document.querySelector(".option2");
let option3Element = document.querySelector(".option3");
let option4Element = document.querySelector(".option4");
let playerTurnIndicatorElement = document.querySelector(".playerTurnIndicator");
let difficultyLevelIndicator = document.querySelector(
  ".difficultyLevelIndicator"
);

//Event Listener - Quiz Block
for (let i = 0; i < optionButton.length; i++) {
  optionButton[i].addEventListener("click", () => {
    checkAnswersAndAddScore(
      optionButton[i].textContent,
      questionIndex,
      playerIndex
    );
    questionIndex++;
    playerIndex = playerIndex == 0 ? 1 : 0;
    feedQuestion();
  });
}

//Result Block
let resultDeclarationElement = document.querySelector(".resultDeclaration");
let player1ScoreDisplayElement = document.querySelector(".player1ScoreDisplay");
let player2ScoreDisplayElement = document.querySelector(".player2ScoreDisplay");
let resultBlockRestartButton = document.querySelector(
  ".resultBlockRestartButton"
);
let categoryOptions = document.getElementsByTagName("option");
let resultBlockExitButton = document.querySelector(".resultBlockExitButton");

//Event Listener - Result Block
resultBlockRestartButton.addEventListener("click", () => {
  if (categoryOptions.length == 0) {
    alert("You Played All category...");
    return;
  }
  player1Name = "";
  player2Name = "";
  quizQuestions = [];
  quizOptions = [];
  questionIndex = 0;
  playerIndex = 0;
  player1Score = 0;
  player2Score = 0;
  resultBlock.classList.add("hide");
  playerSetupBlock.classList.remove("hide");
});
//Event Listener - Result Block
resultBlockExitButton.addEventListener("click", () => {
  resultBlock.classList.add("hide");
  exitBlock.classList.remove("hide");
});

//Helper Function to feed question in page
const feedQuestion = () => {
  if (questionIndex > quizQuestions.length - 1) {
    document.querySelector(`.${categorySelectionElement.value}`).remove();
    quizDisplayBlock.classList.add("hide");
    resultBlock.classList.remove("hide");
    declareWinner(player1Score, player2Score);
    player1ScoreDisplayElement.textContent = `${player1Name}'s Score : ${player1Score}`;
    player2ScoreDisplayElement.textContent = `${player2Name}'s Score : ${player2Score}`;
  } else if (quizQuestions.length > 0) {
    quizOptions = [
      quizQuestions[questionIndex].correctAnswer,
      ...quizQuestions[questionIndex].incorrectAnswers,
    ];
    shuffleOptions(quizOptions);
    difficultyLevelIndicator.textContent = ` ${quizQuestions[questionIndex].difficulty}`;
    playerTurnIndicatorElement.textContent =
      playerIndex == 0 ? `${player1Name}'s Turn` : `${player2Name}'s Name`;
    questionElement.textContent = `${questionIndex + 1}.${
      quizQuestions[questionIndex].question.text
    }`;
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

//Helper Function to add scores
const checkAnswersAndAddScore = (
  answer,
  questionIndexNumber,
  playerIndexNumber
) => {
  if (quizQuestions[questionIndex].correctAnswer == answer) {
    let questionScore = dificultyScoreValuator(
      quizQuestions[questionIndexNumber].difficulty
    );
    playerIndexNumber == 0
      ? (player1Score += questionScore)
      : (player2Score += questionScore);
  }
};

//helper function to give scores based on difficulty
const dificultyScoreValuator = (difficultyType) => {
  switch (difficultyType) {
    case "easy":
      return 10;
    case "medium":
      return 15;
    case "hard":
      return 20;
  }
};

//Helper Function to declare winner
const declareWinner = (player1Point, player2Point) => {
  if (player1Point > player2Point) {
    resultDeclarationElement.textContent = `${player1Name} wins...!!!`;
  } else if (player1Point < player2Point) {
    resultDeclarationElement.textContent = `${player2Name} wins...!!!`;
  } else {
    resultDeclarationElement.textContent = `Tie Game...!!!`;
  }
};
