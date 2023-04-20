const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const idForm = document.getElementById('id-form');
const result = document.getElementById('result');

toggleBtn.addEventListener('click', () => {
	sidebar.classList.toggle('visible');
});

idForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const studentId = document.getElementById('student-id').value;

	const response = await fetch(`http://localhost:8000/api/withid?student_id=${studentId}`);
	const data = await response.json();

	if (data.error) {
		alert(data.error);
	} else {
		result.innerHTML = `<img src="../images/${data.question}.png" alt="题目">`;
	}
});
