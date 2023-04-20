const wasmModule = async () => {
    const module = await Module();
    return {
      multiplyByTwo: module._multiply_by_two,
    };
  };
  
  (async () => {
    const { multiplyByTwo } = await wasmModule();
  
    const inputNumber = document.getElementById('inputNumber');
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
  
    calculateBtn.addEventListener('click', () => {
      const num = parseInt(inputNumber.value, 10);
      if (!isNaN(num)) {
        const res = multiplyByTwo(num);
        result.textContent = `结果：${res}`;
      } else {
        result.textContent = '请输入一个有效的数字';
      }
    });
  })();
  