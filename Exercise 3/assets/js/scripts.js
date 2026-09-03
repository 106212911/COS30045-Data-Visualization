const questions = document.querySelectorAll('.faq-question'); // basically finds all the 3 buttons 
console.log(questions); // this checks if its correct or not

questions.forEach(function(question) { // a for each loop 
    question.addEventListener('click', function() { // waits for the click 
        question.nextElementSibling.classList.toggle('show-answer'); // grabs the answer when I click, and toggle on of the answer if clicked again
    });
});

document.getElementById('current-year').textContent = new Date().getFullYear();