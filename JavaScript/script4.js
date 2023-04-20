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

const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const alertDiv = document.querySelector('.alert');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const username = usernameInput.value.trim();
	const password = passwordInput.value.trim();
	if (username === '' || password === '') {
		showAlert('请输入用户名和密码');
		return;
	}
	if (username === 'kanameisa' && password === '000000') {
		window.location.href = 'manage.html';
	} else {
		showAlert('用户名或密码错误');
	}
});

function showAlert(message) {
	alertDiv.textContent = message;
	alertDiv.style.display = 'block';
	setTimeout(() => {
		alertDiv.style.display = 'none';
	}, 3000);
}