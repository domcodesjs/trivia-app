# Trivia App

#### [Live Site Hosted with Vercel](https://trivia-app-p0isgd8ek.vercel.app/)

#### [Live Site Hosted with Github Pages](https://domcodesjs.github.io/trivia-app/)

### User experience requirements

The following requirements cover what the app must do, from the user's perspective.

- [x] The starting screen should have a button that users can click to start the quiz.
- [x] Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
  - [x] Users should be asked questions 1 after the other.
  - [x] Users should only be prompted with 1 question at a time.
- [x] Users should not be able to skip questions.
- [x] Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
- Upon submitting an answer, users should:
  - [x] Receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
  - [x] Be moved onto the next question (or interact with an element to move on). Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked. Users should be able to start a new quiz.

### Technical requirements

Your quiz app must:

- [x] Include a render() function, that conditionally regenerates the view each time the store is updated.
- [x] Include single-purpose template generation functions.
- [x] Include event handler functions.
- [x] NOT add additional HTML elements to the boilerplate code's index.html file (you may add attributes, e.g., classes and ids, to the existing HTML elements, or link stylesheets or additional scripts if necessary).
- [x] Render answer choices in a <form>.
- [x] Use semantic HTML, along with CSS and jQuery.
      Follow a11y best practices.
- [x] Be fully usable by keyboard (which will be easy enough if you start with a form).
- [x] Use responsive design.
  - Refer back to the previous checkpoints on responsive design and forms for any help with the HTML/CSS materials.
