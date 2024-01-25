import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";
import alias from '@rollup/plugin-alias';

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'tiny-xlsx.js',
			format: 'umd',
			name: 'TinyXLSX',
			exports: 'named'
		},
		plugins: [
			alias({
				jszip: './node_modules/jszip/dist/jszip.min.js'
			}),
			resolve({
				main: true,
				browser: true
			}),
			commonjs({
				ignore: [ 'fs', 'stream' ]
			}),
			terser()
		]
	}
];
