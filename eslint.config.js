// @ts-check

import eslintJS from '@eslint/js';
import typescriptESLintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import-x';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from "globals";
import {
	config as typescriptESLintConfig,
	configs as typescriptESLintConfigs
} from 'typescript-eslint';

const eslintConfig = typescriptESLintConfig(
	{ files: ["src/**/*.ts", "test/**/*.ts"] },
	eslintJS.configs.recommended,
	{
		name: "base",
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		rules: {
			"constructor-super": "error",
			"for-direction": "error",
			"no-await-in-loop": "error",
			"no-constant-binary-expression": "error",
			"no-duplicate-imports": "error",
			"no-new-native-nonconstructor": "error",
			"no-promise-executor-return": "error",
			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"no-unused-private-class-members": "error",
			"require-atomic-updates": "error",
			"no-use-before-define": "error",
			"camelcase": "error",
			"no-return-await": "off",
		}
	},
	...typescriptESLintConfigs.recommendedTypeChecked,
	{
		name: "typescript",
		languageOptions: {
			globals: { ...globals.node, ...globals.es2025 },
			parser: typescriptESLintParser,
			parserOptions: {
				project: "./tsconfig.json",
				projectService: {
					defaultProject: "./tsconfig.json",
					allowDefaultProject: ["eslint.config.js", "commitlint.config.ts", "prettier.config.js", "vitest.config.ts"]
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-require-imports": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/prefer-enum-initializers": "error",
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/return-await": "error",
			"@typescript-eslint/adjacent-overload-signatures": "error",
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: 'with-single-extends' }],
			"@typescript-eslint/array-type": [
				"error",
				{
					"default": "generic"
				}
			],
		}
	},
	{
		name: "import-x",
		plugins: { 'import-x': eslintPluginImport },
		languageOptions: {
			parserOptions: eslintPluginImport.configs.recommended.parserOptions
		},
		settings: {
			"import-x/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"]
			},
			"import-x/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
				node: true
			}
		},
		rules: eslintPluginImport.configs.recommended.rules
	},
	{
		name: "unicorn",
		languageOptions: {
			globals: globals.builtin,
		},
		plugins: {
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			"unicorn/custom-error-definition": "error",
			"unicorn/empty-brace-spaces": "error",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-console-spaces": "error",
			"unicorn/no-null": "off",
			"unicorn/prevent-abbreviations": [
				"error",
				{
					"replacements": {
						"arg": false,
						"args": false,
						"env": false
					},
					"ignore": ["semVer", "SemVer"]
				}
			],
		}
	},
	{
		name: "security",
		plugins: { security: eslintPluginSecurity }
	},
	{
		name: "node",
		languageOptions: {
			globals: {
				...globals.es2021,
				...globals.node,
				__dirname: "off",
				__filename: "off",
				exports: "off",
				module: "off",
				require: "off",
			},
			parserOptions: {
				ecmaFeatures: { globalReturn: false },
				ecmaVersion: 2021,
				sourceType: "module",
			},
		},
		rules: {
			"n/no-deprecated-api": "error",
			"n/no-extraneous-import": "error",
			"n/no-extraneous-require": "error",
			"n/no-exports-assign": "error",
			"n/no-missing-import": "error",
			"n/no-missing-require": "error",
			"n/no-process-exit": "error",
			"n/no-unpublished-bin": "off",
			"n/no-unpublished-import": "off",
			"n/no-unpublished-require": "off",
			"n/no-unsupported-features/es-builtins": "error",
			"n/no-unsupported-features/node-builtins": "error",
			"n/process-exit-as-throw": "error",
			"n/hashbang": "error",
			"n/no-unsupported-features/es-syntax": [
				"error",
				{ ignores: ["modules"] },
			],
		},
	},
	{
		name: "n",
		plugins: { n: eslintPluginN },
		rules: {
			"n/handle-callback-err": "error",
			"n/no-callback-literal": "error",
			"n/no-new-require": "error",
			"n/no-path-concat": "error",
			"n/prefer-node-protocol": "error"
		}
	}
)

export default [...eslintConfig, eslintConfigPrettier]