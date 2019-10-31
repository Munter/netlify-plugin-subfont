const { promisify } = require('util');
const { resolve } = require('path');
const appendFile = promisify(require('fs').appendFile);
const extractConfig = require('./extractConfig');
const subfont = require('subfont');

const immutableHeaders = `
/subfont/*
  cache-control: public
  cache-control: max-age=31536000
  cache-control: immutable
`;

module.exports = {
  name: 'netlify-plugin-subfont',
  postBuild: async config => {
    const {
      root,
      canonicalRoot,
      recursive,
      inlineFonts,
      inlineCss,
      fontDisplay,
      entryPoints
    } = extractConfig(config);

    const headerPromise = appendFile(
      resolve(root, '_headers'),
      immutableHeaders
    );

    const result = await subfont(
      {
        inPlace: true,
        inputFiles: entryPoints,
        root,
        canonicalRoot,
        recursive,
        inlineFonts,
        inlineCss,
        fontDisplay
      },
      console
    );

    await headerPromise;

    return result;
  }
};
