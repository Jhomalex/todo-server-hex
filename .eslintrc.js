module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		indent: 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'prettier/prettier': [
			'warn',
			{},
			{
				usePrettierrc: true,
			},
		],
	},
};
