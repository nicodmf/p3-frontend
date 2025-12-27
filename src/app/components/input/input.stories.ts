import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  render: (args: InputComponent) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Entrez votre mot de passe',
  },
};

export const TextInput: Story = {
  args: {
    label: 'Nom',
    type: 'text',
    placeholder: 'Entrez votre nom',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Entrez votre email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Champ désactivé',
    type: 'text',
    placeholder: 'Non disponible',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Champ requis',
    type: 'text',
    placeholder: 'Obligatoire',
    required: true,
  },
};
