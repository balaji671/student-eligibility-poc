import React, { type ReactNode } from 'react';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';

interface Column {
    field: string;
    header: string;
    sortable?: boolean;
    body?: (rowData: any) => ReactNode;
    style?: React.CSSProperties;
}

interface TableProps {
    value: any[];
    columns: Column[];
    paginator?: boolean;
    rows?: number;
    totalRecords?: number;
    onPageChange?: (event: any) => void;
    sortField?: string;
    sortOrder?: number;
    onSort?: (field: string) => void;
    loading?: boolean;
    selection?: any[];
    onSelectionChange?: (value: any[]) => void;
    emptyMessage?: string;
    className?: string;
    ariaLabel?: string;
}

export const Table: React.FC<TableProps> = ({
    value,
    columns,
    paginator = false,
    rows = 10,
    totalRecords = 0,
    onPageChange,
    sortField,
    sortOrder,
    onSort,
    loading = false,
    selection,
    onSelectionChange,
    emptyMessage = 'No records found',
    className = '',
    ariaLabel = 'Data table'
}) => {
    const [first, setFirst] = React.useState(0);
    const [page, setPage] = React.useState(0);

    const handlePageChange = (event: any) => {
        setFirst(event.first);
        setPage(event.page);
        if (onPageChange) {
            onPageChange(event);
        }
    };

    const handleSort = (field: string) => {
        if (onSort) {
            onSort(field);
        }
    };

    const getSortIcon = (field: string) => {
        if (sortField !== field) return 'pi pi-sort-alt';
        return sortOrder === 1 ? 'pi pi-sort-up' : 'pi pi-sort-down';
    };

    const getPaginatedData = () => {
        if (!paginator) return value;
        return value.slice(first, first + rows);
    };

    return (
        <div className="table-container" role="region" aria-label={ariaLabel}>
            {/* Loading State */}
            {loading && (
                <div className="text-center py-8" role="status" aria-label="Loading data">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
            )}

            {/* Table */}
            {!loading && (
                <div className="overflow-x-auto">
                    <table
                        className={`min-w-full divide-y divide-gray-200 ${className}`}
                        role="grid"
                        aria-label={ariaLabel}
                    >
                        <thead className="bg-gray-50">
                            <tr>
                                {selection && onSelectionChange && (
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    onSelectionChange(value);
                                                } else {
                                                    onSelectionChange([]);
                                                }
                                            }}
                                            aria-label="Select all rows"
                                        />
                                    </th>
                                )}
                                {columns.map((column) => (
                                    <th
                                        key={column.field}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        style={column.style}
                                    >
                                        <div className="flex items-center">
                                            <span>{column.header}</span>
                                            {column.sortable && onSort && (
                                                <Button
                                                    icon={getSortIcon(column.field)}
                                                    className="p-button-text p-button-sm ml-1"
                                                    onClick={() => handleSort(column.field)}
                                                    aria-label={`Sort by ${column.header}`}
                                                />
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {getPaginatedData().map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={selection?.includes(row) ? 'bg-blue-50' : 'hover:bg-gray-50'}
                                    role="row"
                                >
                                    {selection && onSelectionChange && (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300"
                                                checked={selection.includes(row)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        onSelectionChange([...selection, row]);
                                                    } else {
                                                        onSelectionChange(selection.filter(item => item !== row));
                                                    }
                                                }}
                                                aria-label={`Select row ${rowIndex + 1}`}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={`${rowIndex}-${colIndex}`}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            role="gridcell"
                                        >
                                            {column.body ? column.body(row) : row[column.field]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {value.length === 0 && !loading && (
                        <div
                            className="text-center py-12 border-t"
                            role="status"
                            aria-live="polite"
                        >
                            <p className="text-gray-500">{emptyMessage}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Paginator */}
            {paginator && value.length > 0 && (
                <div className="mt-4" role="navigation" aria-label="Pagination">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{first + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(first + rows, totalRecords)}</span> of{' '}
                                <span className="font-medium">{totalRecords}</span> results
                            </p>
                        </div>
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={totalRecords}
                            onPageChange={handlePageChange}
                            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                            aria-label="Table pagination"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Example usage component
export const ExampleTable: React.FC = () => {
    const [students] = React.useState([
        { id: 1, name: 'John Doe', grade: '8', status: 'Active' },
        { id: 2, name: 'Jane Smith', grade: '7', status: 'Active' },
        { id: 3, name: 'Bob Johnson', grade: '8', status: 'Inactive' },
    ]);

    const columns: Column[] = [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'grade', header: 'Grade', sortable: true },
        {
            field: 'status',
            header: 'Status',
            body: (rowData) => (
                <span className={`px-2 py-1 text-xs rounded-full ${rowData.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {rowData.status}
                </span>
            )
        },
    ];

    return (
        <Table
            value={students}
            columns={columns}
            paginator
            rows={2}
            totalRecords={students.length}
            ariaLabel="Example student table"
        />
    );
};