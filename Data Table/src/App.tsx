import { useState } from 'react';
import { DataTable } from './components/DataTable';
import type { Column } from './components/DataTable/types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Moderator',
    status: 'active',
    joinDate: '2023-01-05',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-12',
  },
];

const userColumns: Column<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
  },
];

function App() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectable, setSelectable] = useState(true);

  const handleRowSelect = (rows: User[]) => {
    setSelectedRows(rows);
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const toggleSelectable = () => {
    setSelectable(!selectable);
    setSelectedRows([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            DataTable Component Demo
          </h1>
          <p className="text-gray-600 mb-6">
            A flexible and generic React + TypeScript DataTable component with sorting, selection, and responsive design.
          </p>
          
          {/* Controls */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={toggleLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Hide Loading' : 'Show Loading'}
            </button>
            <button
              onClick={toggleSelectable}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {selectable ? 'Disable Selection' : 'Enable Selection'}
            </button>
          </div>

          {/* Selected rows info */}
          {selectable && selectedRows.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800">
                <strong>Selected {selectedRows.length} row(s):</strong>{' '}
                {selectedRows.map(row => row.name).join(', ')}
              </p>
            </div>
          )}

          {/* DataTable */}
          <DataTable
            data={sampleUsers}
            columns={userColumns}
            loading={loading}
            selectable={selectable}
            onRowSelect={handleRowSelect}
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Sortable columns</li>
              <li>• Row selection</li>
              <li>• Loading states</li>
              <li>• Empty states</li>
              <li>• Responsive design</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🛠️ TypeScript</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Fully typed</li>
              <li>• Generic interfaces</li>
              <li>• Type-safe props</li>
              <li>• IntelliSense support</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Styling</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• TailwindCSS</li>
              <li>• Responsive utilities</li>
              <li>• Hover effects</li>
              <li>• Clean design</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Storybook</h3>
          <p className="text-gray-600 mb-4">
            View all component variations and examples in Storybook:
          </p>
          <button
            onClick={() => window.open('http://localhost:6006', '_blank')}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Open Storybook
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
