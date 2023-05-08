#include "random_question_selector.h"
#include <algorithm>
#include <ctime>
#include <cstdlib>
using namespace std;

class RandomQuestionSelector {
public:
    RandomQuestionSelector (const vector<string>& images);
    vector<string> getRandomQuestions(int question_num);

private:
    vector<string> images_;
};


RandomQuestionSelector::RandomQuestionSelector(const vector<string>&images)
    : images_(images) {
    srand(time(0));
}


vector<string> RandomQuestionSelector::getRandomQuestions(int question_num) {
    vector<string> random_questions;
    const int total_questions = images_.size();

    for (int i = 0; i < question_num; i++) {
        int random_index = rand() % total_questions;
        random_questions.push_back(images_[random_index]);
    }

    return random_questions;
}