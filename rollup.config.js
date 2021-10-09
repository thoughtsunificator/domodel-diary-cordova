import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import copy from "rollup-plugin-copy-watch"
import nodeResolve from "@rollup/plugin-node-resolve"
import { terser } from "@wwa/rollup-plugin-terser"
import livereload from "rollup-plugin-livereload"
import globImport from 'rollup-plugin-glob-import'

const isProduction = process.env.BUILD === "production"
const isDevelopment = !isProduction

export default {
	input: "./src/renderer/main.js",
	output: {
		file: "./dist/renderer/bundle.js",
		format: "iife",
		sourcemap: isDevelopment
	},
	plugins: [
		postcss({
			sourceMap: isDevelopment,
			minimize: isProduction,
			extract: true,
			plugins: [postcssImport()]
		}),
		copy({
			watch: isDevelopment ? "public" : false,
			targets: [{ src: "public/*", dest: "dist" }],
			flatten: false
		}),
		isProduction && terser(),
		nodeResolve(),
		globImport(),
		isDevelopment && livereload("dist")
	]
}
