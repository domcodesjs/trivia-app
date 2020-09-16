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
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/
function createQuestion(question) {
  console.log(question.answers);
  return `
    <div>
      <h1>${question.question}</h1>
      <ul>
        ${question.answers.map((answer) => `<li>${answer}</li>`).join('')}
      </ul>
    </div>
  `;
}

function createStartButton() {
  return '<button>Start</button>';
}

function createSubmitButton() {
  return '<button>Submit Answer</button>';
}

function init() {
  $('main').append(createStartButton());
  $('button').on('click', () => renderQuestion(store));
}

/********** RENDER FUNCTION(S) **********/
function renderQuestion(store) {
  $('main').append(createQuestion(store.questions[0]));
  $('button').remove();
}

/********** EVENT HANDLER FUNCTIONS **********/
function checkAnswer(question, givenAnswer) {
  return question.correctAnswer === givenAnswer;
}

function answerOnClick() {}

// These functions handle events (submit, click, etc)
$(init);
