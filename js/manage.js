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

// 加载并显示题目
async function loadQuestions() {
    //从3000端口等待请求，这个端口是Nodejs服务器推送题目的端口
    const response = await fetch('http://10.33.88.88:3000/get_questions'); 
    const questions = await response.json();
    displayQuestions(questions);
}

loadQuestions();  //执行函数


// 添加题目
addQuestionForm.addEventListener('submit', async (event) => {  //事件：点击submit按钮
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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        const response = await fetch('http://10.33.88.88:3000/add_question', {
            method: 'POST',
            body: formData,
        });

        const question = await response.json();
        displayQuestion(question);
        showAlert('添加成功');
        nameInput.value = '';
        imageInput.value = '';
    });
    reader.readAsDataURL(image);
});

// 显示题目
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
    const response = await fetch('http://10.33.88.88:3000/used-ids');
    const records = await response.json();
    displayDrawRecords(records);
}

// 显示抽题记录
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

// 显示警告
function showAlert(message) {
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 3000);
}

// 注销
logoutBtn.addEventListener('click', () => {
    window.location.href = '../html/admin.html';
});

// 当加载页面时获取抽题记录
fetchDrawRecords();


