import * as vertexSource from "./shaders/vertex.glsl";
import * as fragmentSource from "./shaders/fragment.glsl";

const vertexShaderSource = vertexSource as unknown as string;
const fragmentShaderSource = fragmentSource as unknown as string;

const createShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) => {
  const shader: WebGLShader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  console.log("compile shader: ", success);
  if (success) {
    return shader;
  }

  console.log("create shader: ", gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return undefined;
};

const createProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram => {
  const program: WebGLProgram = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log("create Program : ", gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return undefined;
};

const main = () => {
  const canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("#glCanvas");
  const gl: WebGL2RenderingContext = canvas.getContext("webgl2");

  if (gl === null) {
    alert("No gl context ");
    return;
  }
  const vertexShader: WebGLShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
  );
  const fragmentShader: WebGLShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program: WebGLProgram = createProgram(gl, vertexShader, fragmentShader);

  let positionAttribute = gl.getAttribLocation(program, "a_position");
  let positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  let positions = [0.0, 0.0, 0.0, 0.5, 0.7, 0.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  let vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttribute);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.vertexAttribPointer(
    positionAttribute,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.bindVertexArray(vao);

  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);
};

window.onload = main;
