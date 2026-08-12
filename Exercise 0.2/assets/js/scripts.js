const questions = document.querySelectorAll('.faq-question'); // basically finds all the 3 buttons 
console.log(questions); // this checks if its correct or not

questions.forEach(function(question) { // a for each loop 
    question.addEventListener('click', function() { // waits for the click 
        console.log('clicked'); // opens the answer for the question that has been triggered by a click
    });
});

