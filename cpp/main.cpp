#include <emscripten/bind.h>
#include "question_bank.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(question_bank_module) {
  class_<QuestionBank>("QuestionBank")
    .constructor<const std::vector<std::string>&>()
    .function("isStudentIdUsed", &QuestionBank::isStudentIdUsed)
    .function("drawQuestion", &QuestionBank::drawQuestion);
}