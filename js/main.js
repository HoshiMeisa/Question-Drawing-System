const toggleBtn = document.querySelector('.toggle-btn'); // 选择页面中类名为 'toggle-btn' 的元素，并将其赋值给 toggleBtn 变量

const sidebar = document.querySelector('.sidebar'); // 选择页面中类名为 'sidebar' 的元素，并将其赋值给 sidebar 变量

// 为 toggleBtn 元素添加点击事件监听器
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('visible'); // 当点击 toggleBtn 时，切换 sidebar 元素的 'visible' 类，实现显示/隐藏功能
});

const links = document.querySelectorAll('.sidebar a'); // 选择 sidebar 元素内的所有 a 标签，并将其赋值给 links 变量

// 为 links 数组中的第二个元素（索引为1）添加点击事件监听器
links[1].addEventListener('click', (event) => {
    event.preventDefault(); // 阻止 a 标签的默认行为，即跳转链接

    sidebar.classList.remove('visible'); // 移除 sidebar 元素的 'visible' 类，使其隐藏

    // 延迟300毫秒后，将当前页面的 URL 修改为 links[1] 的 href 属性值，实现页面跳转
    setTimeout(() => {
        window.location.href = links[1].href;
    }, 300);
});
