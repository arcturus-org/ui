module.exports = {
  appId: 'wx139ead4836c519e2',
  app: 'src/app',
  compileType: 'miniprogram',
  plugins: [
    '@mpflow/plugin-babel',
    '@mpflow/plugin-typescript',
    '@mpflow/plugin-css',
    '@mpflow/plugin-unit-test',
  ],
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
