var score = 0;

const quiz_data =
[

{
    question: "Что такое электрический ток?",
    options: [
        "хаотичное движение свободных электронов",
        "направленное движение заряженных частиц",
        "нагревание проводника под напряжением",
        "движение нейтральных атомов в проводнике"
    ],
    correct_answer: [1],
    type: "single",
},

{
    question: "В каких единицах измеряется сила тока?",
    options: [
        "вольты",
        "омы",
        "амперы",
        "ватты"
    ],
    correct_answer: [2],
    type: "single",
},
{
    question: "Каким прибором измеряют напряжение?",
    options: [
        "амперметр",
        "вольтметр",
        "омметр",
        "термометр"
    ],
    correct_answer: [1],
    type: "single",
},

{
    question: "Как изменится сила тока, если увеличить сопротивление при том же напряжении?",
    options: [
        "увеличится",
        "не изменится",
        "уменьшится",
        "станет равной нулю"
    ],
    correct_answer: [2],
    type: "single",
},

{
    question: "Запиши формулу закона Ома.",
    options: [
    "\\(I = U \\cdot R\\)",
    "\\(I = \\dfrac{U}{R}\\)",
    "\\(I = \\dfrac{R}{U}\\)",
    "\\(U = \\dfrac{I}{R}\\)"
    ],
    correct_answer: [1],
    type: "single",
},

{
    question: "Что нужно, чтобы в цепи шёл ток?",
    options: [
        "только соединительные провода",
        "разомкнутая цепь и ключ",
        "замкнутая цепь и источник тока",
        "только потребитель (лампочка)"
    ],
    correct_answer: [2],
    type: "single",
},

{
    question: "Амперметр подключается…",
    options: [
        "параллельно",
        "последовательно",
        "только напрямую к источнику тока",
        "в любом месте, способ не важен"
    ],
    correct_answer: [1],
    type: "single",
},

{
    question: "Выбери все верные утверждения о сопротивлении проводника:",
    options: [
        "измеряется в омах",
        "зависит от длины проводника",
        "чем толще проводник, тем больше его сопротивление",
        "зависит от материала проводника"
    ],
    correct_answer: [0, 1, 3],
    type: "multiple",
}

]

const questions = document.querySelector('.questions');

for (let i = 0; i < quiz_data.length; i++){
    const question_block = document.createElement('div');
    question_block.className = 'question_block';

    const text = document.createElement('h2')
    text.textContent = quiz_data[i].question;
    question_block.append(text);

    for (let j = 0; j < quiz_data[i].options.length; j++){
        const label = document.createElement('label');
        label.classList.add('info_list', 'info_list--questions', 'questions_options');
        
        const input = document.createElement('input');
        input.type = (quiz_data[i].type === 'single') ? 'radio' : 'checkbox';
        input.name = 'question' + i;
        input.value = j;

        label.append(input);
        label.append(quiz_data[i].options[j]);

        question_block.append(label);
    }

    questions.append(question_block);
    question_block.classList.add('content_field')
}

if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise();
}

function finishTest(){
    score = 0;

    for (let i = 0; i < quiz_data.length; i++){
        const inputs = document.querySelectorAll('input[name="question' + i + '"]');
        const marks = [];
        inputs.forEach(input => {
            if (input.checked) marks.push(Number(input.value));
        });

        const marks_numbers = marks.slice().sort().join(',');
        const cor_ans = quiz_data[i].correct_answer.slice().sort().join(',');

        if (marks_numbers === cor_ans) score++;
    }

    let percentage = Math.round((score / quiz_data.length) * 100);
    let status = (percentage >= 70) ? "passed" : "failed";

    document.getElementById('completion-status').innerHTML =
    `Правильных: ${score} из ${quiz_data.length} (${percentage}%). Статус: ${status}.`;
    
    if (lmsConnected){
        scorm.set("cmi.core.score.raw", percentage);
        scorm.set("cmi.core.lesson_status", status);
        scorm.save();   
    }
    
    document.getElementById('complete-read-btn').textContent = "Закрыть тест";
    document.getElementById('complete-read-btn').onclick = closeTest;

}

function closeTest(){
    scorm.quit();
}