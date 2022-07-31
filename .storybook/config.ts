import { configure, addDecorator, setAddon, addParameters } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { addReadme } from "storybook-readme";

addDecorator(addReadme);
setAddon(JSXAddon);
addParameters({
  options: {
    theme: {
      base: 'light'
    },
  },
})

function loadStories() {
  require('../src/stories.tsx');
}

configure(loadStories, module);
