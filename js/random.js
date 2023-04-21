// 加载Wasm模块
const wasmModule = fetch('../cpp/random.wasm')
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, {}))
  .then(result => result.instance);

// 调用抽题函数
const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click', async () => {
  const wasmInstance = await wasmModule;
  const getRandomQuestions = wasmInstance.exports.getRandomQuestions;
  const questions = new Int32Array(getRandomQuestions());
  renderQuestions(questions);
});