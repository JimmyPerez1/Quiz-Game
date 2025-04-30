
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
const quiz2 = [ /* ...medium quiz questions */ 

];
const quiz3 = [ /* ...hard quiz questions */ ];
/*----- state variables -----*/
let questionIdx;
let questions;
let results;

/*----- cached elements  -----*/
const questionTextEl = document.getElementById('questionText');
const nxtBtn = document.getElementById('nxtBtn');
const gradeEl = document.getElementById('grade');
const missQuesEl = document.getElementById('missQues');
const playAgainBtn = document.getElementById('playAgainBtn');
const quizSelectEl = document.getElementById('quizSelect');
const quizSelectBtns = quizSelectEl.querySelectorAll('button');
const changeTestBtn = document.getElementById('changeTestBtn');

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
quizSelectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-quiz');
    if (selected === '1') questions = quiz1;
    if (selected === '2') questions = quiz2;
    if (selected === '3') questions = quiz3;

    quizSelectEl.style.display = 'none';
    document.getElementById('questionSec').style.display = 'block';
    document.getElementById('nav').style.display = 'flex';

    init();
  });
});

answerBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    handleAnswers(idx);
  })
});

nxtBtn.addEventListener('click', () => {
    questionIdx++;
    render();
});

playAgainBtn.addEventListener('click', playAgain);

changeTestBtn.addEventListener('click', changeQuiz);

/*----- functions -----*/ 

function init () {
  questionIdx = 0
  questions = quiz1
  results = null

  render();
};

function render() {
  if (questionIdx < questions.length) {
    renderCurrentQuestion();
  } else {
    renderResults();
  }
};

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
};

function handleAnswers(idx) {
  const currentQ = questions[questionIdx];
  currentQ.playerAnswer = idx
  render()
};

function renderResults() {
  document.getElementById('questionSec').style.display = 'none'
  document.getElementById('nav').style.display = 'none'
  document.getElementById('quizTitle').textContent = "Quiz Results";
  document.getElementById('results').style.display = 'block'
  const questionsCorrect = questions.filter(q => q.playerAnswer === q.correctAnswer).length
  let letterGrade
  const percent = (questionsCorrect / questions.length) * 100;

  if (percent >= 90) {
    letterGrade = 'A'
  } else if (percent >= 80) {
    letterGrade = 'B'
  }  else if (percent >= 70) {
    letterGrade = 'C'
  }  else if (percent >= 60) {
    letterGrade = 'D'
  } else {
    letterGrade = 'F'
  }

  gradeEl.textContent = `Final Grade: ${letterGrade} (${questionsCorrect}/${questions.length} correct)`;

let missedList = ''
questions.forEach((q, idx) => {
  if (q.playerAnswer !== q.correctAnswer) {
    missedList += `Q${idx + 1}: ${q.question}<br>Correct Answer: ${q.answers[q.correctAnswer]}<br><br>`
  };
})

missQuesEl.innerHTML = missedList || 'Congrats you got them all right!'
};

function playAgain() {
  init();
  document.getElementById('questionSec').style.display = 'block';
  document.getElementById('nav').style.display = 'flex';
  document.getElementById('results').style.display = 'none';
}

function changeQuiz() {
  document.getElementById('quizTitle').textContent = 'Welcome to your Quiz';
  document.getElementById('quizSelect').style.display = 'block';
  document.getElementById('questionSec').style.display = 'none';
  document.getElementById('nav').style.display = 'none';
  document.getElementById('results').style.display = 'none';
}

init()
