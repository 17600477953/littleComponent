'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  BASE_API: '"http://10.10.23.35:3000"'
}
