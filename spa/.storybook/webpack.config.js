const path = require('path')
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          parser: 'typescript',
        },
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
