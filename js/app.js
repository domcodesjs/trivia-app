const store = {
  questions: [
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020'
    },
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020'
    },
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020'
    },
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020'
    },
    {
      question: 'What color is broccoli?',
      answers: ['red', 'orange', 'pink', 'green'],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020'
    }
  ],
  quizStarted: false,
  loading: false,
  questionNumber: 0,
  score: 0
};

const correctSound = new Audio('../sound/correct-sound.mp3');
const wrongSound = new Audio('../sound/wrong-sound.mp3');

// const categories = {
//   'General Knowledge': 1,
//   'Science: Computers': 455,
//   'Science: Mathematics': 34,
//   'Science & Nature': 2,
//   Mythology: 3,
//   Sports: 4,
//   Geography: 5,
//   History: 6,
//   Politics: 7,
//   Art: 8,
//   Celebrities: 8,
//   Animals: 8,
//   Vehicles: 8,
//   Animal: 8
// };

// function getQuestions(category, difficulty) {
//   // also have a local json file with some categories/questions I could locally pull from
//   const API_URL = 'https://opentdb.com/api.php?amount=10';
//   const fetchPromise = fetch(API_URL);

//   function shuffleAnswers(arr) {
//     return arr.sort(() => Math.random() - 0.5);
//   }

//   return fetchPromise
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => {
//       store.questions = res.results.map((question) => {
//         return {
//           question: question.question,
//           answers: shuffleAnswers([
//             ...question.incorrect_answers,
//             question.correct_answer
//           ]),
//           correctAnswer: question.correct_answer
//         };
//       });
//       console.log(store);
//     });
// }

// getQuestions();

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
    <button class="js-next-btn done-btn" type="button">Next Question</button>
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

function createGameHeader() {
  return `
    <h2>Score ${store.score}</h2>
    <h1>Trivia</h1>
    <h2>Question ${store.questionNumber + 1}/${store.questions.length}</h2>
  `;
}

function render() {
  renderHeader();
  renderQuestion();
}

/********** RENDER FUNCTION(S) **********/
function renderHeader() {
  $('header').html(createGameHeader());
  $('header').css('justify-content', 'space-between');
}

function renderQuestion() {
  $('main').html(createQuestion(store.questions[store.questionNumber]));
  return $('form').on('submit', onSubmit);
}

function renderUpdatedPoints() {
  return $('header h2:first').text(`Score: ${store.score}`);
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
  renderHeader();
  renderQuestion(store.questions[store.questionNumber]);
}

function onSubmit(e) {
  e.preventDefault();
  const answer = $(this).find('input[type=submit]:focus');
  if (checkAnswer(store.questions[store.questionNumber], answer.val())) {
    store.score += 1;
    store.questionNumber += 1;
    renderUpdatedPoints();
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
        return render();
      });
  } else {
    store.questionNumber += 1;
    wrongSound.play();
    $(this).find('input[type=submit]').attr('disabled', 'disabled');
    answer.css('background-color', '#e31c3d');
    $(this).parent().find('button').removeAttr('disabled');
    getCorrectAnswer.bind(this)();
    $(this)
      .parent()
      .find('button')
      .on('click', () => {
        wrongSound.pause();
        wrongSound.currentTime = 0;
        return render();
      });
  }
}

/********** HELPER FUNCTIONS **********/
function checkAnswer(question, givenAnswer) {
  return question.correctAnswer === givenAnswer;
}

function getCorrectAnswer() {
  const answerInputs = $('input[type=submit]');
  const answer = store.questions[store.questionNumber - 1].correctAnswer;
  // console.log(answerInputs);
  return answerInputs.each(function () {
    if ($(this).val() === answer) {
      $(this).css('background-color', '#2e8540');
    }
  });
}

function isGameDone() {
  if (store.questionNumber <= store.questions.length - 1) {
    return false;
  }
  return true;
}

// Start it up
$(init);
