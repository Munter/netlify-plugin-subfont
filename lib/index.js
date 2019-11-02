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
    console.log(
      `Running subfont version ${require('subfont/package.json').version}`
    );
    const validatedConfig = extractConfig(config);

    const headerPromise = appendFile(
      resolve(validatedConfig.root, '_headers'),
      immutableHeaders
    );

    const result = await subfont(
      {
        ...validatedConfig,
        inPlace: true
      },
      console
    );

    await headerPromise;

    return result;
  }
};
