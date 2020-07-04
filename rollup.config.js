import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import path from 'path';
import postcssUrl from 'postcss-url';
import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
import packageJson from './package.json';

const EXTERNAL = new Set([
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.peerDependencies),
]);

const IS_DEV = process.env.NODE_ENV === 'development';

const MAIN_DIR = path.parse(packageJson.main).dir;

const MODULE_DIR = path.parse(packageJson.module).dir;

export default [
  {
    cache: true,
    external(id) {
      if (EXTERNAL.has(id)) {
        return true;
      }

      for (const pkg of EXTERNAL) {
        if (id.startsWith(`${pkg}/`)) {
          return true;
        }
      }

      return false;
    },
    input: 'src/index.ts',
    output: [
      {
        dir: MAIN_DIR,
        format: 'cjs',
        sourcemap: IS_DEV,
      },
      {
        dir: MODULE_DIR,
        format: 'es',
        sourcemap: IS_DEV,
      },
    ],
    plugins: [
      json({
        compact: !IS_DEV,
      }),
      url(),
      postcss({
        autoModules: true,
        extract: false,
        minimize: !IS_DEV,
        plugins: [
          postcssUrl([
            {
              encodeType: 'base64',
              maxSize: 1024,
              url: 'inline',
            },
            {
              assetsPath: 'images',
              url: 'copy',
              useHash: true,
            },
          ]),
        ],
        use: ['sass'],
      }),
      nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: true,
      }),
      commonjs({
        extensions: ['.js', '.jsx'],
      }),
      typescript2({
        check: !IS_DEV,
        useTsconfigDeclarationDir: true,
      }),
    ],
    treeshake: !IS_DEV,
    watch: {
      exclude: 'node_modules/**',
    },
  },
];
