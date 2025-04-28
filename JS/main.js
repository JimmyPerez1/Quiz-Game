
/*----- constants -----*/
const quiz1 = [
  {
    question: "Why don't skeletons fight each other?",
    answers: ['They dont have the guts', 'Theyre too bony', 'They prefer to haunt', 'They have stage fright'],
    correctAnswer: 0,
    playerAnswer: null
  },
  {
    question: 'What do you call fake spaghetti?',
    answers: ['A noodle fraud', 'An impastor ', 'A fauxgini', 'A Pasta-party'],
    correctAnswer: 1,
    playerAnswer: null
  },
  {
    question: 'Why did the golfer bring two pairs of pants?',
    answers: ['He plays messy', 'In case he got a hole in one', "It's the dress code", 'To match his golf shoes'],
    correctAnswer: 1,
    playerAnswer: null
  },
  {
    question: 'Why did the scarecrow win an award?',
    answers: ['Best costume', 'He was very brave', 'Outstanding in his field', 'He scares the best'],
    correctAnswer: 2,
    playerAnswer: null
  },
  {
    question: "Why can't you give Elsa a balloon?",
    answers: ["She'll pop it", "She'll freeze it", "She'll fly away", "She'll let it go"],
    correctAnswer: 3,
    playerAnswer: null
  },
  {
    question: "How does a penguin build it's house?",
    answers: ['With snow bricks', 'By sliding into place', 'It glues it together', 'With icy willpower'],
    correctAnswer: 2,
    playerAnswer: null
  },
  {
    question: 'What did the ocean say to the beach?',
    answers: ['Nothing, it just waved', "Let's tide together", 'You shore are pretty', 'Catch the drift'],
    correctAnswer: 0,
    playerAnswer: null
  },
  {
    question: 'Why did the math book look sad?',
    answers: ['It failed a test', 'It had too many problems', 'It lost its numbers', 'It was divided'],
    correctAnswer: 1,
    playerAnswer: null
  },
  {
    question: 'I only know 25 letters of the alphabet. Why?',
    answers: ['I forgot the rest', 'Z is missing', 'Q is silent', "I don't know Y."],
    correctAnswer: 3,
    playerAnswer: null
  },
  {
    question: "Why don't eggs tell jokes?",
    answers: ['They crack each other up', 'They scramble the punchline', "They're too shellfish", 'They get poached'],
    correctAnswer: 0,
    playerAnswer: null
  }
];

/*----- state variables -----*/
let questionIdx;
let questions;
let results;

/*----- cached elements  -----*/
const questionTextEl = document.getElementById('questionText');
const prevBtn = document.getElementById('prevBtn');
const nxtBtn = document.getElementById('nxtBtn');

const answerBtns = [
  document.getElementById('aBtn'),
  document.getElementById('bBtn'),
  document.getElementById('cBtn'),
  document.getElementById('dBtn')
];

const answerTexts = [
  document.getElementById('aTxt'),
  document.getElementById('bTxt'),
  document.getElementById('cTxt'),
  document.getElementById('dTxt')
];
/*----- event listeners -----*/


/*----- functions -----*/ 

function init () {
  questionIdx = 0
  questions = quiz1 //just incase I want to make multiple quizzes later 
  results = null

  render();
}

function render() {
  if (questionIdx < questions.length) {
    renderCurrentQuestion();
  } else {
    renderResults();
  }
}

function renderCurrentQuestion() {
  const currentQ = questions[questionIdx];
  questionTextEl.textContent = currentQ.question;
  currentQ.answers.forEach((answer, idx) => {
    answerTexts[idx].textContent = answer;
  })
  answerBtns.forEach(btn => {
    btn.classList.remove('selected')
  })
  if (currentQ.playerAnswer !== null) {
    answerBtns[currentQ.playerAnswer].classList.add('selected')
  }
}

init()
// 	On page load: pop up to select a quiz  (icebox for now get the quiz working first)
//  so for now Show first question and answers
// 	On answer click: Record selection, highlight choice
// 	On “Next”: Advance to next question
// 	On last question: Calculate final score and grade
// 	On quiz end: Display grade, missed questions, replay/change options
// 	“Play Again”: Reset state and replay
// 	“Change Test”: Select new quiz category