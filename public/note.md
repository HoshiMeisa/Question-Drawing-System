kana@Arch ~/D/test (main) [1]> emcc -O3 -s WASM=1 -s EXPORTED_FUNCTIONS="['_multiply_by_two']" -s ENVIRONMENT='web' -s MODULARIZE=1 -o multiply.js multiply.cpp

cache:INFO: generating system asset: symbol_lists/a29e33ee44d1377d83856b50fa30184981ab57f2.json... (this will be cached in "/home/kana/Software/emsdk/upstream/emscripten/cache/symbol_lists/a29e33ee44d1377d83856b50fa30184981ab57f2.json" for subsequent builds)
cache:INFO:  - ok
