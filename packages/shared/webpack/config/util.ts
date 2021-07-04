/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function getBabelPresetEnv({isClient}: {isClient: boolean}) {
	const targetOption = isClient ? {browsers: ['ie >= 11', 'last 2 versions']} : {esmodules: true}

	return [
		'@babel/preset-env',
		{
			targets: {...targetOption},
			useBuiltIns: 'usage',
			corejs: 3,
			shippedProposals: true
		}
	]
}
