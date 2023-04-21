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
const alertDiv = document.getElementById('alert');

// 定义题库
const questionBank = [];
for (let i = 1; i <= 30; i++) {
  questionBank.push(`../images/${i}.png`);
}

// 获取已经抽过题的学生学号数组
fetch('http://localhost:3000/used-ids')
    .then((response) => response.json())
    .then((data) => {
        usedIds = data.map((entry) => entry.id);
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
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    const questionImage = questionBank[randomIndex];

    // 记录该学号
    usedIds.push(studentId);

    // 更新后端服务器中的usedIds
    fetch('http://localhost:3000/add-used-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentId, questionImage: questionImage }),
    });

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