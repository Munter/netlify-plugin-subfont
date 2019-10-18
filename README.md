# Netlify Subfont Build Plugin

[![NPM version](https://badge.fury.io/js/netlify-plugin-subfont.svg)](http://badge.fury.io/js/netlify-plugin-subfont)
[![Build Status](https://travis-ci.org/Munter/netlify-plugin-subfont.svg?branch=master)](https://travis-ci.org/Munter/netlify-plugin-subfont)
[![Coverage Status](https://img.shields.io/coveralls/Munter/netlify-plugin-subfont.svg)](https://coveralls.io/r/Munter/netlify-plugin-subfont?branch=master)
[![Dependency Status](https://david-dm.org/Munter/netlify-plugin-subfont.svg)](https://david-dm.org/Munter/netlify-plugin-subfont) [![Greenkeeper badge](https://badges.greenkeeper.io/Munter/netlify-plugin-subfont.svg)](https://greenkeeper.io/)

Subfont post-processes your web page to analyse you usage of web fonts, then reworks your webpage to use an optimal font loading strategy for the best performance. It will also aggressively subset your fonts to speed up the time to font download.

Subfont will generate some new files, fonts and CSS, and will add immutavble cache headers for them automatically.

See [Peter Müller](https://twitter.com/_munter_)'s presentation of [Subfont](https://www.npmjs.com/package/subfont) at [Fronteers 2019](https://vimeo.com/364391458).

Subfont is compatible with Google Fonts and local fonts.

## Installation

```
npm install --save-dev netlify-plugin-subfont
```

Then add the following to your `netlify.yml`:

```yml
plugins:
  subfont:
    type: netlify-plugin-subfont
```

If you are using local fonts from your own repository it is recommended to also install [fonttools](https://github.com/fonttools/fonttools). On Netlify you can do this by adding the following content into `requirements.txt` in your project root:

```
fonttools
brotli
zopfli
```

## Configuration

Subfont works out of the box, but can be improved upon with some improved knowledge about your site.

These are the configuration options with their default values:

```yml
plugins:
  subfont:
    type: netlify-plugin-subfont
    config:
      # An array of glob patterns for pages on your site
      # Recursive traversal will start from these
      entryPoints:
        - *.html

      # canonicalRoot is the origin where your page will eventually be deployed
      # Setting canonicalRoot will enable subfont to map canonical URL's to your
      # page in your code to local files on disk
      canonicalRoot: https://your-page.netlify.com

      # Follow your links across all pages to optimize the fonts across the antire site
      recursive: true

      # Subfont lets you set CSS font-display value of the optimized subsets
      # See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
      fontDisplay: swap

      # Inline generated CSS @font-face blocks into each page
      # When set to `false` an external CSS file will be created
      inlineCss: false

      # Inline generated font subsets into their respective @font-face blocks
      # When set to `false` external font files will be created
      inlineFonts: false
```

## License

[BSD 3-Clause License](<https://tldrlegal.com/license/bsd-3-clause-license-(revised)>)
