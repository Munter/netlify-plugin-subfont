const { promisify } = require('util');
const { resolve } = require('path');
const appendFile = promisify(require('fs').appendFile);
const subfont = require('subfont');
const globby = require('globby');

const canonicalRoot = process.env.URL;

const immutableHeaders = `
/subfont/*
  cache-control: public
  cache-control: max-age=31536000
  cache-control: immutable
`;

module.exports = {
  onPostBuild: async ({
    constants: { PUBLISH_DIR },
    inputs: { entryPoints, ...subfontConfig },
  }) => {
    console.log(
      `Running subfont version ${require('subfont/package.json').version}`
    );

    const resolvedEntryPoints = globby
      .sync(entryPoints, { cwd: PUBLISH_DIR })
      .map((path) => resolve(PUBLISH_DIR, path));

    const headerPromise = appendFile(
      resolve(PUBLISH_DIR, '_headers'),
      immutableHeaders
    );

    const resultPromise = subfont(
      {
        ...subfontConfig,
        inputFiles: resolvedEntryPoints,
        root: PUBLISH_DIR,
        canonicalRoot,
        inPlace: true,
      },
      console
    );

    await Promise.all([headerPromise, resultPromise]);
  },
};
