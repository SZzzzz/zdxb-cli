import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: './lib/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'your-sdk-name'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    uglify()
  ],
}