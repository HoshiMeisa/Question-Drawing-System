#include "question_bank.h"
#include <algorithm>
#include <ctime>
#include <cstdlib>
using namespace std;


QuestionBank::QuestionBank(const vector<string>& images)
    : images_(images) { // 定义构造函数，并使用成员初始化列表初始化 images_ 成员变量
    srand(time(0)); // 使用当前时间（以秒为单位）初始化随机数生成器
}

bool QuestionBank::isStudentIdUsed(const string& student_id) const {
    // 在 used_student_ids_ 向量中查找 student_id，如果找到了，说明已经被使用过
    return find(used_student_ids_.begin(), used_student_ids_.end(), student_id) !=
           used_student_ids_.end();
}

string QuestionBank::drawQuestion(const string& student_id) {
    // 首先检查学号是否已被使用
    if (isStudentIdUsed(student_id)) {
        return ""; // 如果已被使用，返回空字符串，表示无法抽题
    }
    int random_index = rand() % images_.size(); // 生成一个位于 [0, images_.size()) 区间的随机整数
    used_student_ids_.push_back(student_id); // 将 student_id 添加到 used_student_ids_ 向量中，表示已被使用
    return images_[random_index]; // 返回随机抽取的问题
}





