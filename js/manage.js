const toggleBtn = document.querySelector('.toggle-btn'); // 获取页面中类名为 "toggle-btn" 的元素
const sidebar = document.querySelector('.sidebar'); // 获取页面中类名为 "sidebar" 的元素
const questionList = document.querySelector('.question-list'); // 获取页面中类名为 "question-list" 的元素
const addQuestionForm = document.querySelector('.add-question-form'); // 获取页面中类名为 "add-question-form" 的元素
const alertDiv = document.querySelector('.alert'); // 获取页面中类名为 "alert" 的元素
const drawRecordsTable = document.querySelector('.draw-records tbody'); // 获取页面中类名为 "draw-records" 的表格的 tbody 元素
const logoutBtn = document.querySelector('.logout-btn'); // 获取页面中类名为 "logout-btn" 的元素

// 为 toggleBtn 元素添加点击事件监听器
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('visible'); // 点击 toggleBtn 时，切换 sidebar 元素的 'visible' 类，实现侧边栏的显示/隐藏
});

// 定义一个异步函数 loadQuestions，用于加载并显示题目
async function loadQuestions() {
    // 向 Node.js 服务器发送 GET 请求，获取题目数据
    const response = await fetch('http://10.33.88.88:3000/get_questions');
    const questions = await response.json(); // 将返回的 JSON 数据解析为 JavaScript 对象
    displayQuestions(questions); // 调用 displayQuestions 函数，传入 questions 对象，显示题目
}

loadQuestions(); // 执行 loadQuestions 函数

// 为 addQuestionForm 元素添加提交事件监听器
addQuestionForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    const nameInput = document.getElementById('question-name'); // 获取 id 为 "question-name" 的输入框元素
    const imageInput = document.getElementById('question-image'); // 获取 id 为 "question-image" 的文件输入框元素
    const name = nameInput.value.trim(); // 获取题目名称并去除首尾空格
    const image = imageInput.files[0]; // 获取文件输入框中的第一个文件（题目图片）

    // 如果题目名称为空或未选择题目图片，显示警告信息并返回
    if (name === '' || !image) {
        showAlert('请输入题目名称和选择题目图片');
        return;
    }

    const reader = new FileReader(); // 创建一个 FileReader 对象，用于读取文件内容

    // 为 FileReader 对象添加加载完成事件监听器
    reader.addEventListener('load', async () => {
        const dataUrl = reader.result; // 获取加载完成后的文件内容（Data URL）
        const formData = new FormData(); // 创建一个 FormData 对象，用于发送数据
        formData.append('name', name); // 将题目名称追加到 FormData 对象中
        formData.append('image', image); // 将题目图片追加到 FormData 对象中
        const response = await fetch('http://10.33.88.88:3000/add_question', {
            method: 'POST',
            body: formData, // 将 FormData 对象作为请求体发送
        });

        const question = await response.json(); // 将返回的 JSON 数据解析为 JavaScript 对象
        displayQuestion(question); // 调用 displayQuestion 函数，传入 question 对象，显示新添加的题目
        showAlert('添加成功'); // 调用 showAlert 函数，显示添加成功的提示信息
        nameInput.value = ''; // 清空题目名称输入框的值
        imageInput.value = ''; // 清空题目图片文件输入框的值
    });

    reader.readAsDataURL(image); // 调用 FileReader 对象的 readAsDataURL 方法，将题目图片读取为 Data URL
});

// 定义一个函数 displayQuestion，用于显示单个题目
function displayQuestion(question) {
    const item = document.createElement('div'); // 创建一个 div 元素
    item.classList.add('question-item'); // 为新创建的 div 元素添加类名 "question-item"
    const img = new Image(); // 创建一个 Image 对象
    img.src = question.image.replace('..', ''); // 设置图片的 src 属性，去掉图片 URL 中的 ".."（相对路径）
    img.style.maxWidth = '100%'; // 设置图片的最大宽度为 100%
    img.style.height = 'auto'; // 设置图片的高度自动适应
    img.style.width = '50%'; // 将图片的宽度设置为原图的 1/2
    const h3 = document.createElement('h3'); // 创建一个 h3 元素
    h3.textContent = question.name; // 设置 h3 元素的文本内容为题目名称
    item.appendChild(img); // 将 img 元素添加到 div 元素中
    item.appendChild(h3); // 将 h3 元素添加到 div 元素中
    questionList.appendChild(item); // 将 div 元素添加到 questionList 元素中
}

// 定义一个异步函数 fetchDrawRecords，用于获取抽题记录
async function fetchDrawRecords() {
    const response = await fetch('http://10.33.88.88:3000/used-ids'); // 向 Node.js 服务器发送 GET 请求，获取抽题记录数据
    const records = await response.json(); // 将返回的 JSON 数据解析为 JavaScript 对象
    displayDrawRecords(records); // 调用 displayDrawRecords 函数，传入 records 对象，显示抽题记录
}

// 定义一个函数 displayDrawRecords，用于显示抽题记录
function displayDrawRecords(records) {
    drawRecordsTable.innerHTML = ''; // 清空 drawRecordsTable 的内容
    for (const record of records) { // 遍历 records 数组中的每个 record 对象
        const tr = document.createElement('tr'); // 创建一个 tr 元素
        tr.innerHTML = `
            <td>${record.id}</td>
            <td>${record.questionImage}</td>
            <td>${record.userInfo.ip}</td>
            <td>${record.userInfo.platform}</td>
        `; // 设置 tr 元素的 innerHTML，插入记录的数据
        drawRecordsTable.appendChild(tr); // 将 tr 元素添加到 drawRecordsTable 元素中
    }
}

// 定义一个函数 displayQuestions，用于显示所有题目
function displayQuestions(questions) {
    questionList.innerHTML = ''; // 清空 questionList 的内容
    for (const question of questions) { // 遍历 questions 数组中的每个 question 对象
        displayQuestion(question); // 调用 displayQuestion 函数，传入 question 对象，显示题目
    }
}

// 定义一个函数 showAlert，用于显示警告信息
function showAlert(message) {
    alertDiv.textContent = message; // 设置 alertDiv 元素的文本内容为传入的 message
    alertDiv.style.display = 'block'; // 显示 alertDiv 元素
    setTimeout(() => {
        alertDiv.style.display = 'none'; // 3 秒后隐藏 alertDiv 元素
    }, 3000);
}

// 定义一个函数用于处理注销按钮的点击事件
logoutBtn.addEventListener('click', () => {
    window.location.href = '../html/admin.html'; // 将当前页面的 URL 设置为 "../html/admin.html"，跳转到管理员页面
});

// 当页面加载时，执行 fetchDrawRecords 函数，获取抽题记录
fetchDrawRecords();
