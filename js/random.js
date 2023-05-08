const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const randomBtn = document.querySelector('.random-btn');
const questionContainer = document.querySelector('.question-container');

// 当点击 toggleBtn 时，执行一个回调函数
toggleBtn.addEventListener('click', () => {
  // 切换 sidebar 元素的 'visible' 类，用于控制侧边栏的显示与隐藏
  sidebar.classList.toggle('visible');
});

// 当点击 randomBtn 时，执行一个异步回调函数
randomBtn.addEventListener('click', async () => {
  const questionNum = 6; // 设置随机选取题目的数量
  questionContainer.innerHTML = ''; // 清空 questionContainer 的内容

  // 向服务器发送请求，获取题目图片的路径
  const response = await fetch('http://10.33.88.88:3000/get_images');
  const images = await response.json(); // 将响应结果解析为 JSON

  const totalQuestions = images.length; // 获取题目总数

  // 循环 questionNum 次，每次随机选取一个题目并显示
  for (let i = 0; i < questionNum; i++) {
      const randomIndex = Math.floor(Math.random() * totalQuestions); // 随机生成一个索引值
      const img = document.createElement('img'); // 创建一个 img 元素
      img.src = images[randomIndex]; // 设置 img 元素的 src 属性为随机选取的题目图片路径
      questionContainer.appendChild(img); // 将 img 元素添加到 questionContainer 中
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