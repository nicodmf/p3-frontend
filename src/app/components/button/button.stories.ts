import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Téléverser',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Téléverser',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Téléverser',
    variant: 'tertiary',
  },
};

export const Quaternary: Story = {
  args: {
    label: 'Téléverser',
    variant: 'quaternary',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Téléverser',
    variant: 'primary',
    leftIcon: '←',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Téléverser',
    variant: 'secondary',
    rightIcon: '→',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Téléverser',
    variant: 'quaternary',
    leftIcon: '✓',
    rightIcon: '→',
  },
};

export const Small: Story = {
  args: {
    label: 'Téléverser',
    size: 'small',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    label: 'Téléverser',
    size: 'large',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Téléverser',
    disabled: true,
    variant: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Téléverser',
    fullWidth: true,
    variant: 'primary',
  },
};

export const Overview: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="padding: 2rem; background: #f5f5f5;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 2rem; color: #2C2C2C;">Button Component - Aperçu Global</h1>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <!-- Colonne Enabled -->
          <div>
            <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 1.5rem; color: #2C2C2C;">Enabled</h2>

            <!-- Primary - Enabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Primary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="primary" size="small"></app-button>
                <app-button label="Téléverser" variant="primary" size="large"></app-button>
              </div>
            </div>

            <!-- Secondary - Enabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Secondary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="secondary" size="small"></app-button>
                <app-button label="Téléverser" variant="secondary" size="large"></app-button>
              </div>
            </div>

            <!-- Tertiary - Enabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Tertiary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="tertiary" size="small"></app-button>
                <app-button label="Téléverser" variant="tertiary" size="large"></app-button>
              </div>
            </div>

            <!-- Quaternary - Enabled -->
            <div style="margin-bottom: 2rem; background: #2C2C2C; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: rgba(243, 238, 234, 0.6); margin-bottom: 1rem;">Quaternary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="quaternary" size="small"></app-button>
                <app-button label="Téléverser" variant="quaternary" size="large"></app-button>
              </div>
            </div>
          </div>

          <!-- Colonne Disabled -->
          <div>
            <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 1.5rem; color: #2C2C2C;">Disabled</h2>

            <!-- Primary - Disabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Primary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="primary" size="small" disabled="true"></app-button>
                <app-button label="Téléverser" variant="primary" size="large" disabled="true"></app-button>
              </div>
            </div>

            <!-- Secondary - Disabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Secondary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="secondary" size="small" disabled="true"></app-button>
                <app-button label="Téléverser" variant="secondary" size="large" disabled="true"></app-button>
              </div>
            </div>

            <!-- Tertiary - Disabled -->
            <div style="margin-bottom: 2rem; background: white; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Tertiary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="tertiary" size="small" disabled="true"></app-button>
                <app-button label="Téléverser" variant="tertiary" size="large" disabled="true"></app-button>
              </div>
            </div>

            <!-- Quaternary - Disabled -->
            <div style="margin-bottom: 2rem; background: #2C2C2C; padding: 1.5rem; border-radius: 8px;">
              <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: rgba(243, 238, 234, 0.6); margin-bottom: 1rem;">Quaternary</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <app-button label="Téléverser" variant="quaternary" size="small" disabled="true"></app-button>
                <app-button label="Téléverser" variant="quaternary" size="large" disabled="true"></app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [ButtonComponent],
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Aperçu global de tous les types de boutons avec leurs variantes et états (Enabled/Disabled).',
      },
    },
  },
};
