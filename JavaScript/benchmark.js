const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let TIME_LIMIT = 40; // Impostazione iniziale del timer
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function formatTime(time) {
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `${seconds}`;
  }

  return `<div id="cowntdown">SECONDS <div id="tempo">${seconds}</div> REMANING</div>`;
}

const resetTimerAndCountDown = function () {
  // Resetta le variabili di timer e countdown
  timePassed = 0;
  timeLeft = TIME_LIMIT;

  // Imposta TIME_LIMIT sulla difficoltà corrente della domanda
  resetTimer(questions[questionNumber].difficulty);

  // Aggiorna l'etichetta del timer
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

  // Resetta l'animazione del timer
  document
    .getElementById("base-timer-path-remaining")
    .classList.remove(
      "base-timer__path-remaining-warning",
      "base-timer__path-remaining-alert"
    );
  // Resetta il timer
  clearInterval(timerInterval);

  // Riavvia il timer
  startTimer();
};
function onTimesUp() {
  timePassed = 0; // Azzerare il tempo passato
  resetTimerAndCountDown();
  // Controlla se ci sono altre domande prima di passare alla successiva
  displayNextQuestion();
}

function startTimer() {
  const startTime = Date.now(); // Salva il tempo di inizio
  let previousTimePassed = 0; // Aggiungi questa variabile per tenere traccia del tempo trascorso prima della risposta

  timerInterval = setInterval(() => {
    const currentTime = Date.now(); // Ottieni il tempo corrente
    timePassed = previousTimePassed + (currentTime - startTime); // Calcola il tempo passato in millisecondi
    timeLeft = Math.max(0, TIME_LIMIT - Math.floor(timePassed / 1000));
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft <= 0) {
      onTimesUp();
      previousTimePassed = 0; // Resetta il tempo trascorso prima della risposta
    }
  }, 1000);
}

// Funzione per fermare il timer
function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer(difficulty) {
  switch (difficulty) {
    case "easy":
      TIME_LIMIT = 30;
      break;
    case "medium":
      TIME_LIMIT = 45;
      break;
    case "hard":
      TIME_LIMIT = 60;
      break;
  }
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  if (timeLeft <= alert.threshold) {
    remainingPathColor = alert.color;
  } else if (timeLeft <= warning.threshold) {
    remainingPathColor = warning.color;
  } else {
    remainingPathColor = info.color; // Colore predefinito
  }

  document
    .getElementById("base-timer-path-remaining")
    .classList.remove(info.color, warning.color, alert.color);
  document
    .getElementById("base-timer-path-remaining")
    .classList.add(remainingPathColor);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

let score = 0;
let questionNumber = 0;
function calculatePercentage(score, totalQuestions) {
  return (score / totalQuestions) * 100;
}
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
const divQuestions = document.getElementById("txtquestion");
const buttonAnswerDiv = document.getElementById("txtnumberedquestion");

const displayBooleanAnswers = function (question) {
  return `
      <button type="button" onclick='checkAnswer("${question.incorrect_answers[0]}")'>${question.incorrect_answers[0]}</button>
      <button type="button" onclick='checkAnswer("${question.correct_answer}")'>${question.correct_answer}</button>
    `;
};

const displayMultipleChoice = function (question) {
  return `
      <button type="button" onclick='checkAnswer("${question.correct_answer}")'>${question.correct_answer}</button>
      <button type="button" onclick='checkAnswer("${question.incorrect_answers[0]}")'>${question.incorrect_answers[0]}</button>
      <button type="button" onclick='checkAnswer("${question.incorrect_answers[1]}")'>${question.incorrect_answers[1]}</button>
      <button type="button" onclick='checkAnswer("${question.incorrect_answers[2]}")'>${question.incorrect_answers[2]}</button>
    `;
};
const currentQuestion = questions[questionNumber];
let actualQuestion = questions.indexOf(currentQuestion) + 1;
let maxQuestion = questions.length;

const displayQuestion = function () {
  document.getElementById("questions").innerHTML =
    "QUESTION" +
    " " +
    actualQuestion +
    '<span class="custompurpletext">' +
    "/" +
    maxQuestion +
    "</span>";
  if (questionNumber < questions.length) {
    const currentQuestion = questions[questionNumber];

    resetTimerAndCountDown();

    divQuestions.innerHTML = `<div>${currentQuestion.question}</div>`;

    if (currentQuestion.type === "boolean") {
      buttonAnswerDiv.innerHTML = `${displayBooleanAnswers(currentQuestion)}`;
    } else {
      buttonAnswerDiv.innerHTML = `${displayMultipleChoice(currentQuestion)}`;
    }
  } else {
    const percentage = calculatePercentage(score, questions.length);
    localStorage.setItem("quizPercentage", percentage);
    window.location.href = "resultspage.html";
  }
};
//Funzione per visualizzare la prossima domanda
const displayNextQuestion = function () {
  // Se ci sono ancora domande, mostra la prossima
  if (questionNumber < questions.length - 1) {
    questionNumber++;
    actualQuestion++;
    displayQuestion();
  } else {
    // Il gioco è terminato, mostra il punteggio finale
    const percentage = calculatePercentage(score, questions.length);
    localStorage.setItem("quizPercentage", percentage);
    window.location.href = "resultspage.html";
    resetTimerAndCountDown(); // Resetta il timer quando il gioco è completato
  }
};
const handleAnswer = function (userAnswer) {
  const currentQuestion = questions[questionNumber];
  if (userAnswer === currentQuestion.correct_answer) {
    score++;
    alert("Risposta corretta! +1 punto");
  } else {
    alert("Risposta errata!");
  }

  localStorage.setItem("score", score);
  // Passa alla prossima domanda
  displayNextQuestion();
};
const checkAnswer = function (userAnswer) {
  handleAnswer(userAnswer);
  stopTimer();
  startTimer();
};

// Avvia il gioco mostrando la prima domanda
displayQuestion();
