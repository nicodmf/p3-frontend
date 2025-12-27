import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  render: (args) => ({
    component: SelectComponent,
    props: args,
  }),
};

export default meta;
type Story = StoryObj<SelectComponent>;

const defaultOptions: SelectOption[] = [
  { value: '1', label: 'Une journée' },
  { value: '3', label: 'Trois jours' },
  { value: '7', label: 'Une semaine' },
];

export const Default: Story = {
  args: {
    label: 'Expiration',
    options: defaultOptions,
    placeholder: 'Sélectionnez une durée',
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: 'Durée',
    options: defaultOptions,
    value: '3',
    placeholder: 'Sélectionnez une durée',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Champ désactivé',
    options: defaultOptions,
    disabled: true,
  },
};

export const SimpleOptions: Story = {
  args: {
    label: 'Options simples',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ],
  },
};
