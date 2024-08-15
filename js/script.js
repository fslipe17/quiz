const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $imageContainer = document.querySelector(".image-container")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  $imageContainer.innerHTML = `<img src="${questions[currentQuestionIndex].image}" alt="${questions[currentQuestionIndex].question}">`

  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  while($imageContainer.firstChild) {
    $imageContainer.removeChild($imageContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
    {
      question: "Como escreve Cachorro em ingles?",
      image: "img/Labrador-retriever.jpg",
      answers: [
        { text: "Dinner", correct: false },
        { text: "Dice", correct: false },
        { text: "Dog", correct: true },
        { text: "Dogde", correct: false }
      ]
    },
    {
      question: "Como escreve Gato em ingles?",
      image: "img/gato.jpeg",
      answers: [
        { text: "Cat", correct: true },
        { text: "Gat", correct: false },
        { text: "Nice", correct: false },
        { text: "Gato", correct: false }
      ]
    },
    {
      question: 'Como escreve Martelo em ingles?',
      image: "img/martelo.jpeg",
      answers: [
        { text: 'Hammer', correct: true },
        { text: 'Homer', correct: false },
        { text: 'Helipad', correct: false },
        { text: "Hippo", correct: false }
      ]
    },
    {
      question: 'Como escreve Galinha em ingles?',
      image: "img/galinha.jpeg",
      answers: [
        { text: 'Chicken', correct: true },
        { text: 'Cat', correct: false },
        { text: 'Journal', correct: false },
        { text: "Horse", correct: false }
      ]
    },
    {
      question: 'Como escreve Copo em ingles?',
      image: "img/copo.png",
      answers: [
        { text: 'Glass', correct: false },
        { text: 'Cup', correct: true },
        { text: 'Chassis', correct: false },
        { text: 'Cream', correct: false }
      ]
    },
    {
      question: 'Como escreve Chinelo em ingles?',
      image: "img/chinelo.webp",
      answers: [
        { text: 'Chip', correct: false },
        { text: 'Slipper', correct: true },
        { text: 'Jump', correct: false },
        { text: 'Face', correct: false }
      ]
    },
    {
      question: 'Como escreve Comida em ingles?',
      image: "img/comida.jpg",
      answers: [
        { text: 'Pain', correct: false },
        { text: 'Nail', correct: false },
        { text: 'Glasses', correct: false },
        { text: 'Dinner', correct: true },
      ]
    },
  ]