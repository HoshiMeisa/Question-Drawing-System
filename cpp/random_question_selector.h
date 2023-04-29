#include <string>
#include <vector>
using namespace std;

class RandomQuestionSelector {
public:
    RandomQuestionSelector(const vector<string>& images);
    vector<string> getRandomQuestions(int question_num);

private:
    vector<string> images_;
};