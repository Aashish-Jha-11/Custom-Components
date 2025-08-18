import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalType, setInternalType] = useState(type);

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInternalType(showPassword ? 'password' : 'text');
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4',
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Base input classes
  const baseInputClasses = `
    w-full transition-all duration-200 ease-in-out
    placeholder-gray-400 focus:outline-none
    ${sizeClasses[size]}
    ${disabled ? 'cursor-not-allowed opacity-60' : ''}
    ${invalid ? 'text-red-600' : 'text-gray-900'}
  `;

  // Variant-specific classes
  const variantClasses = {
    filled: `
      bg-gray-100 border-none rounded-md
      ${!disabled && 'hover:bg-gray-200'}
      ${invalid ? 'bg-red-50 focus:bg-red-50' : 'focus:bg-white focus:ring-2 focus:ring-blue-500'}
    `,
    outlined: `
      bg-white border-2 rounded-md
      ${invalid 
        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
      }
      ${!disabled && !invalid && 'hover:border-gray-400'}
    `,
    ghost: `
      bg-transparent border-0 border-b-2 rounded-none px-0
      ${invalid 
        ? 'border-red-300 focus:border-red-500' 
        : 'border-gray-300 focus:border-blue-500'
      }
      ${!disabled && !invalid && 'hover:border-gray-400'}
    `,
  };

  const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${className}`;

  // Adjust padding for icons
  const hasRightIcon = (type === 'password') || (showClearButton && value);
  const paddingAdjustment = hasRightIcon ? {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
  } : {};

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${invalid ? 'text-red-700' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={internalType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${inputClasses} ${hasRightIcon ? paddingAdjustment[size] : ''}`}
        />
        
        {/* Right side icons */}
        {hasRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
            {/* Clear button */}
            {showClearButton && value && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className={`
                  text-gray-400 hover:text-gray-600 transition-colors duration-200
                  ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${iconSizeClasses[size]}
                `}
              >
                <X className={iconSizeClasses[size]} />
              </button>
            )}
            
            {/* Password toggle button */}
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className={`
                  text-gray-400 hover:text-gray-600 transition-colors duration-200
                  ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${iconSizeClasses[size]}
                `}
              >
                {showPassword ? (
                  <EyeOff className={iconSizeClasses[size]} />
                ) : (
                  <Eye className={iconSizeClasses[size]} />
                )}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || (invalid && errorMessage)) && (
        <div className="mt-1 text-sm">
          {invalid && errorMessage ? (
            <span className="text-red-600">{errorMessage}</span>
          ) : (
            <span className="text-gray-500">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;