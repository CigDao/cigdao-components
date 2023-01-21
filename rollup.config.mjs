import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import externals from 'rollup-plugin-node-externals'
import packageJson from "./package.json" assert { type: "json" };


export default [
  {
      input: 'src/index.ts',
      external: [
        'react',
        'react-dom',
      ],
      output: [
          {
              file: packageJson.main,
              format: 'cjs',
              sourcemap: true,
              name: 'react-ts-lib'
          },
          {
              file: packageJson.module,
              format: 'esm',
              sourcemap: true
          }
      ],
      plugins: [
          externals(),
          resolve(),
          commonjs(),
          typescript({ tsconfig: './tsconfig.json' }),
          image(),
          json()
      ],
  },
  {
      input: 'dist/esm/types/index.d.ts',
      output: [{ file: 'dist/index.d.ts', format: "esm" }],
      external: [
        'react',
        'react-dom',
        "@mui/icons-material",
        "@mui/material"
      ],
      plugins: [dts()],
  },
]
