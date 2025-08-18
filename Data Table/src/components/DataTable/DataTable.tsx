import { useState, useCallback, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { DataTableProps, SortState, SortDirection } from './types';

const DataTable = <T = Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Handle column sorting
  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortState(prev => {
      if (prev.column === columnKey) {
        // Cycle through: null -> asc -> desc -> null
        const newDirection: SortDirection = 
          prev.direction === null ? 'asc' :
          prev.direction === 'asc' ? 'desc' : null;
        
        return {
          column: newDirection ? columnKey : null,
          direction: newDirection,
        };
      } else {
        return { column: columnKey, direction: 'asc' };
      }
    });
  }, [columns]);

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  // Handle row selection
  const handleRowSelect = useCallback((index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(idx => sortedData[idx]);
      onRowSelect(selectedData);
    }
  }, [selectedRows, sortedData, onRowSelect]);

  // Handle select all
  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedRows = checked ? new Set(sortedData.map((_, index) => index)) : new Set<number>();
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = checked ? sortedData : [];
      onRowSelect(selectedData);
    }
  }, [sortedData, onRowSelect]);

  const isAllSelected = selectedRows.size === sortedData.length && sortedData.length > 0;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length;

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return null;

    if (sortState.column === columnKey) {
      return sortState.direction === 'asc' ? (
        <ChevronUpIcon className="w-4 h-4 ml-1" />
      ) : (
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      );
    }

    return (
      <div className="flex flex-col ml-1">
        <ChevronUpIcon className="w-3 h-3 text-gray-300" />
        <ChevronDownIcon className="w-3 h-3 text-gray-300 -mt-1" />
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-full bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-center py-12">
            <Loader2Icon className="w-8 h-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-full bg-white border border-gray-200 rounded-lg">
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
            <p className="text-gray-500">There are no records to display.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                }`}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.title}
                  {renderSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${
                selectedRows.has(index) ? 'bg-blue-50' : ''
              }`}
            >
              {selectable && (
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={(e) => handleRowSelect(index, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {String(row[column.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
