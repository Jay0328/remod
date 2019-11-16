import commonPkg from '../../package.json';
import pkg from './package.json';
import { getExternalFromPackages } from '../../tools/rollup/getExternalFromPackages';

export default [
  {
    input: './esm/index.js',
    output: [
      {
        file: './lib/index.js',
        format: 'cjs'
      }
    ],
    external: getExternalFromPackages(pkg, commonPkg)
  }
];
