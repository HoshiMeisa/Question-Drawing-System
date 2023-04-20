const images = [];
let answeredIds = [];

// 加载所有图片
for (let i = 1; i <= 30; i++) {
	const img = new Image();
	img.src = `../images/${i}.png`;
	images.push(img);
}

// 加载已答题的学号
fetch('answered.txt')
	.then(response => response.text())
	.then(data => {
		answeredIds = data.trim().split('\n');
	});

function getQuestionImage(studentId) {
	if (studentId === '') {
		console.log('请输入学号');
		return;
	}
	if (answeredIds.includes(studentId)) {
		console.log('禁止重复抽题');
		return;
	}
	const index = Math.floor(Math.random() * images.length);
	const image = images[index];
	answeredIds.push(studentId);
	saveAnsweredIds(answeredIds);
	return image;
}

function saveAnsweredIds(ids) {
	const data = ids.join('\n');
	fetch('answered.txt', {
		method: 'PUT',
		body: data
	});
}