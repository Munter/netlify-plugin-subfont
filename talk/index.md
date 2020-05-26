# netlify-plugin-subfont

## About me

- Focused on build tools for static pages for many years
- Worked on static analysis and dependency graphs
- Loves to automate perforamnce optimizations

## About web font performance

- Requires download of CSS, then the font
- Spec focused on avoiding unnessessary downloads
- Delays the reading experience due to blocking behavior
- Techniques for optimizing range from easy to extremely hard

## About subfont

- Demo before/after measurements

### Features
- Stand alone command line tool to optimize your font loading
- Allows you to load fonts naively, automates optimizations
- Statically analyses your pages and calculates exact font variant usage
- Self-hosts fonts to cut down connection latencies
- Preloads fonts to reduce blocking time
- Changes to swap behavior
- Subsets your fonts to the exact glyph usage per font ariant
- Provides fallback loading of original font in case of dynamic content

### Downsides
- Hard to convince people to use command line tool
- Doesn't fit into existing rollup/webpack ecosystems
- Caveats about http2 and CDN distribution
- Manual cache header setup
- Tell it where your code is located

## About netlify plugin
- Slots directly into exosting ecosystem
- Http2 and CDN by default
- Automated cache headers
- Knows where your code is located

## Demo of netlify-plugin-subfont
