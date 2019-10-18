const { resolve } = require('path');
const expect = require('unexpected');
const extractConfig = require('../lib/extractConfig');

const BUILD_DIR = resolve(__dirname, '../testdata/manypages');
const defaultConfig = {
  constants: {
    BUILD_DIR
  },
  pluginConfig: {}
};

describe('extractConfig', () => {
  it('should have the expected defaults', () => {
    expect(extractConfig(defaultConfig), 'to satisfy', {
      root: BUILD_DIR,
      canonicalRoot: undefined,
      recursive: true,
      inlineFonts: false,
      inlineCss: false,
      fontDisplay: 'swap',
      entryPoints: [
        resolve(BUILD_DIR, '404.html'),
        resolve(BUILD_DIR, '500.html'),
        resolve(BUILD_DIR, 'index.html')
      ]
    });
  });

  it('should parse all options', () => {
    const config = {
      ...defaultConfig,
      pluginConfig: {
        canonicalRoot: 'https://netlify.com',
        recursive: false,
        inlineFonts: true,
        inlineCss: true,
        fontDisplay: 'optional',
        entryPoints: ['index.html']
      }
    };
    expect(extractConfig(config), 'to satisfy', {
      canonicalRoot: undefined,
      recursive: false,
      inlineFonts: true,
      inlineCss: true,
      fontDisplay: 'optional',
      entryPoints: [resolve(BUILD_DIR, 'index.html')]
    });
  });

  it('should throw on invalid fontDisplay values', () => {
    const config = {
      ...defaultConfig,
      pluginConfig: {
        fontDisplay: 'invalid'
      }
    };
    expect(
      () => extractConfig(config),
      'to throw',
      new Error(
        'subfont config: fontDisplay must be one of ["auto","block","swap","fallback","optional"]'
      )
    );
  });
  it('should take multiple entry points', () => {
    const config = {
      ...defaultConfig,
      pluginConfig: {
        entryPoints: ['index.html', '404.html', 'subpage/index.html']
      }
    };
    expect(extractConfig(config), 'to satisfy', {
      entryPoints: [
        resolve(BUILD_DIR, 'index.html'),
        resolve(BUILD_DIR, '404.html'),
        resolve(BUILD_DIR, 'subpage/index.html')
      ]
    });
  });

  it('should expand entry point glob patterns', () => {
    const config = {
      ...defaultConfig,
      pluginConfig: {
        entryPoints: ['**/*.html']
      }
    };
    expect(extractConfig(config), 'to satisfy', {
      entryPoints: [
        resolve(BUILD_DIR, '404.html'),
        resolve(BUILD_DIR, '500.html'),
        resolve(BUILD_DIR, 'index.html'),
        resolve(BUILD_DIR, 'subpage/index.html'),
        resolve(BUILD_DIR, 'path/to/deep/file.html')
      ]
    });
  });
});
