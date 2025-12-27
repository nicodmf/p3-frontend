import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  render: (args: HeaderComponent) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header for users who are not logged in, showing "Se connecter" button.',
      },
    },
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header for logged-in users, showing "Mon espace" button.',
      },
    },
  },
};
