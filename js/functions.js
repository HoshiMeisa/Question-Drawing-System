// functions.js

export function getUserInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
  
    return {
      userAgent,
      platform,
      screenWidth,
      screenHeight,
    };
  }
  
  export function isStudentIdUsed(id, usedIds) {
    return usedIds.includes(id);
  }
  
  export function showAlert(message, alertDiv) {
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';
    setTimeout(() => {
      alertDiv.style.display = 'none';
    }, 3000);
  }
  