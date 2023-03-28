// Importando o objeto de arrays, com as perguntas e respostas.
import questions from "./questions.js";

// Pegando os elementos via DOM.
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const numberQuestion = document.querySelector(".numberQuestion");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

// Variaves que nos auxilia para acessarmos.
let currentIndex = 0;

// Variaves contadora de acertos
let questionsCorrect = 0;

// Função para reiniciar o jogo.
// A função será disparada quando o usuário clicar no botão restart
// que aparece no final do jogo.
btnRestart.onclick = () => {

  // A div com class content é colocada como display flex, isso fará ela surgir 
  // iniciando o jogo.
  content.style.display = "flex";

  // A div com class contentFinish é colocada como display none, isso fará ela sumir.
  contentFinish.style.display = "none";

  // No restart, o currentIndex é zerado, pois o objeto sempre se inicia no indice 0
  // dessa maneira não temos conflito, e a variavel também não carregara lixo.
  currentIndex = 0;

  // A variavel questionsCorrect também é zerada, para contar de forma correta o novo inicio do game.
  questionsCorrect = 0;

  // A função loadQuestion é chamada, pois é ela que carrega o jogo.
  loadQuestion();

};

function nextQuestion(e) {

  // Se a resposta clicada for a correta, adicionamos +1 ao contador de RESPOSTA CERTA.
  if (e.target.getAttribute("data-correct") === "true") {

    questionsCorrect++;

  }
  
  // Se o index atual for menor que o tamanho do objeto de arrays QUESTIONS
  // iremos adicionar +1 no index atual e chamar a proxima questão, até o momento que isso for false.
  if (currentIndex < questions.length - 1) {

    currentIndex++;
    loadQuestion();

  } 
  // Se o index atual for igual ou maior que o tamanho do objeto
  // chamamos a função finish, pois todas as perguntas foram respondidas.
  else {

    finish();

  }

}

function finish() {

  // Imprime o resultado na tela.
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  
  // A div com class content é colocada como display none, isso fará ela sumir.
  content.style.display = "none";
  
  // A div com class contentFinish é colocada como display flex, isso fará ela surgir 
  // e mostrar o resultado final.
  contentFinish.style.display = "flex";

}

function loadQuestion() {

  // Imprime na tela o número da questão atual / a quantidade de questão no total.
  numberQuestion.innerHTML = `${currentIndex + 1}/${questions.length}`;
  
  // Pega a pergunta conforme o index atual.
  const item = questions[currentIndex];
  
  // Limpa as respostas, para ser preenchidas com as respostas seguintes.
  answers.innerHTML = "";

  // Preenchendo a div com a questão
  question.innerHTML = item.question;

  // Utilizamos um forEach para percorrer o objeto de arrays e criar a div com os buttons.
  // Essa div seria as alternativas da questão.
  item.answers.forEach((answer) => {

    // Criamos uma div.
    const div = document.createElement("div");

    // Preenchendo a div.
    // Resultado: <button class="answer" data-correct="true/false"> 3 </button>.
    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    // Inserindo a DIVFILHO COM SEU CONTEUDO ( BUTTON ) na DIV pai de ID ANSWERS.
    answers.appendChild(div);

  });

  // Percorrendo e armazenando as respostas da pergunta atual.
  document.querySelectorAll(".answer").forEach((item) => {

    // Assim que uma das resposta ( item ) é clicada, a função nextQuestion é chamada.
    item.addEventListener("click", nextQuestion);

  });

}

loadQuestion();
