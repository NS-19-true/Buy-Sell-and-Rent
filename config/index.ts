import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'

// https://docs.taro.zone/docs/config
export default defineConfig<'webpack5'>(async (merge) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'campus-trade',
    date: '2026-11-07',
    // The original web UI was laid out for a 390px-wide phone; keep those numbers 1:1.
    // Taro turns every `px` in the stylesheets into `rpx` (750rpx = screen width).
    designWidth: 390,
    deviceRatio: { 390: 750 / 390, 640: 2.34 / 2, 750: 1, 828: 1.81 / 2 },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: { patterns: [], options: {} },
    framework: 'react',
    compiler: 'webpack5',
    cache: { enable: false },
    mini: {
      postcss: {
        pxtransform: { enable: true, config: {} },
        cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[name]__[local]___[hash:base64:5]' } }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') return merge({}, baseConfig, devConfig)
  return merge({}, baseConfig, prodConfig)
})
