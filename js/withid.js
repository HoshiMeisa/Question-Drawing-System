const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
	sidebar.classList.toggle('visible');
});

const links = document.querySelectorAll('.sidebar a');
links[1].addEventListener('click', (event) => {
	event.preventDefault();
	sidebar.classList.remove('visible');
	setTimeout(() => {
		window.location.href = links[1].href;
	}, 300);
});


// 收集访问者信息
function getUserInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  return {
    userAgent,
    platform,
    screenWidth,
    screenHeight,
  };
}

// 获取表单和结果div元素
const idForm = document.getElementById('id-form');
const resultDiv = document.getElementById('result');
const alertDiv = document.getElementById('alert'); // 更新这里

// 定义题库
const questionBank = [];
for (let i = 1; i <= 30; i++) {
  questionBank.push(`../images/${i}.png`);
}

// 获取已经抽过题的学生学号数组
fetch('http://10.33.88.88:3000/used-ids')
    .then((response) => response.json())
    .then((data) => {
        usedIds = data.map((entry) => entry.id);
    });

// Fetch all images from the server
let allImages = [];
fetch('http://10.33.88.88:3000/get_images')
    .then(response => response.json())
    .then(images => {
        // 获取所有图片
        allImages = images;
    });

function showAlert(message) {
	alertDiv.textContent = message;
	alertDiv.style.display = 'block';
	setTimeout(() => {
		alertDiv.style.display = 'none';
	}, 3000);
}

// 表单提交事件处理程序
idForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 防止表单提交刷新页面

  // 获取学号
  const studentId = document.getElementById('student-id').value;

  // 检查是否已经抽过题
  if (usedIds.includes(studentId)) {
    showAlert('禁止重复抽题');
  } else {
    // 从题库中随机抽取一题
    const randomIndex = Math.floor(Math.random() * allImages.length);
    const questionImage = allImages[randomIndex];

    // 记录该学号
    usedIds.push(studentId);

  // 更新后端服务器中的usedIds
  const userInfo = getUserInfo();
  fetch('http://10.33.88.88:3000/add-used-id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: studentId,
      questionImage: questionImage,
      userInfo: userInfo,
    }),
  });

  // 显示抽取的题目
  resultDiv.innerHTML = '';

  // 添加 "抽题结果：" 文本
  const resultText = document.createElement('p');
  resultText.textContent = '抽题结果：';
  resultDiv.appendChild(resultText);

  // 创建并添加题目图像元素
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  const questionImg = document.createElement('img');
  questionImg.src = questionImage;
  questionDiv.appendChild(questionImg);
  resultDiv.appendChild(questionDiv);
  
  }
});
