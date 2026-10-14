# expo-gl: WebGL 2 contexts are `instanceof WebGLRenderingContext`

Minimal reproduction for an expo-gl bug.

Since expo-gl 57, a WebGL 2 context from `GLView` is also an instance of `WebGLRenderingContext`. In browsers it is not, and three.js r163+ rejects any context where it is ("WebGL 1 is not supported since r163").

## Run

```sh
npm install
npx expo run:android
```

The screen and the Metro log show:

```
gl instanceof WebGL2RenderingContext: true
gl instanceof WebGLRenderingContext: true (browsers: false)
```

Expected: the second line is `false`, as in every browser.

Reproduced on an Android emulator (Pixel 10, Android 17) with Expo SDK 57.0.28 and expo-gl 57.0.2. The class setup is shared C++ (`common/EXWebGLRenderer.cpp`), so iOS has the same prototype chain.
