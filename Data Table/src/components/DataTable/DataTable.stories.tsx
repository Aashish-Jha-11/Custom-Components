import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './index';
import { Column } from './types';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
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

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 25,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Coffee Mug',
    category: 'Kitchen',
    price: 15.99,
    stock: 100,
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Laptop Stand',
    category: 'Office',
    price: 45.99,
    stock: 15,
    rating: 4.8,
  },
];

// Column definitions
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

const productColumns: Column<Product>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Product Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'category',
    title: 'Category',
    dataIndex: 'category',
    sortable: true,
  },
  {
    key: 'price',
    title: 'Price ($)',
    dataIndex: 'price',
    sortable: true,
  },
  {
    key: 'stock',
    title: 'Stock',
    dataIndex: 'stock',
    sortable: true,
  },
  {
    key: 'rating',
    title: 'Rating',
    dataIndex: 'rating',
    sortable: true,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible and generic DataTable component with sorting, selection, and responsive design.',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display in the table',
    },
    columns: {
      description: 'Array of column definitions',
    },
    loading: {
      description: 'Show loading spinner when true',
      control: 'boolean',
    },
    selectable: {
      description: 'Enable row selection with checkboxes',
      control: 'boolean',
    },
    onRowSelect: {
      description: 'Callback function called when rows are selected',
      action: 'rowsSelected',
    },
  },
};

export default meta;

// Helper components for specific data types
const UserDataTable = (props: {
  data: User[];
  columns: Column<User>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: User[]) => void;
}) => <DataTable {...props} />;

const ProductDataTable = (props: {
  data: Product[];
  columns: Column<Product>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: Product[]) => void;
}) => <DataTable {...props} />;

type UserStory = StoryObj<typeof UserDataTable>;
type ProductStory = StoryObj<typeof ProductDataTable>;

// Default table with data
export const Default: UserStory = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic table displaying user data with all columns.',
      },
    },
  },
  render: (args) => <UserDataTable {...args} />,
};

// Empty state
export const EmptyState: UserStory = {
  args: {
    data: [],
    columns: userColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with no data showing empty state message.',
      },
    },
  },
  render: (args) => <UserDataTable {...args} />,
};

// Loading state
export const LoadingState: UserStory = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: true,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table in loading state with spinner.',
      },
    },
  },
  render: (args) => <UserDataTable {...args} />,
};

// Sortable columns
export const SortableColumns: ProductStory = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    loading: false,
    selectable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with sortable columns. Click on column headers to sort (cycle through ascending, descending, and no sort).',
      },
    },
  },
  render: (args) => <ProductDataTable {...args} />,
};

// Row selection enabled
export const RowSelection: UserStory = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: false,
    selectable: true,
    onRowSelect: (selectedRows: User[]) => {
      console.log('Selected rows:', selectedRows);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with row selection enabled. Select individual rows or use the header checkbox to select all.',
      },
    },
  },
  render: (args) => <UserDataTable {...args} />,
};

// Combined features
export const AllFeatures: ProductStory = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    loading: false,
    selectable: true,
    onRowSelect: (selectedRows: Product[]) => {
      console.log('Selected rows:', selectedRows);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with all features enabled: sorting, row selection, and responsive design.',
      },
    },
  },
  render: (args) => <ProductDataTable {...args} />,
};

// Large dataset for testing performance and scrolling
const largeSampleData: User[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'User', 'Moderator'][index % 3],
  status: ['active', 'inactive'][index % 2] as 'active' | 'inactive',
  joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
}));

export const LargeDataset: UserStory = {
  args: {
    data: largeSampleData,
    columns: userColumns,
    loading: false,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a large dataset to test performance and scrolling behavior.',
      },
    },
  },
  render: (args) => <UserDataTable {...args} />,
};
