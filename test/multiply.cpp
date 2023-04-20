#include <emscripten/emscripten.h>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int multiply_by_two(int num) {
    return num * 2;
  }
}
