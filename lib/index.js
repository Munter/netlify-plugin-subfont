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
    constants: { BUILD_DIR },
    inputs: { entryPoints, ...subfontConfig },
  }) => {
    console.log(
      `Running subfont version ${require('subfont/package.json').version}`
    );

    const resolvedEntryPoints = globby
      .sync(entryPoints, { cwd: BUILD_DIR })
      .map((path) => resolve(BUILD_DIR, path));

    const headerPromise = appendFile(
      resolve(BUILD_DIR, '_headers'),
      immutableHeaders
    );

    const result = await subfont(
      {
        ...subfontConfig,
        inputFiles: resolvedEntryPoints,
        root: BUILD_DIR,
        canonicalRoot,
        inPlace: true,
      },
      console
    );

    await headerPromise;
  },
};
