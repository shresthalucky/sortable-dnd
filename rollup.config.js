import babel from '@rollup/plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'src/index.js',
  output: {
    file: 'output/sortable-dnd.js',
    format: 'esm'
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
};

export default config;
