module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json',
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'plugin:react/recommended',
	],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-object-literal-type-assertion': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'react/display-name': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
};
