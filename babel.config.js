// babel-preset-taro does the heavy lifting for the Taro + React toolchain.
module.exports = {
  presets: [
    ['taro', { framework: 'react', ts: true, compiler: 'webpack5' }]
  ]
}
