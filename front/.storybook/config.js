import {
  configure
} from '@storybook/react';

function loadStories() {
  let req = require.context("../src/stories", true, /.(tsx|js)$/);
  req.keys().forEach(filename => req(filename));

  req = require.context("../src", true, /.stories.(tsx|js)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
