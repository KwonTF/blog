import webpack, {RuleSetLoader} from 'webpack'

const findBabelPlugins = (baseConfig: webpack.Configuration) => {
  let babelRuleUse
  baseConfig.module.rules.forEach((rule) => {
    const ruleUse = rule?.use as RuleSetLoader[]
    if (!(ruleUse?.length > 0) || !Array.isArray(ruleUse)) return

    // eslint-disable-next-line consistent-return
    const result = ruleUse.find((babelRule) => {
      if (babelRule.loader !== 'babel-loader') return false
      if (babelRule.options && typeof babelRule.options !== 'string') {
        if (babelRule.options.plugins) return true
      }
    })

    if (result) babelRuleUse = result
  })

  return babelRuleUse.options.plugins
}

export function addBabelPlugin(config: webpack.Configuration, plugin: string) {
  const babelPlugins = findBabelPlugins(config)
  if (!babelPlugins) throw new Error('babel-loader not found')
  babelPlugins.push(require.resolve(plugin))
}
