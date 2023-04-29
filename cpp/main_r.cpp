#include <emscripten/bind.h>
#include "random_question_selector.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(random_question_selector_module) {
  class_<RandomQuestionSelector>("RandomQuestionSelector")
    .constructor<const std::vector<std::string>&>()
    .function("getRandomQuestions", &RandomQuestionSelector::getRandomQuestions);
}