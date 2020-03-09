const startButton = document.getElementById('start');
const answers = document.querySelector('.answers');
// const timer = document.body.createElement('<div>Timer</div>');
const question = document.querySelector('.question');
const popup = document.querySelector('.popup');

startButton.addEventListener('click', function(){
    console.log('Game Has Started');
    startButton.setAttribute('hidden', true);
    answers.style.display = 'initial';
    

});

//answers in array
//loop within array of possible answers to determine correct one
//new set of questions and answers on click
//timer
//

const btn = document.querySelector('.btn')

btn.addEventListener('click,', function(){
    console.log('Button is clicked');
})