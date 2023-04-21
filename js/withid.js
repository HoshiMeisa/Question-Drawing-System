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


// 获取表单和结果div元素
const idForm = document.getElementById('id-form');
const resultDiv = document.getElementById('result');

// 定义题库
const questionBank = [];
for (let i = 1; i <= 30; i++) {
  questionBank.push(`../images/${i}.png`);
}

// 定义已经抽过题的学生学号数组
let usedIds = [];

// 表单提交事件处理程序
idForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 防止表单提交刷新页面

  // 获取学号
  const studentId = document.getElementById('student-id').value;

  // 检查是否已经抽过题
  if (usedIds.includes(studentId)) {
    resultDiv.innerHTML = '';
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    alertDiv.innerHTML = '<p>该学号已经抽过题了！</p>';
    resultDiv.appendChild(alertDiv);
  } else {
    // 从题库中随机抽取一题
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    const questionImage = questionBank[randomIndex];

    // 记录该学号
    usedIds.push(studentId);

    // 显示抽取的题目
    resultDiv.innerHTML = '';
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    const questionImg = document.createElement('img');
    questionImg.src = questionImage;
    questionDiv.appendChild(questionImg);
    resultDiv.appendChild(questionDiv);
  }
});

// 应用警告样式
function applyAlertStyle() {
  const alertDiv = document.querySelector('.alert');
  if (alertDiv) {
    alertDiv.style.backgroundColor = '#f44336';
    alertDiv.style.color = '#fff';
    alertDiv.style.padding = '10px';
    alertDiv.style.marginTop = '20px';
    alertDiv.style.display = 'block';
  }
}
applyAlertStyle();

