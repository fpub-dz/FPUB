(function() {
  const canvas = document.getElementById('shader-canvas');

  function syncSize() {
    const w = canvas.clientWidth  || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }
  }
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vs = `attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }`;

  const fs = `precision highp float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
      vec2 uv = v_texCoord;
      vec3 color1 = vec3(0.04, 0.04, 0.04);
      vec3 color2 = vec3(0.06, 0.09, 0.04);

      float noise = sin(uv.x * 3.0 + u_time * 0.15) * cos(uv.y * 2.0 - u_time * 0.08);
      noise += sin(uv.y * 5.0 + u_time * 0.2) * 0.5;

      vec3 finalColor = mix(color1, color2, clamp(noise * 0.5 + 0.5, 0.0, 1.0));

      float glow = 0.0;
      for(int i = 0; i < 3; i++) {
          vec2 pos = vec2(sin(u_time * 0.08 + float(i)*2.0)*0.5+0.5, cos(u_time * 0.11 + float(i)*3.0)*0.5+0.5);
          glow += 0.0018 / distance(uv, pos);
      }

      finalColor += vec3(0.64, 0.82, 0.03) * glow * 0.28;
      gl_FragColor = vec4(finalColor, 1.0);
  }`;

  function cs(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render(t) {
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!reduceMotion) requestAnimationFrame(render);
  }
  render(0);
})();
