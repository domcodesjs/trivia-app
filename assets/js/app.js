$(function () {
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
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };

  const correctSound = new Audio('./assets/sounds/correct-sound.mp3');
  const wrongSound = new Audio('./assets/sounds/wrong-sound.mp3');

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

  function createEndGameScreen() {
    return `
    You scored ${(store.score / store.questions.length) * 100}%!
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

  function createQuizNextButton() {
    if (!(store.questionNumber === store.questions.length - 1)) {
      return '<button class="next-btn" type="button" disabled>Next Question</button>';
    }
    return '<button class="next-btn" type="button" disabled>See Results</button>';
  }

  function render() {
    renderHeader();
    return renderQuestion();
  }

  /********** RENDER FUNCTION(S) **********/
  function renderHeader() {
    $('header').html(createGameHeader());
    return $('header').css('justify-content', 'space-between');
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
    $('main').html(createStartButton());
    return $('.js-start-btn').on('click', startBtnClick);
  }

  /********** EVENT HANDLER FUNCTIONS **********/
  function startBtnClick() {
    store.quizStarted = true;
    renderHeader();
    return renderQuestion(store.questions[store.questionNumber]);
  }

  function onSubmit(e) {
    e.preventDefault();
    const answer = $(this).find('input[type=submit]:focus');
    const currentQuestionIndex = store.questions[store.questionNumber];

    if (checkAnswer(currentQuestionIndex, answer.val())) {
      return correctAnswer.bind(this)(answer);
    } else {
      return wrongAnswer.bind(this)(answer);
    }
  }

  function onQuizButtonClick(str) {
    if (str === 'correct') {
      correctSound.pause();
      correctSound.currentTime = 0;
      if (isGameDone()) {
        return render();
      }
      return renderEndGame();
    } else if (str === 'wrong') {
      wrongSound.pause();
      wrongSound.currentTime = 0;
      if (isGameDone()) {
        return render();
      }
      return renderEndGame();
    }
  }

  /********** HELPER FUNCTIONS **********/
  function checkAnswer(question, givenAnswer) {
    return question.correctAnswer === givenAnswer;
  }

  function getCorrectAnswer() {
    const answerInputs = $('input[type=submit]');
    const answer = store.questions[store.questionNumber - 1].correctAnswer;
    return answerInputs.each(function () {
      if ($(this).val() === answer) {
        $(this).css({
          'background-color': '#2e8540',
          transform: 'scale(1.1)'
        });
      }
    });
  }

  function correctAnswer(answer) {
    incrementScore();
    incrementQuestionNumber();
    renderUpdatedPoints();
    correctSound.play();
    disableSubmitInputs.bind(this)();
    disableTransformCSS();
    modifyAnswerCSS(answer, {
      'background-color': '#2e8540',
      transform: 'scale(1.1)'
    });
    enableNextButton.bind(this)();
    $(this)
      .parent()
      .find('button')
      .on('click', () => onQuizButtonClick('correct'));
  }

  function wrongAnswer(answer) {
    incrementQuestionNumber();
    wrongSound.play();
    disableSubmitInputs.bind(this)();
    disableTransformCSS();
    modifyAnswerCSS(answer, { 'background-color': '#e31c3d' });
    enableNextButton.bind(this)();
    getCorrectAnswer.bind(this)();
    $(this)
      .parent()
      .find('button')
      .on('click', () => onQuizButtonClick('wrong'));
  }

  function modifyAnswerCSS(answer, css) {
    return answer.css(css);
  }

  function enableNextButton() {
    return $(this).parent().find('button').removeAttr('disabled');
  }

  function disableSubmitInputs() {
    return $(this).find('input[type=submit]').attr('disabled', 'disabled');
  }

  function disableTransformCSS() {
    $('input[type=submit]:hover').css('transform', 'scale(1)');
    return $('input[type=submit]:submit').css('transform', 'scale(1)');
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

  $(init);
});
