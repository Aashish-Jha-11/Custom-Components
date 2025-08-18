import React, { useState } from 'react';
import InputField from './components/InputField';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    search: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form is valid! Check console for data.');
      console.log('Form data:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InputField Component</h1>
          <p className="text-gray-600 mb-8">A comprehensive input field with multiple variants, sizes, and features.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Input */}
            <InputField
              label="Username"
              value={formData.username}
              onChange={handleInputChange('username')}
              placeholder="Enter your username"
              errorMessage={errors.username}
              invalid={!!errors.username}
              showClearButton
            />

            {/* Email Input with Helper Text */}
            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="user@example.com"
              helperText="We'll never share your email with anyone else."
              errorMessage={errors.email}
              invalid={!!errors.email}
              variant="outlined"
            />

            {/* Password Input with Toggle */}
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Enter your password"
              errorMessage={errors.password}
              invalid={!!errors.password}
              showClearButton
              size="md"
            />

            {/* Filled Variant Search */}
            <InputField
              label="Search"
              value={formData.search}
              onChange={handleInputChange('search')}
              placeholder="Search for something..."
              variant="filled"
              showClearButton
              helperText="This input uses the filled variant style"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Submit Form
            </button>
          </form>

          {/* Showcase Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Component Variants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Outlined (Default)</h3>
                <InputField
                  placeholder="Outlined variant"
                  variant="outlined"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Filled</h3>
                <InputField
                  placeholder="Filled variant"
                  variant="filled"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Ghost</h3>
                <InputField
                  placeholder="Ghost variant"
                  variant="ghost"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">Size Variants</h2>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600 mb-2 block">Small</span>
                <InputField
                  placeholder="Small input field"
                  size="sm"
                />
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600 mb-2 block">Medium (Default)</span>
                <InputField
                  placeholder="Medium input field"
                  size="md"
                />
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600 mb-2 block">Large</span>
                <InputField
                  placeholder="Large input field"
                  size="lg"
                />
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Run <code className="bg-blue-100 px-2 py-1 rounded">npm run storybook</code> to explore all component variations and interactive examples in Storybook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;