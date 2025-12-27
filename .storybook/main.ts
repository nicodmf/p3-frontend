import type { StorybookConfig } from '@storybook/angular';
import { join } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/app/components/**/*.stories.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
