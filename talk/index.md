# netlify-plugin-subfont

## About me

- Focused on **build tools** for static pages for many years
- Worked on **static analysis** and **web page dependency graphs**
- Loves to **automate performance optimizations**

## About web font performance

**TEXT IS YOUR MOST IMPORTANT ASSET**

**WEBFONTS SLOW DOWN RENDERING OF TEXT**

- Requires download of CSS, then the font
- Spec focused on avoiding unnessessary downloads
- Delays the reading experience due to blocking behavior
- Techniques for optimizing range from easy to extremely hard
- You need to know the **tradeoffs** and you need a **font loading strategy**

## About subfont

- Automates a **very efficient strategy** for static pages
- Demo before/after measurements

### Features
- Stand alone command line tool to optimize your font loading
- Allows you to load fonts naively in development, automates optimizations
- Statically analyses your pages and calculates exact font variant usage
- Self-hosts fonts to cut down connection latencies
- Preloads fonts to reduce blocking time
- Changes to swap behavior
- Subsets your fonts to the exact glyph usage per font variant
- Provides fallback loading of original font in case of dynamic content

### Downsides
- Hard to convince people to use command line tool
- Doesn't fit into existing rollup/webpack ecosystems
- Caveats about http2 and CDN distribution
- Manual cache header setup
- Tell it where your code is located
- Mostly static pages

## About netlify plugin
- Slots directly into existing ecosystem
- Http2 and CDN by default
- Automated cache headers
- Knows where your code is located
- JamStack is mostly static pages

## Demo of netlify-plugin-subfont
- Add this to your configuration
