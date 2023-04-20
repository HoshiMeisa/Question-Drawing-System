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

const logoutBtn = document.querySelector('.logout-btn');
const questionList = document.querySelector('.question-list');
const addQuestionForm = document.querySelector('.add-question-form');
const alertDiv = document.querySelector('.alert');
const questions = [];

// 加载所有题目
for (let i = 1; i <= 30; i++) {
	const question = {
		id: i,
		name: `题目${i}`,
		image: `../images/${i}.png`
	};
	questions.push(question);
}


// 显示所有题目
for (const question of questions) {
    const item = document.createElement('div');
    item.classList.add('question-item');
    const img = new Image();
    img.src = question.image;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.width = '50%'; // 将图片的宽度设置为原图的1/2
    const h3 = document.createElement('h3');
    h3.textContent = question.name;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.addEventListener('click', () => {
        deleteQuestion(question.id);
    });
    item.appendChild(img);
    item.appendChild(h3);
    item.appendChild(deleteBtn);
    questionList.appendChild(item);
}


// 添加题目
// addQuestionForm.addEventListener('submit', (event) => {
// 	event.preventDefault();
// 	const nameInput = document.getElementById('question-name');
// 	const imageInput = document.getElementById('question-image');
// 	const name = nameInput.value.trim();
// 	const image = imageInput.files[0];
// 	if (name === '' || !image) {
// 		showAlert('请填写完整的题目信息');
// 		return;
// 	}
// 	const reader = new FileReader();
// 	reader.addEventListener('load', () => {
// 		const newQuestion = {
// 			id: questions.length + 1,
// 			name: name,
// 			image: reader.result
// 		};
// 		questions.push(newQuestion);
// 		addQuestionToUI(newQuestion);
// 		nameInput.value = '';
// 		imageInput.value = '';
// 		showAlert('题目添加成功');
// 	});
// 	reader.readAsDataURL(image);
// });
// 添加图片
addQuestionForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const nameInput = document.getElementById('question-name');
	const imageInput = document.getElementById('question-image');
	const name = nameInput.value.trim();
	const image = imageInput.files[0];
	if (name === '' || !image) {
		showAlert('请输入题目名称和选择题目图片');
		return;
	}
	const reader = new FileReader();
	reader.addEventListener('load', () => {
		const id = questions.length + 1;
		const question = {
			id,
			name,
			image: `../images/${id}.png`
		};
		questions.push(question);
		saveImage(reader.result, question.image);
		showQuestion(question);
		showAlert('添加成功');
		nameInput.value = '';
		imageInput.value = '';
	});
	reader.readAsDataURL(image);
});
2
// 保存图片
function saveImage(dataUrl, filename) {
	// 将dataUrl转为Blob对象
	const blob = dataURLtoBlob(dataUrl);
	// 创建一个FormData对象
	const formData = new FormData();
	formData.append('file', blob, filename);
	// 发送POST请求保存图片
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'save_image.sh', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('图片保存成功');
			} else {
				console.error('图片保存失败');
			}
		}
	};
	xhr.send(formData);
}

// 将dataUrl转为Blob对象
function dataURLtoBlob(dataUrl) {
	const arr = dataUrl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type:mime});
}


// 删除题目
function deleteQuestion(id) {
	const index = questions.findIndex(q => q.id === id);
	if (index !== -1) {
		questions.splice(index, 1);
		questionList.innerHTML = '';
		for (const question of questions) {
			addQuestionToUI(question);
		}
		showAlert('题目删除成功');
	}
}

// 添加题目到UI
function addQuestionToUI(question) {
	const li = document.createElement('li');
	const div = document.createElement('div');
	const img = new Image();
	img.src = question.image;
	img.style.maxWidth = '100%';
	img.style.height = 'auto';
	img.style.width = '10%'; // 将图片的宽度设置为原图的1/10
	const h3 = document.createElement('h3');
	h3.textContent = question.name;
	const deleteBtn = document.createElement('button');
	deleteBtn.textContent = '删除';
	deleteBtn.addEventListener('click', () => {
		deleteQuestion(question.id);
	});
	div.appendChild(img);
	div.appendChild(h3);
	div.appendChild(deleteBtn);
	li.appendChild(div);
	questionList.appendChild(li);
}

// 显示警告信息
function showAlert(message) {
	alertDiv.textContent = message;
	alertDiv.style.display = 'block';
	setTimeout(() => {
		alertDiv.style.display = 'none';
	}, 3000);
}

// 退出登录
logoutBtn.addEventListener('click', () => {
	window.location.href = '../html/admin.html';
});