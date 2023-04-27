// functions.cpp
#include <iostream>
#include <string>
#include <vector>
#include <chrono>
#include <thread>

struct UserInfo {
  std::string userAgent;
  std::string platform;
  int screenWidth;
  int screenHeight;
};

UserInfo getUserInfo() {
  UserInfo userInfo;
  // 在C++中，我们不能直接访问浏览器的信息，因此我们用一些示例值填充结构体
  userInfo.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
  userInfo.platform = "Win32";
  userInfo.screenWidth = 1920;
  userInfo.screenHeight = 1080;

  return userInfo;
}

bool isStudentIdUsed(const std::string &id, const std::vector<std::string> &usedIds) {
  return std::find(usedIds.begin(), usedIds.end(), id) != usedIds.end();
}

void showAlert(const std::string &message) {
  // 在C++中，我们不能直接操作DOM，因此我们用一个简单的输出语句代替
  std::cout << message << std::endl;
  std::this_thread::sleep_for(std::chrono::milliseconds(3000));
}
