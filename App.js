import { GLView } from 'expo-gl';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [result, setResult] = useState('Waiting for GL context…');

  const onContextCreate = (gl) => {
    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    const isWebGL1 = gl instanceof WebGLRenderingContext;
    // In browsers, a WebGL 2 context is never `instanceof WebGLRenderingContext`.
    // three.js r163+ throws "WebGL 1 is not supported" for any context where this is true.
    const message =
      `gl instanceof WebGL2RenderingContext: ${isWebGL2}\n` +
      `gl instanceof WebGLRenderingContext: ${isWebGL1} (browsers: false)`;
    console.log(message);
    setResult(message);
    gl.clearColor(0.2, 0.4, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.endFrameEXP();
  };

  return (
    <View style={styles.container}>
      <GLView style={styles.gl} onContextCreate={onContextCreate} />
      <Text style={styles.text}>{result}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  gl: { width: 200, height: 200 },
  text: { marginTop: 24, fontSize: 16 },
});
