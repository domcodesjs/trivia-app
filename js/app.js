const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2020', '2019', '2005'],
      correctAnswer: '2020'
    },
    {
      question: 'What is the day?',
      answers: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      correctAnswer: 'Friday'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/
function createQuestion(question) {
  return `
    <div class="trivia-question">
      <h1>${question.question}</h1>
      <ul class="trivia-question-answers">
        ${question.answers.map((answer) => `<li>${answer}</li>`).join('')}
      </ul>
    </div>
  `;
}

function createEndGameScreen() {
  return `
    You got ${store.score} out of ${store.questions.length} right!
  `;
}

function createStartButton() {
  return '<button>Start</button>';
}

// optional
// function createSubmitButton() {
//   return '<button>Submit Answer</button>';
// }

function init() {
  $('main').append(createStartButton());
  $('button').on('click', startBtnClick);
}

/********** RENDER FUNCTION(S) **********/
function renderQuestion(question) {
  $('main').html(createQuestion(question));
  $('.trivia-question-answers').on('click', 'li', answerOnClick);
}

function renderEndGame() {
  return $('main').html(createEndGameScreen());
}

/********** EVENT HANDLER FUNCTIONS **********/
function checkAnswer(question, givenAnswer) {
  return question.correctAnswer === givenAnswer;
}

function startBtnClick() {
  store.quizStarted = true;
  renderQuestion(store.questions[0]);
}

function answerOnClick() {
  if (checkAnswer(store.questions[store.questionNumber], $(this).text())) {
    store.score += 1;
    store.questionNumber += 1;
    return isGameDone()
      ? renderEndGame()
      : renderQuestion(store.questions[store.questionNumber]);
  } else {
    store.questionNumber += 1;
    return isGameDone()
      ? renderEndGame()
      : renderQuestion(store.questions[store.questionNumber]);
  }
}

function isGameDone() {
  if (store.questionNumber <= store.questions.length - 1) {
    return false;
  }
  return true;
}

// These functions handle events (submit, click, etc)
$(init);
