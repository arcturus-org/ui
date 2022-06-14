module.exports = {
  appId: 'wx139ead4836c519e2',
  app: (mode) =>
    mode === 'production' ? undefined : 'src/app',
  pages: (mode) =>
    mode === 'production'
      ? ['src/components/index']
      : undefined,
  compileType: 'miniprogram', // 构建类型
  plugins: [
    '@mpflow/plugin-babel',
    '@mpflow/plugin-typescript',
    '@mpflow/plugin-css',
    '@mpflow/plugin-unit-test',
  ],
  sourceMap: false,
  sourceDir: 'src', // 源码目录
  outputDir: 'dist', // 打包输出目录
  settings: {
    urlCheck: true,
    es6: true,
    enhance: false,
    postcss: false,
    preloadBackgroundData: false,
    minified: false,
    newFeature: false,
    coverView: true,
    nodeModules: false,
    autoAudits: false,
    showShadowRootInWxmlPanel: true,
    scopeDataCheck: false,
    uglifyFileName: false,
    checkInvalidKey: true,
    checkSiteMap: true,
    uploadWithSourceMap: true,
    compileHotReLoad: false,
    babelSetting: {
      ignore: [],
      disablePlugins: [],
      outputPath: '',
    },
    useIsolateContext: true,
    useCompilerModule: false,
    userConfirmedUseCompilerModuleSwitch: false,
  },
};
