const fs = require('fs');
const { existsSync } = fs;
const { appendFile } = fs.promises;
const { resolve } = require('path');
const subfont = require('subfont');
const globby = require('globby');

const Logger = require('./Logger');

const canonicalRoot = process.env.URL;

const immutableHeaders = `
/subfont/*
  cache-control: public
  cache-control: max-age=31536000
  cache-control: immutable
`;

module.exports = {
  onPostBuild: async ({
    constants: { PUBLISH_DIR, NETLIFY_BUILD_VERSION },
    inputs: { entryPoints, ...subfontConfig },
    utils: {
      build: { failPlugin },
    },
  }) => {
    const logger = new Logger();

    function fail(message, { error } = {}) {
      failPlugin([message, logger.toString()].join('\n\n'), { error });
    }

    console.log(
      `Running subfont version ${require('subfont/package.json').version}`
    );

    logger.debug('verions', {
      'netlify-build': NETLIFY_BUILD_VERSION,
      'netlify-plugin-subfont': require('../package.json').version,
      subfont: require('subfont/package.json').version,
      assetgraph: require('assetgraph/package.json').version,
    });

    logger.debug('Plugin configuration', { entryPoints, ...subfontConfig });

    if (!existsSync(PUBLISH_DIR)) {
      logger.log(
        `Skipping plugin. 'build.publish' directory '${PUBLISH_DIR} does not exist'`
      );
      return;
    }

    const resolvedEntryPoints = globby
      .sync(entryPoints, { cwd: PUBLISH_DIR })
      .map((path) => resolve(PUBLISH_DIR, path));

    logger.debug('Resolved entry points', resolvedEntryPoints);

    const resolvedConfig = {
      ...subfontConfig,
      inputFiles: resolvedEntryPoints,
      root: PUBLISH_DIR,
      canonicalRoot,
      inPlace: true,
    };

    logger.debug('Subfont called with', resolvedConfig);

    await subfont(resolvedConfig, console).catch((error) =>
      fail('Failed during font subsetting', { error })
    );

    logger.debug('Subfont succeeded');

    logger.debug('Adding immutable cache headers to subfont assets');

    await appendFile(resolve(PUBLISH_DIR, '_headers'), immutableHeaders).catch(
      (error) => fail('Failed to write immutable cache headers', { error })
    );

    logger.debug('Immutable cache headers added');

    logger.debug('SUCCESS');
  },
};
