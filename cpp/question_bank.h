#include <string>
#include <vector>
using namespace std;


class QuestionBank {
public:
    QuestionBank(const vector<string>& images);
    bool isStudentIdUsed(const string& student_id) const;
    string drawQuestion(const string& student_id);

private:
    vector<string> used_student_ids_;
    vector<string> images_;
};