const fs = require('fs');
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const form = document.querySelector('form');
const studentIdInput = document.getElementById('student-id');
const questionDiv = document.querySelector('.question');
const alertDiv = document.querySelector('.alert');
const images = [];

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



// 加载所有图片
for (let i = 1; i <= 30; i++) {
	const img = new Image();
	img.src = `image/${i}.jpg`;
	images.push(img);
}

toggleBtn.addEventListener('click', () => {
	sidebar.classList.toggle('visible');
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const studentId = studentIdInput.value.trim();
	if (studentId === '') {
		showAlert('请输入学号');
		return;
	}
	fs.readFile('answered.txt', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			showAlert('读取文件失败');
			return;
		}
		if (data.includes(studentId)) {
			showAlert('禁止重复答题');
			return;
		}
		const index = Math.floor(Math.random() * images.length);
		const image = images[index];
		questionDiv.innerHTML = '';
		questionDiv.appendChild(image);
		questionDiv.style.display = 'block';
		fs.appendFile('answered.txt', `${studentId}\n`, (err) => {
			if (err) {
				console.error(err);
				showAlert('保存文件失败');
			}
		});
	});
});

function showAlert(message) {
	alertDiv.textContent = message;
	alertDiv.style.display = 'block';
	setTimeout(() => {
		alertDiv.style.display = 'none';
	}, 3000);
}