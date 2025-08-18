import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input field component with multiple variants, sizes, and features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled input
const InteractiveWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div className="w-80">
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

// Default input
export const Default: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

// With helper text
export const WithHelperText: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Email Address',
    placeholder: 'user@example.com',
    helperText: 'We\'ll never share your email with anyone else.',
    type: 'email',
  },
};

// With error message
export const WithError: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    errorMessage: 'Password must be at least 8 characters long',
    invalid: true,
    type: 'password',
    value: 'short',
  },
};

// Disabled state
export const Disabled: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
};

// Filled variant
export const FilledVariant: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    variant: 'filled',
  },
};

// Outlined variant (default)
export const OutlinedVariant: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    variant: 'outlined',
  },
};

// Ghost variant
export const GhostVariant: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Minimal Input',
    placeholder: 'Clean and minimal',
    variant: 'ghost',
  },
};

// Small size
export const SmallSize: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Small Input',
    placeholder: 'Compact size',
    size: 'sm',
  },
};

// Medium size (default)
export const MediumSize: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Medium Input',
    placeholder: 'Default size',
    size: 'md',
  },
};

// Large size
export const LargeSize: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Large Input',
    placeholder: 'Spacious size',
    size: 'lg',
  },
};

// Password input with toggle
export const PasswordWithToggle: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Click the eye icon to show/hide password',
  },
};

// Clear button example
export const WithClearButton: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Search Query',
    placeholder: 'Type something to see clear button',
    showClearButton: true,
    helperText: 'Clear button appears when you type',
    value: 'Sample text with clear button',
  },
};

// All features combined
export const AllFeatures: Story = {
  render: InteractiveWrapper,
  args: {
    label: 'Advanced Input',
    placeholder: 'Type your password',
    type: 'password',
    showClearButton: true,
    helperText: 'Password with both toggle and clear functionality',
    variant: 'outlined',
    size: 'md',
    value: 'secretpassword',
  },
};

// Variants showcase
export const VariantsShowcase: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InteractiveWrapper 
        label="Filled Variant" 
        placeholder="Filled input"
        variant="filled"
      />
      <InteractiveWrapper 
        label="Outlined Variant" 
        placeholder="Outlined input"
        variant="outlined"
      />
      <InteractiveWrapper 
        label="Ghost Variant" 
        placeholder="Ghost input"
        variant="ghost"
      />
    </div>
  ),
};

// Sizes showcase
export const SizesShowcase: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InteractiveWrapper 
        label="Small Size" 
        placeholder="Small input"
        size="sm"
      />
      <InteractiveWrapper 
        label="Medium Size" 
        placeholder="Medium input"
        size="md"
      />
      <InteractiveWrapper 
        label="Large Size" 
        placeholder="Large input"
        size="lg"
      />
    </div>
  ),
};