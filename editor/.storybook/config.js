import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Editor.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
