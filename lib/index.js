const AssetGraph = require('assetgraph');
const subfont = require('subfont');

async function subfontPlugin({ pluginConfig = {}, netlifyConfig = {} }) {
  return {
    postBuild: async ({ pluginConfig = {}, netlifyConfig = {} }) => {
      console.log(pluginConfig);
      console.log(netlifyConfig);
    }
  };
}

module.exports = subfontPlugin;
