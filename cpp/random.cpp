#include <vector>
#include <random>

// 抽题函数
std::vector<int> getRandomQuestions() {
  std::vector<int> questions;
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> dis(1, 30);
  while (questions.size() < 6) {
    int questionIndex = dis(gen);
    if (std::find(questions.begin(), questions.end(), questionIndex) == questions.end()) {
      questions.push_back(questionIndex);
    }
  }
  return questions;
}