// const toggleBtn = document.querySelector('.toggle-btn');
// const sidebar = document.querySelector('.sidebar');
// const questionList = document.querySelector('.question-list');
// const addQuestionForm = document.querySelector('.add-question-form');
// const alertDiv = document.querySelector('.alert');
// const drawRecordsTable = document.querySelector('.draw-records tbody');
// const logoutBtn = document.querySelector('.logout-btn');

// toggleBtn.addEventListener('click', () => {
// 	sidebar.classList.toggle('visible');
// });

// // Load questions and display them
// async function loadQuestions() {
// 	const response = await fetch('/get_questions');
// 	const questions = await response.json();
// 	displayQuestions(questions);
// }

// loadQuestions();


// // Add a question
// addQuestionForm.addEventListener('submit', async (event) => {
// 	event.preventDefault();
// 	const nameInput = document.getElementById('question-name');
// 	const imageInput = document.getElementById('question-image');
// 	const name = nameInput.value.trim();
// 	const image = imageInput.files[0];
// 	if (name === '' || !image) {
// 		showAlert('请输入题目名称和选择题目图片');
// 		return;
// 	}
// 	const reader = new FileReader();
// 	reader.addEventListener('load', async () => {
// 		const dataUrl = reader.result;
// 		const response = await fetch('/add_question', {
// 			method: 'POST',
// 			body: JSON.stringify({ name, dataUrl }),
// 			headers: { 'Content-Type': 'application/json' },
// 		});
// 		const question = await response.json();
// 		displayQuestion(question);
// 		showAlert('添加成功');
// 		nameInput.value = '';
// 		imageInput.value = '';
// 	});
// 	reader.readAsDataURL(image);
// });

// // Display a question
// function displayQuestion(question) {
// 	const item = document.createElement('div');
// 	item.classList.add('question-item');
// 	const img = new Image();
// 	img.src = question.image;
// 	img.style.maxWidth = '100%';
// 	img.style.height = 'auto';
// 	img.style.width = '50%'; // 将图片的宽度设置为原图的1/2
// 	const h3 = document.createElement('h3');
// 	h3.textContent = question.name;
// 	const deleteBtn = document.createElement('button');
// 	deleteBtn.textContent = '删除';
// 	deleteBtn.addEventListener('click', async () => {
// 		const response = await fetch(`/delete_question/${question.id}`, {
// 			method: 'DELETE',
// 		});
// 		if (response.ok) {
// 			item.remove();
// 			showAlert('题目删除成功');
// 		} else {
// 			showAlert('删除失败，请稍后重试');
// 		}
// 	});
// 	item.appendChild(img);
// 	item.appendChild(h3);
// 	item.appendChild(deleteBtn);
// 	questionList.appendChild(item);
// }


// // 获取抽题记录
// async function fetchDrawRecords() {
// 	const response = await fetch('../node_server/answered.json');
// 	const records = await response.json();
// 	displayDrawRecords(records);
// }

// // Display draw records
// function displayDrawRecords(records) {
// 	drawRecordsTable.innerHTML = '';
// 	for (const record of records) {
// 		const tr = document.createElement('tr');
// 		tr.innerHTML = `
// 			<td>${record.id}</td>
// 			<td>${record.questionImage}</td>
// 			<td>${record.userInfo.ip}</td>
// 			<td>${record.userInfo.platform}</td>
// 		`;
// 		drawRecordsTable.appendChild(tr);
// 	}
// }
  


// // Show alert
// function showAlert(message) {
// 	alertDiv.textContent = message;
// 	alertDiv.style.display = 'block';
// 	setTimeout(() => {
// 		alertDiv.style.display = 'none';
// 	}, 3000);
// }

// // Logout
// logoutBtn.addEventListener('click', () => {
// 	window.location.href = '../html/admin.html';
// });

// // Fetch draw records when the page loads
// fetchDrawRecords();

const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const questionList = document.querySelector('.question-list');
const addQuestionForm = document.querySelector('.add-question-form');
const alertDiv = document.querySelector('.alert');
const drawRecordsTable = document.querySelector('.draw-records tbody');
const logoutBtn = document.querySelector('.logout-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

// Load questions and display them
async function loadQuestions() {
    const response = await fetch('http://localhost:3000/get_questions');
    const questions = await response.json();
    displayQuestions(questions);
}

loadQuestions();


// Add a question
addQuestionForm.addEventListener('submit', async (event) => {
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
    reader.addEventListener('load', async () => {
        const dataUrl = reader.result;
        const response = await fetch('/add_question', {
            method: 'POST',
            body: JSON.stringify({ name, dataUrl }),
            headers: { 'Content-Type': 'application/json' },
        });
        const question = await response.json();
        displayQuestion(question);
        showAlert('添加成功');
        nameInput.value = '';
        imageInput.value = '';
    });
    reader.readAsDataURL(image);
});

// Display a question
function displayQuestion(question) {
    const item = document.createElement('div');
    item.classList.add('question-item');
    const img = new Image();
    img.src = question.image.replace('..', '');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.width = '50%'; // 将图片的宽度设置为原图的1/2
    const h3 = document.createElement('h3');
    h3.textContent = question.name;
    item.appendChild(img);
    item.appendChild(h3);
    questionList.appendChild(item);
}

// 获取抽题记录
async function fetchDrawRecords() {
    const response = await fetch('http://localhost:3000/used-ids');
    const records = await response.json();
    displayDrawRecords(records);
}

// Display draw records
function displayDrawRecords(records) {
    drawRecordsTable.innerHTML = '';
    for (const record of records) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.id}</td>
            <td>${record.questionImage}</td>
            <td>${record.userInfo.ip}</td>
            <td>${record.userInfo.platform}</td>
        `;
        drawRecordsTable.appendChild(tr);
    }
}

function displayQuestions(questions) {
    questionList.innerHTML = '';
    for (const question of questions) {
        displayQuestion(question);
    }
}

// Show alert
function showAlert(message) {
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 3000);
}

// Logout
logoutBtn.addEventListener('click', () => {
    window.location.href = '../html/admin.html';
});

// Fetch draw records when the page loads
fetchDrawRecords();