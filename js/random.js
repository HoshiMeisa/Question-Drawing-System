const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const randomBtn = document.querySelector('.random-btn');
const questionContainer = document.querySelector('.question-container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

randomBtn.addEventListener('click', () => {
    const questionNum = 6;
    const totalQuestions = 30;
    questionContainer.innerHTML = '';

    for (let i = 0; i < questionNum; i++) {
        const randomIndex = Math.floor(Math.random() * totalQuestions) + 1;
        const img = document.createElement('img');
        img.src = `../images/${randomIndex}.png`;
        questionContainer.appendChild(img);
    }
});
