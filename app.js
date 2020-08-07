//Global variables

var questionIndex = 0; // Declaring the initial Value that cycles through the quiz's possible answers
var score = ''; // Declaring the initial Value of the user's score
var highScores = []; // Declaring the initially empty array for the highscores that pass through and from local storage
var questionsAsked = 0; // Variable to keep track of the number of questions asked
//Array that contains the quiz questions
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts'
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses'
  },
  {
    title:
      'Which typing convention is widely accepted as the norm in the coding community?',
    choices: ['giraffe bumps', 'camel case', 'lemur tail', 'squirrel sprint'],
    answer: 'camel case'
  },
  {
    title: 'An HTML element created by JavaScript is called ____.',
    choices: ['JSON', 'DOM Object', 'AJAX', 'An Array'],
    answer: 'DOM Object'
  },
  {
    title:
      'CSS file links are contained by which kind of tags in an HTML page?',
    choices: ['<body>', '<html>', '<div>', '<head>'],
    answer: '<head>'
  }
];

QuizGame = function() {
  // Game variables here
  console.log('Game has started');
  timeLeft = 60; // Sets the timer initially to 60
  //===================Landing Page Section=============================

  $('.init-page')
    .append($('<h1>').text('Coding Quiz Challenge'))
    .append(
      $('<p>').text(
        'Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!'
      )
    )
    .append(
      $('<button>')
        .text('Start Quiz')
        .addClass('button')
        .on('click', start)
    ); // Press the button to start the game
};
//===================Quiz Game Section================================

function start() {
  console.log('Game has started');
  $('.init-page').empty(); //Empties inital page so that

  //Timer countdown script, to start counting down after the start button is pressed
  countDown = setInterval(function() {
    document.getElementById('timer').innerHTML = timeLeft;
    timeLeft -= 1;

    if (timeLeft <= 0) {
      clearInterval(countDown);
      document.getElementById('timer').innerHTML = '00';
      changeScore();
    }
  }, 1000);
  firstQuestion();
}

// Ask the first question
function firstQuestion() {
  let currentItem = questions[questionIndex];
  for (i = 0; i <= currentItem.choices.length - 1; i++) {
    document.querySelector('#title').innerHTML = currentItem.title; //presents the question to the user
    $('.possible-answers').append(
      $(`<button id=${i}>`)
        .addClass('button')
        .text([i + 1] + ' ' + questions[questionIndex].choices[i]) //.append($("<div>").addClass("possible-answers").
        .on('click', function(event) {
          //Sean helped by hard pressing the "i" value into the code.
          let currentQuestion =
            questions[questionIndex].choices[event.target.id];
          let currentAnswer = questions[questionIndex].answer;

          if (currentAnswer == currentQuestion) {
            $('#prompt')
              .append('<hr>')
              .append($('<p>').text('Right!!!'));
          } else {
            timeLeft = timeLeft - 10;
            $('#prompt')
              .append('<hr>')
              .append($('<p>').text('Wrong!!!'));
          }
          nextQuestion(questions[++questionIndex]);
        })
    );
  }
}

// Ask the next question, repeat
function nextQuestion(nextItem) {
  //nextItem's value needs to increment through iterations

  questionsAsked += 1; //Go to the next question in the array
  setTimeout(function() {
    //returns contents to empty state
    $('#prompt').empty();
    $('.possible-answers').empty();
    document.querySelector('#title').innerHTML = nextItem.title; //presents the question to the user

    for (i = 0; i <= questions[questionIndex].choices.length - 1; i++) {
      $('.possible-answers').append(
        $(`<button id=${i}>`)
          .addClass('button')
          .text([i + 1] + ' ' + nextItem.choices[i])
          .on('click', function(event) {
            //Sean helped by hard pressing the "i" value into the code.
            let currentQuestion =
              questions[questionIndex].choices[event.target.id];
            let currentAnswer = questions[questionIndex].answer;

            if (questionsAsked <= questions.length) {
              if (currentAnswer == currentQuestion) {
                $('#prompt')
                  .append('<hr>')
                  .append($('<p>').text('Right!!!'));
              } else {
                timeLeft = timeLeft - 10;
                $('#prompt')
                  .append('<hr>')
                  .append($('<p>').text('Wrong!!!'));
              }
              nextQuestion(questions[++questionIndex]);
            }
            if (questionsAsked == questions.length) {
              changeScore(); //Go to the input score to leaderboard section
            }
          })
      );
    }
  }, 1000);
}

//=================Change Score Section===============================

function changeScore() {
  clearInterval(countDown);
  setTimeout(function() {
    $('.ask-question').empty(); //Empties the question page

    score = document.getElementById('timer').innerHTML; // Copies the time left to become the score

    //Loads the changeScore page info
    $('.changeScore-page')
      .append($('<h2>').text('All Done!'))
      .append($('<p>').text('Your final score is ' + score + '.'))
      .append(
        $('<p>')
          .text('Enter Initials: ')
          .append($('<input>').addClass('initials'))
          .append(
            $('<button type=submit>')
              .addClass('button')
              .text('Submit')
              .on('click', passValue)
          )
      );
  }, 1000);
}

function passValue() {
  var existingHighScores = JSON.parse(localStorage.getItem('highScores'));
  if (existingHighScores == null) existingHighScores = [];
  let userInitials = $('.initials').val();
  let userScoreInput = userInitials + '-' + score; //Pair the users initials with their score
  existingHighScores.push(userScoreInput); //Add the users score to the highscore array
  highScores = existingHighScores;
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.replace('leaderboard.html'); // Go to leaderboard page
  leaderBoard(); //Load leaderboard script
}

//============Leader Board Section======================================

function leaderBoard() {
  $('.highscore-buttons') //Button that returns to start page
    .append(
      $('<button>')
        .text('Start Quiz')
        .addClass('button')
        .on('click', Reload)
    ); //Start the quiz again

  $('.highscore-buttons') //Button that clears local storage
    .append(
      $('<button>')
        .text('Clear Highscores')
        .addClass('button')
        .on('click', function() {
          $('.highscore-list').empty();
          localStorage.clear();
        })
    );
  retrievedHighScores = JSON.parse(localStorage.getItem('highScores'));

  for (i = 0; i < retrievedHighScores.length; i++) {
    //Creates the leaderboard from the hghscores in local storage
    $('.highscore-list').append($('<li>').text(retrievedHighScores[i])); // Go t]hrough stored high scores and display on screen
  }
}

function Reload() {
  QuizGame(); // Restart quizgame
  window.location.replace('index.html'); // Go to leaderboard page
}
QuizGame(); //Start the game
