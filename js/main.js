document.querySelector('.toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
});

const pageLinks = document.querySelectorAll('.page-link');
pageLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        // 切换页面内容
    });
});




async function checkStudentId(studentId) {
    const response = await fetch(`/check_student_id/${studentId}`);
    if (response.ok) {
        return response.text();
    } else {
        throw new Error(await response.text());
    }
}

document.querySelector('#submit-btn').addEventListener('click', async () => {
    const input = document.querySelector('#student-id');
    const studentId = input.value.trim();
    try {
        const imageUrl = await checkStudentId(studentId);
        const img = document.createElement('img');
        img.src = imageUrl;
        document.querySelector('.content').appendChild(img);
    } catch (error) {
        alert(error.message);
    }
});
