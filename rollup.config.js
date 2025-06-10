import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/ip-banner.js',
  output: {
    file: 'dist/ip-banner.min.js',
    format: 'umd',
    name: 'IPBanner',
    globals: {},
  },
  plugins: [terser()]
};
