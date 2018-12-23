'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Parse config into raw materials for our factory
 */
exports.parseConfig = (recipe, app) => _.merge({}, _.get(app, 'config.config', {}), {
  _app: app,
  app: app.name,
  confDest: path.join(app._config.userConfRoot, 'config', recipe),
  home: app._config.home,
  project: app.project,
  recipe,
  root: app.root,
  userConfRoot: app._config.userConfRoot,
});

/*
 * Helper to get a phar download and setupcommand
 * @TODO: clean this mess up
 */
exports.getPhar = (url, src, dest, check) => {
  // Status checker
  let statusCheck = check || 'true';
  // Arrayify the check if needed
  if (_.isString(statusCheck)) statusCheck = [statusCheck];
  // Phar install command
  const pharInstall = [
    ['curl', url, '-L', '-o', src],
    ['chmod', '+x', src],
    statusCheck,
    ['mv', src, dest],
  ];
  // Return
  return _.map(pharInstall, cmd => {
    return cmd.join(' ');
  }).join(' && ');
};
