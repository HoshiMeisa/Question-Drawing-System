#include "question_bank.h"
#include <algorithm>
#include <ctime>
#include <cstdlib>
using namespace std;


QuestionBank::QuestionBank(const vector<string>& images)
    : images_(images) {
    srand(time(0));
}

bool QuestionBank::isStudentIdUsed(const string& student_id) const {
    return find(used_student_ids_.begin(), used_student_ids_.end(), student_id) !=
           used_student_ids_.end();
}

string QuestionBank::drawQuestion(const string& student_id) {
    if (isStudentIdUsed(student_id)) {
        return ""; // 表示无法抽题，因为学号已被使用
    }
    int random_index = rand() % images_.size();
    used_student_ids_.push_back(student_id);
    return images_[random_index];
}
