#include "random_question_selector.h"
#include <algorithm>
#include <ctime>
#include <cstdlib>
using namespace std;

class RandomQuestionSelector { // 定义一个名为 RandomQuestionSelector 的类
public:
    RandomQuestionSelector (const vector<string>& images); // 声明一个带有参数的构造函数
    vector<string> getRandomQuestions(int question_num); // 声明一个成员函数，用于获取指定数量的随机问题

private:
    vector<string> images_; // 声明一个私有成员变量，用于存储问题的字符串向量
};


RandomQuestionSelector::RandomQuestionSelector(const vector<string>&images)
    : images_(images) { // 定义构造函数，并使用成员初始化列表初始化 images_ 成员变量
    srand(time(0)); // 使用当前时间（以秒为单位）初始化随机数生成器
}


vector<string> RandomQuestionSelector::getRandomQuestions(int question_num) { // 定义成员函数
    vector<string> random_questions; // 创建一个空的字符串向量，用于存储抽取的随机问题
    const int total_questions = images_.size(); // 获取原始问题集合的大小

    for (int i = 0; i < question_num; i++) { // 循环 question_num 次
        int random_index = rand() % total_questions; // 生成一个位于 [0, total_questions) 区间的随机整数
        random_questions.push_back(images_[random_index]); // 将随机选择的问题添加到 random_questions 向量中
    }

    return random_questions; // 返回包含随机抽取问题的向量
}
