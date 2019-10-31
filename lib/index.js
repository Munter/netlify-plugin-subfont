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

    const args = ['-i', '--root', root, '--font-display', fontDisplay];

    if (canonicalRoot) {
      args.push('--canonicalroot', canonicalRoot);
    }

    if (recursive === false) {
      args.push('--no-recursive');
    }

    if (inlineFonts) {
      args.push('--inline-fonts');
    }

    if (inlineCss) {
      args.push('--inline-css');
    }

    await subfont(args.concat(entryPoints), console);

    await appendFile(resolve(root, '_headers'), immutableHeaders);
  }
};
