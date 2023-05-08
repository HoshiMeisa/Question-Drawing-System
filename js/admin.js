const toggleBtn = document.querySelector('.toggle-btn');  //通过选择器.toggle-btn查找文档中的一个元素，将其赋值给常量 toggleBtn
const sidebar = document.querySelector('.sidebar');

//为 toggleBtn 元素添加一个点击事件监听器。
//当该元素被点击时，会执行一个箭头函数，该函数会在 sidebar 元素的 class 列表中添加或移除 'visible' 类
toggleBtn.addEventListener('click', () => {    
	sidebar.classList.toggle('visible');
});


//为 links 中的第二个元素（索引为 1）添加一个点击事件监听器。当该链接被点击时，会执行一个箭头函数。
//函数首先阻止了链接的默认行为（导航到 href 指向的页面），然后移除了 sidebar 元素上的 'visible' 类，
//接着设置了一个 300 毫秒的延迟，最后将当前页面导航到该链接的 href 属性所指向的页面。
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

//为表单元素添加一个提交事件监听器。当表单被提交时，会执行一个箭头函数。
form.addEventListener('submit', (event) => {
	event.preventDefault();
	//获取 usernameInput 元素的值，去除两边的空白字符，并将结果赋值给常量 username
	const username = usernameInput.value.trim();
	const password = passwordInput.value.trim();
	if (username === '' || password === '') {
		showAlert('请输入用户名和密码');
		return;
	}
	if (username === '000000' && password === '000000') {
		window.location.href = 'eHcWbPdFfUgGyJjLmNnIiKkOoEqRsTxVzYapQBtSrMvXuZAoDlG.html';
	} else {
		showAlert('用户名或密码错误');
	}
});

//定义了一个名为 showAlert 的函数，该函数接收一个参数 message。
//函数首先将 message 设置为 alertDiv 元素的文本内容，然后将 alertDiv 元素的 display 样式设置为 'block'，
//使其可见。接着设置了一个 3000 毫秒（3 秒）的延迟，
//在延迟结束后，将 alertDiv 元素的 display 样式设置为 'none'，使其隐藏。
function showAlert(message) {
	alertDiv.textContent = message;
	alertDiv.style.display = 'block';
	setTimeout(() => {
		alertDiv.style.display = 'none';
	}, 3000);
}