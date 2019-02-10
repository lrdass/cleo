// Dummy vertex shader

attribute vec4 position;
     
void main() {
  //  The position of this object in the world is just simply position
  gl_Position = position;
}