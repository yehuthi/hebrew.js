import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json" with { type: "json" };

const plugins = [
	typescript({ tsconfig: "./tsconfig.json" }),
	resolve(),
	terser(),
];

export default defineConfig([
	{
		input: "src/index.ts",
		output: [
			{
				file: pkg.browser,
				format: "umd",
				name: "uniqqud",
				exports: "named",
			},
		],
		plugins,
	},
	{
		input: "src/index.ts",
		output: [
			{ file: pkg.main, format: "cjs", exports: "named" },
			{ file: pkg.module, format: "es", exports: "named" },
		],
		plugins,
	},
]);