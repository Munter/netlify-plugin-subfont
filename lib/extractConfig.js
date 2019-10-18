const { resolve } = require('path');
const globby = require('globby');

module.exports = function extractConfig({
  constants: { BUILD_DIR },
  pluginConfig
}) {
  const {
    canonicalRoot,
    recursive = true,
    inlineFonts = false,
    inlineCss = false,
    fontDisplay = 'swap',
    entryPoints = ['*.html']
  } = pluginConfig;

  const resolvedEntryPoints = globby
    .sync(entryPoints, { cwd: BUILD_DIR })
    .map(path => resolve(BUILD_DIR, path));

  return {
    root: BUILD_DIR,
    canonicalRoot,
    recursive,
    inlineFonts,
    inlineCss,
    fontDisplay,
    entryPoints: resolvedEntryPoints
  };
};
