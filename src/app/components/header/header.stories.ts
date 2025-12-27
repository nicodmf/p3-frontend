import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
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
  render: (args) => ({
    component: HeaderComponent,
    props: args,
  }),
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn$: of(false),
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
    isLoggedIn$: of(true),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header for logged-in users, showing "Mon espace" button.',
      },
    },
  },
};
