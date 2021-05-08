module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	rules: {
		// eslint basic rules
		// error rules
		'no-console': 'error',
		'no-eq-null': 'error',
		'consistent-return': 'error',
		'no-param-reassign': ['error', {props: true}],
		'no-mixed-spaces-and-tabs': 'error',
		'no-unused-vars': 'error',
		'no-use-before-define': ['error', {functions: true, variables: true}],
		'array-element-newline': ['error', 'consistent'],
		'arrow-body-style': 'error',
		'object-curly-newline': ['error', {consistent: true}],
		'space-infix-ops': 'error',

		// warn rules
		'no-shadow': 'warn',
		'prefer-destructuring': 'warn',
		'no-underscore-dangle': 'warn',
		'newline-per-chained-call': 'warn',
		camelcase: 'warn',
		'no-useless-constructor': 'warn',

		// off rules
		'max-len': 'off'
	},
	settings: {}
}
