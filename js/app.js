/**
 * Example store structure
 */
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

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
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

function createSubmitButton() {
  return '<button>Submit Answer</button>';
}

function createStartButton() {
  return '<button>Start</button>';
}

function renderQuestion() {
  $('main').append(createQuestion(store.questions[0]));
  $('button').remove();
}

function init() {
  $('main').append(createStartButton());
  $('button').on('click', renderQuestion);
}

init();

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
