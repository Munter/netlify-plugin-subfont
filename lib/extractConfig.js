const { resolve } = require('path');
const globby = require('globby');

const validFontDisplayValues = [
  'auto',
  'block',
  'swap',
  'fallback',
  'optional'
];

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

  if (!validFontDisplayValues.includes(fontDisplay)) {
    throw new Error(
      `subfont config: fontDisplay must be one of ${JSON.stringify(
        validFontDisplayValues
      )}`
    );
  }

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
