const store = {
  // 5 or more questions are required
  questions: [],
  quizStarted: false,
  loading: false,
  questionNumber: 0,
  score: 0
};

// any 10 multiple
// https://opentdb.com/api.php?amount=10&type=multiple

const categories = {
  'General Knowledge': 1,
  'Science: Computers': 455,
  'Science: Mathematics': 34,
  'Science & Nature': 2,
  Mythology: 3,
  Sports: 4,
  Geography: 5,
  History: 6,
  Politics: 7,
  Art: 8,
  Celebrities: 8,
  Animals: 8,
  Vehicles: 8,
  Animal: 8
};

function getQuestions(category, difficulty) {
  const API_URL = 'https://opentdb.com/api.php?amount=10';
  const fetchPromise = fetch('https://opentdb.com/api.php?amount=10');

  function shuffleAnswers(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  return fetchPromise
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.questions = res.results.map((question) => {
        return {
          question: question.question,
          answers: shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer
          ]),
          correctAnswer: question.correct_answer
        };
      });
      console.log(store);
    });
}

console.log(getQuestions());

const correctSound = new Audio('../sound/correct-sound.mp3');
const wrongSound = new Audio('../sound/wrong-sound.mp3');

/********** TEMPLATE GENERATION FUNCTIONS **********/
function createQuestion(question) {
  return `
    <h1>${question.question}</h1>  
    <form class="trivia-question">
      ${question.answers
        .map((answer) => `<input type="submit" value=${answer} >`)
        .join('')}
    </form>
    <button class="js-next-btn next-btn" type="button" disabled>Next Question</button>
  `;
}

function createEndGameScreen() {
  return `
    You got ${store.score} out of ${store.questions.length} right!
  `;
}

function createStartButton() {
  return '<button class="js-start-btn">Start</button>';
}

/********** RENDER FUNCTION(S) **********/
function renderQuestion(question) {
  $('main').html(createQuestion(question));
  $('form').on('submit', onSubmit);
  $('form').on('click', '.js-next-btn', () => console.log('asdf'));
}

function renderNextButton() {
  $('main').append(createNextButton());
}

function renderEndGame() {
  return $('main').html(createEndGameScreen());
}

function init() {
  $('main').append(createStartButton());
  $('.js-start-btn').on('click', startBtnClick);
}

/********** EVENT HANDLER FUNCTIONS **********/
function startBtnClick() {
  store.quizStarted = true;
  renderQuestion(store.questions[0]);
}

function onSubmit(e) {
  e.preventDefault();
  const answer = $(this).find('input[type=submit]:focus');
  if (checkAnswer(store.questions[store.questionNumber], answer.val())) {
    store.score += 1;
    store.questionNumber += 1;
    correctSound.play();
    $(this).find(':submit').attr('disabled', 'disabled');
    answer.css('background-color', '#2e8540');
    $(this).parent().find('button').removeAttr('disabled');
    $(this)
      .parent()
      .find('button')
      .on('click', () => {
        correctSound.pause();
        correctSound.currentTime = 0;
        return renderQuestion(store.questions[store.questionNumber]);
      });
  } else {
    store.questionNumber += 1;
    wrongSound.play();
    $(this).find('input[type=submit]').attr('disabled', 'disabled');
    answer.css('background-color', '#e31c3d');
    $(this).parent().find('button').removeAttr('disabled');
    $(this)
      .parent()
      .find('button')
      .on('click', () => {
        wrongSound.pause();
        wrongSound.currentTime = 0;
        return renderQuestion(store.questions[store.questionNumber]);
      });
  }
}

/********** HELPER FUNCTIONS **********/
function checkAnswer(question, givenAnswer) {
  return question.correctAnswer === givenAnswer;
}

function getCorrectAnswer(question) {
  return question.correctAnswer;
}

function isGameDone() {
  if (store.questionNumber <= store.questions.length - 1) {
    return false;
  }
  return true;
}

// Start it up
$(init);
