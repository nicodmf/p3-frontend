import type { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from './callout.component';

const meta: Meta<CalloutComponent> = {
  title: 'Components/Callout',
  component: CalloutComponent,
  tags: ['autodocs'],
  render: (args: CalloutComponent) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<CalloutComponent>;

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Ceci est un message informatif.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'L\'opération a été réalisée avec succès.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Veuillez vérifier vos données avant de continuer.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Une erreur est survenue lors du traitement.',
  },
};

export const Closable: Story = {
  args: {
    type: 'info',
    message: 'Vous pouvez fermer ce message.',
    closable: true,
  },
};

export const Overview: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="padding: 2rem; background: #f5f5f5;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 2rem; color: #2C2C2C;">Callout Component - Aperçu Global</h1>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- Info -->
          <div style="background: white; padding: 1.5rem; border-radius: 8px;">
            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Info</h3>
            <app-callout type="info" message="Ceci est un message informatif."></app-callout>
          </div>

          <!-- Success -->
          <div style="background: white; padding: 1.5rem; border-radius: 8px;">
            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Success</h3>
            <app-callout type="success" message="L'opération a été réalisée avec succès."></app-callout>
          </div>

          <!-- Warning -->
          <div style="background: white; padding: 1.5rem; border-radius: 8px;">
            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Warning</h3>
            <app-callout type="warning" message="Veuillez vérifier vos données avant de continuer."></app-callout>
          </div>

          <!-- Error -->
          <div style="background: white; padding: 1.5rem; border-radius: 8px;">
            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Error</h3>
            <app-callout type="error" message="Une erreur est survenue lors du traitement."></app-callout>
          </div>

          <!-- Closable -->
          <div style="background: white; padding: 1.5rem; border-radius: 8px;">
            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem;">Closable</h3>
            <app-callout type="info" message="Vous pouvez fermer ce message." [closable]="true"></app-callout>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [CalloutComponent],
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Aperçu global de tous les types de callout avec leurs variantes.',
      },
    },
  },
};
