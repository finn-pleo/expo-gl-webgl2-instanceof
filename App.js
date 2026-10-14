import { GLView } from 'expo-gl';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [result, setResult] = useState(null);

  const onContextCreate = (gl) => {
    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    const isWebGL1 = gl instanceof WebGLRenderingContext;
    console.log(
      `gl instanceof WebGL2RenderingContext: ${isWebGL2}\n` +
        `gl instanceof WebGLRenderingContext: ${isWebGL1} (browsers: false)`
    );
    setResult({ isWebGL2, isWebGL1 });
    gl.clearColor(0.2, 0.4, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.endFrameEXP();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-gl: is a WebGL 2 context also WebGL 1?</Text>
      <GLView style={styles.gl} onContextCreate={onContextCreate} />
      {result ? (
        <View style={styles.results}>
          <Text style={styles.line}>
            gl instanceof WebGL2RenderingContext: <Text style={styles.ok}>{String(result.isWebGL2)}</Text>
          </Text>
          <Text style={styles.line}>
            gl instanceof WebGLRenderingContext:{' '}
            <Text style={result.isWebGL1 ? styles.bad : styles.ok}>{String(result.isWebGL1)}</Text>
          </Text>
          <Text style={styles.expected}>Expected false, like in every browser.</Text>
          <Text style={styles.explanation}>
            {result.isWebGL1
              ? 'Bug: expo-gl makes WebGL2RenderingContext extend WebGLRenderingContext. three.js r163+ rejects any context that is instanceof WebGLRenderingContext, so it throws "WebGL 1 is not supported" and renders nothing.'
              : 'Fixed: WebGL 2 contexts are no longer instances of WebGLRenderingContext, so three.js accepts them.'}
          </Text>
        </View>
      ) : (
        <Text style={styles.line}>Waiting for GL context…</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  gl: { width: 160, height: 160 },
  results: { marginTop: 24, alignSelf: 'stretch' },
  line: { fontSize: 15, fontFamily: 'monospace', marginBottom: 4 },
  ok: { color: '#1a7f37', fontWeight: '700' },
  bad: { color: '#cf222e', fontWeight: '700' },
  expected: { fontSize: 14, color: '#57606a', marginTop: 4 },
  explanation: { fontSize: 14, lineHeight: 20, marginTop: 16 },
});
