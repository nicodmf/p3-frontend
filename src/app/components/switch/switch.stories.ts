import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent, SwitchOption } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SwitchComponent>;

const filterOptions: SwitchOption[] = [
  { value: 'all', label: 'Tous' },
  { value: 'active', label: 'Actifs' },
  { value: 'expired', label: 'Expiré' },
];

export const Default: Story = {
  args: {
    label: 'Filtres',
    options: filterOptions,
    value: 'all',
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: 'Statut',
    options: filterOptions,
    value: 'active',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Désactivé',
    options: filterOptions,
    disabled: true,
  },
};

export const SimpleToggle: Story = {
  args: {
    label: 'Options',
    options: [
      { value: 'yes', label: 'Oui' },
      { value: 'no', label: 'Non' },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Mon espace',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};
