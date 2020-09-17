$(function () {
  const correctSound = new Audio('./assets/sounds/correct-sound.mp3');
  const incorrectSound = new Audio('./assets/sounds/incorrect-sound.mp3');
  const questions = [
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
    }
  ];
  const store = {
    questions: shuffle(questions),
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  /********** TEMPLATE GENERATION FUNCTIONS **********/
  function createQuestion(question) {
    return `
    <h1>${question.question}</h1>  
    <form class="trivia-question">
      ${question.answers
        .map((answer) => `<input type="submit" value=${answer} >`)
        .join('')}
    </form>
    ${createQuizNextButton()}
  `;
  }

  function createScore() {
    return `
      <h3>You scored ${(store.score / store.questions.length) * 100}%!</h3>
    `;
  }

  function createStartButton() {
    return '<button class="js-start-btn">Start</button>';
  }

  function createGameHeader() {
    return `
    <h2>Score: ${store.score}</h2>
    <h1>Trivia</h1>
    <h2>Question ${store.questionNumber + 1}/${store.questions.length}</h2>
  `;
  }

  function createPlayAgainButton() {
    return `
      <button class="js-play-again-btn play-again-btn">Play Again</button>
    `;
  }

  function createQuizNextButton() {
    if (!(store.questionNumber === store.questions.length - 1)) {
      return '<button class="next-btn" type="button" disabled>Next Question</button>';
    }
    return '<button class="next-btn" type="button" disabled>See Results</button>';
  }

  /********** RENDER FUNCTION(S) **********/
  function renderHeader() {
    $('header').html(createGameHeader());
    return $('header').css('justify-content', 'space-between');
  }

  function renderQuestion() {
    $('main').html(createQuestion(store.questions[store.questionNumber]));
    return $('form').on('submit', onQuizSubmit);
  }

  function renderUpdatedPoints() {
    return $('header h2:first').text(`Score: ${store.score}`);
  }

  function renderResults() {
    $('header h2').css('display', 'none');
    $('header').css('justify-content', 'center');
    $('main').html(`
      <div class="end-game">
        ${createScore()}
        ${createPlayAgainButton()}
      </div>
    `);
    return $('.js-play-again-btn').on('click', restartGame);
  }

  function render() {
    renderHeader();
    return renderQuestion();
  }

  /********** EVENT HANDLER FUNCTIONS **********/
  function restartGame() {
    resetState();
    renderHeader();
    return renderQuestion(store.questions[store.questionNumber]);
  }

  function startButtonClicked() {
    store.quizStarted = true;
    renderHeader();
    return renderQuestion(store.questions[store.questionNumber]);
  }

  function onQuizSubmit(e) {
    e.preventDefault();
    const answer = $(this).find('input[type=submit]:focus');
    const currentQuestionIndex = store.questions[store.questionNumber];

    if (checkAnswer(currentQuestionIndex, answer.val())) {
      return correctAnswer.bind(this)(answer);
    } else {
      return incorrectAnswer.bind(this)(answer);
    }
  }

  function onQuizButtonNextClick(str) {
    if (str === 'correct') {
      resetSound('correct');
      if (isGameDone()) {
        return render();
      }
      return renderResults();
    }
    resetSound('incorrect');
    if (isGameDone()) {
      return render();
    }
    return renderResults();
  }

  /********** HELPER FUNCTIONS **********/
  function checkAnswer(question, givenAnswer) {
    return question.correctAnswer === givenAnswer;
  }

  function resetState() {
    store.questions = shuffle(questions);
    store.questionNumber = 0;
    return (store.score = 0);
  }

  function getCorrectAnswer() {
    const answerInputs = $('input[type=submit]');
    const answer = store.questions[store.questionNumber - 1].correctAnswer;
    return answerInputs.each(function () {
      if ($(this).val() === answer) {
        $(this).css('background-color', '#2e8540');
        $(this).addClass('animate__animated animate__wobble');
      }
    });
  }

  function correctAnswer(answer) {
    incrementScore();
    incrementQuestionNumber();
    renderUpdatedPoints();
    playSound('correct');
    disableSubmitInputs.bind(this)();
    disableTransformCSS();
    answer.addClass('animate__animated animate__tada');
    modifyAnswerCSS(answer, {
      'background-color': '#2e8540'
    });
    enableNextButton.bind(this)();
    return addQuizNextButtonListener.bind(this)('correct');
  }

  function playSound(str) {
    if (str === 'correct') {
      return correctSound.play();
    }
    return incorrectSound.play();
  }

  function resetSound(str) {
    if (str === 'correct') {
      correctSound.pause();
      return (correctSound.currentTime = 0);
    }
    incorrectSound.pause();
    return (incorrectSound.currentTime = 0);
  }

  function incorrectAnswer(answer) {
    incrementQuestionNumber();
    playSound('incorrect');
    disableSubmitInputs.bind(this)();
    disableTransformCSS();
    modifyAnswerCSS(answer, { 'background-color': '#e31c3d' });
    enableNextButton.bind(this)();
    getCorrectAnswer.bind(this)();
    return addQuizNextButtonListener.bind(this)('incorrect');
  }

  function addQuizNextButtonListener(str) {
    return $(this)
      .parent()
      .find('button')
      .on('click', () => onQuizButtonNextClick(str));
  }

  function enableNextButton() {
    return $(this).parent().find('button').removeAttr('disabled');
  }

  function disableSubmitInputs() {
    return $(this).find('input[type=submit]').attr('disabled', 'disabled');
  }

  function incrementScore() {
    return (store.score += 1);
  }

  function incrementQuestionNumber() {
    return (store.questionNumber += 1);
  }

  function isGameDone() {
    if (store.questionNumber === store.questions.length) {
      return false;
    }
    return true;
  }

  function modifyAnswerCSS(answer, css) {
    return answer.css(css);
  }
  function disableTransformCSS() {
    $('input[type=submit]:hover').css('transform', 'scale(1)');
    return $('input[type=submit]:submit').css('transform', 'scale(1)');
  }

  /********** INIT FUNCTION **********/
  function init() {
    $('main').html(createStartButton());
    return $('.js-start-btn').on('click', startButtonClicked);
  }

  $(init);
});
