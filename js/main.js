// Questions Array
const Questions = [
    {question: 'Enter Your First Name' },
    {question: 'Enter Your Last Name' },
    {question: 'Enter Your Email', pattern:/\S+@\S+\.\S+/ },
    {question: 'Create A Password', type: 'password' }
];

// transform Times
const shakeTime = 100; // shake transform Time
const switchTime = 200; // transform Betwween questions

// Init Position At First Questiion 
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//Events

// Get Question On DOm Load
document.addEventListener('DOMContentLoaded', getQuestions);

// Next Button Click
nextBtn.addEventListener('click', validate )


// Input Field Enter Keyup
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13) {
        validate();
    }
})
// FUNCTION

// Get Question Form Array & Add To Markup
function getQuestions() {
    // Get Current question
    inputLabel.innerHTML = Questions[position].question;
    // Get Current Type 
    inputField.type = Questions[position].type || 'text';
    // Get Current Answer
    inputField.value = Questions[position].answer || '';
    // Fouse On Element
    inputField.focus();

    // Set Progress Bar  Width - Variable To the Question Length
    progress.style.width = (position * 100) / Questions.length + '%';
    
    // Add User Icons OR Back Array Depanding On Question 
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

// Display Question To User 
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transform = '';
    inputProgress.style.width = '100%'; 
}

// Hide Question To User
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transform = 'none';
    inputGroup.style.border = null; 
}

// transform To Create Shake Motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// VAlidate Field
function validate() {
    // Make Sure Pattern Matches If Thare Is One 
    if(!inputField.value.match(Questions[position].pattern || /.+/)
    ){
        inputFail();
    } else {
        inputPass();
    }
}

// Filed Input Fail
function inputFail() {
formBox.className = 'error';
for(let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
}
}

// Field Input Passed
function inputPass() {
 formBox.className = '';
 setTimeout(transform, shakeTime * 0, 0, 10);
 setTimeout(transform, shakeTime * 1, 0, 0);

// Store Answer In Array
Questions[position].answer = inputField.value;
 // Increament The Position
 position++;

 // If New Question, Hide Current and Get Next
if(Questions[position]) {
    hideQuestion();
    getQuestions();
} else {
    // Remove If No More Question
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
}
}

// All Fields Complete - Show h1 end
function formComplete() {
  
    const h1 =document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks '${Questions[0].answer} ${Questions[1].answer}' You are registered and will get an email shortly `));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}