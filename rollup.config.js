import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import sass from 'rollup-plugin-sass';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const isDevBuild = !(process.env && process.env.prod === 'true');
const devMode = isDevBuild ? 'development' : 'production';
process.env.NODE_ENV = devMode;

console.log(`Running in ${devMode} mode.`);


const globalMapping = {
  'react': 'React'
}


const OptionsDefault =
{
  plugins: [
    cjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(devMode)
    }),
    resolve(),
    sass({
      insert: true
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    babel({
      exclude: ['./node_modules/**'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
  ]
}


const OptionsDevelopment =
{
  input: './Module.test.tsx',
  output: [
    {
      file: 'test/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: OptionsDefault.plugins.concat([
    cjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['React', 'Children', 'Component', 'PropTypes', 'createElement', 'useRef', 'useEffect']
      },
    }),
  ]),
  watch: {
    clearScreen: true
  }
}


const OptionsProduction =
{
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      globals: globalMapping
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
      globals: globalMapping
    }
  ],
  external: [
    'react'
  ],
  plugins: [
    external()
  ].concat(OptionsDefault.plugins, [
    terser()
  ])
}

const EnviromentOptions = isDevBuild ? OptionsDevelopment : OptionsProduction;
export default EnviromentOptions;
