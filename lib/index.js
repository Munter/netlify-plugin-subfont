const { existsSync } = require('fs');
const { appendFile } = require('fs/promises');
const { resolve } = require('path');
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
    utils: {
      build: { failBuild },
    },
  }) => {
    console.log(
      `Running subfont version ${require('subfont/package.json').version}`
    );

    if (!existsSync(PUBLISH_DIR)) {
      console.log(
        `Skipping plugin. 'build.publish' directory '${PUBLISH_DIR} does not exist'`
      );
      return;
    }

    const resolvedEntryPoints = globby
      .sync(entryPoints, { cwd: PUBLISH_DIR })
      .map((path) => resolve(PUBLISH_DIR, path));

    const headerPromise = appendFile(
      resolve(PUBLISH_DIR, '_headers'),
      immutableHeaders
    ).catch((error) =>
      failBuild('Failed to write immutable cache headers', { error })
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
    ).catch((error) => failBuild('Failed during font subsetting', { error }));

    await Promise.all([headerPromise, resultPromise]);
  },
};
