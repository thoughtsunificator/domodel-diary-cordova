import path from "path"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import copy from "rollup-plugin-copy"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import rootImport from "rollup-plugin-root-import"
import globImport from 'rollup-plugin-glob-import'

export default {
	input: "./src/main.js",
	output: {
		file: "./www/bundle.js",
		format: "iife",
		sourcemap: true
	},
	plugins: [
		del({ targets: "www/*" }),
		postcss({
			sourceMap: true,
			extract: path.resolve("www/bundle.css"),
			plugins: [postcssImport()]
		}),
		copy({
			watch: 'public',
			targets: [{ src: "public/*", dest: "www" }],
			flatten: true
		}),
		nodeResolve(),
		alias({
			entries: [
				{ find:/^lib\/(.*)/, replacement: "./lib/$1" },
				{ find:/^assets\/(.*)/, replacement: "./assets/$1" },
				{ find:/^data\/(.*)/, replacement: "./data/$1" },
				{ find:/^\.env\.js$/, replacement: "./.env.js" }
			]
		}),
		rootImport({
			root: `${__dirname}/src`,
			useInput: "prepend",
			extensions: ".js",
		}),
		globImport()
	]
}
