const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const randomBtn = document.querySelector('.random-btn');
const questionContainer = document.querySelector('.question-container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

randomBtn.addEventListener('click', async () => {
    const questionNum = 6;
    questionContainer.innerHTML = '';

    const response = await fetch('http://10.33.88.88:3000/get_images');
    const images = await response.json();

    const totalQuestions = images.length;

    for (let i = 0; i < questionNum; i++) {
        const randomIndex = Math.floor(Math.random() * totalQuestions);
        const img = document.createElement('img');
        img.src = images[randomIndex];
        questionContainer.appendChild(img);
    }
});

import("./random_question_selector.js")
  .then(({ RandomQuestionSelector }) => {
    // 使用从服务器获取的图片列表初始化随机问题选择器
    const randomQuestionSelector = new RandomQuestionSelector(allImages);

    // 使用了随机问题选择器
    const newRandomQuestionSelector = () => {
      console.log("new random question selector called.");
    };

    randomBtn.addEventListener('click', () => {
      const questionNum = 6;
      questionContainer.innerHTML = '';

      // 替换为随机问题选择器
      newRandomQuestionSelector();

      // 使用了从随机问题选择器获取的问题
      for (let i = 0; i < questionNum; i++) {
        const randomIndex = Math.floor(Math.random() * allImages.length);
        const questionImage = allImages[randomIndex];

        const img = document.createElement('img');
        img.src = questionImage;
        questionContainer.appendChild(img);
      }
    });
  });