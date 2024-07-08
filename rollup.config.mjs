import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: './main.js',
    output: {
        file: './run-codemirror-6.min.js',
        name: 'renderCodeMirror6',
        format: 'iife',
    },
    plugins: [nodeResolve(), terser()],
};
