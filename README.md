# Netlify Subfont Build Plugin

[![NPM version](https://badge.fury.io/js/netlify-plugin-subfont.svg)](http://badge.fury.io/js/netlify-plugin-subfont)
[![Build Status](https://travis-ci.org/Munter/netlify-plugin-subfont.svg?branch=master)](https://travis-ci.org/Munter/netlify-plugin-subfont)
[![Dependency Status](https://david-dm.org/Munter/netlify-plugin-subfont.svg)](https://david-dm.org/Munter/netlify-plugin-subfont)

Subfont post-processes your web page to analyse you usage of web fonts, then reworks your webpage to use an optimal font loading strategy for the best performance. It will also aggressively subset your fonts to speed up the time to font download.

Subfont will generate some new files, fonts and CSS, and will add immutable cache headers for them automatically.

See [Peter Müller](https://twitter.com/_munter_)'s presentation of [Subfont](https://www.npmjs.com/package/subfont) at [Fronteers 2019](https://vimeo.com/364391458).

Subfont is compatible with Google Fonts and local fonts.

## Installation

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-subfont/install) or from the [Plugins directory](https://app.netlify.com/plugins).

For file-based installation, add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-subfont"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

To complete file-based installation, from your project's base directory, use npm, yarn, or any other Node.js package manager to add the plugin to `devDependencies` in `package.json`.

```
npm install -D netlify-plugin-subfont
```

## Configuration

Subfont works out of the box, but can be improved upon with some improved knowledge about your site.

These are the configuration options with their default values:

```toml
[[plugins]]
package = "netlify-plugin-subfont"

  [plugins.inputs]
  # An array of glob patterns for pages on your site
  # Recursive traversal will start from these
  entryPoints = [
    "*.html",
  ]

  # Follow your links across all pages to optimize the fonts across the entire site
  recursive = true

  # Subfont lets you set CSS font-display value of the optimized subsets
  # See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  fontDisplay = "swap"

  # Inline generated CSS @font-face blocks into each page
  # When set to `false` an external CSS file will be created
  inlineCss = false

  # Inline generated font subsets into their respective @font-face blocks
  # When set to `false` external font files will be created
  inlineFonts = false

  # Include fallbacks so the original font will be loaded when dynamic content gets injected at runtime
  # When set to `false` external font files will be created
  fallbacks = true
```

## License

[BSD 3-Clause License](<https://tldrlegal.com/license/bsd-3-clause-license-(revised)>)
