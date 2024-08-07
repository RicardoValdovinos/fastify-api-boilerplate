// @ts-check

import eslintJS from '@eslint/js';
import typescriptESLintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from "globals";
import typescriptESLint from 'typescript-eslint';

const eslintConfig = typescriptESLint.config(
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
	...typescriptESLint.configs.recommendedTypeChecked,
	{
		name: "typescript",
		languageOptions: {
			globals: { ...globals.node, ...globals.es2025 },
			parser: typescriptESLintParser,
			parserOptions: {
				projectService: true,
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
			"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "Type\." }],
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
		name: "import",
		plugins: { import: eslintPluginImport },
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"]
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
				node: true
			}
		},
		"rules": {
			// turn on errors for missing imports
			"import/no-unresolved": "error"
		},
	},
	eslintConfigPrettier,
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
		name: "n",
		plugins: { n: eslintPluginN },
		rules: {
			"n/handle-callback-err": "error",
			"n/no-callback-literal": "error",
			"n/no-new-require": "error",
			"n/no-path-concat": "error"
		}
	}
)

eslintConfig.map((config) => {
	config.files = ["src/**/*.ts"]
})

export default eslintConfig