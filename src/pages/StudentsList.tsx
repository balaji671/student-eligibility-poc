import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { Search, Filter, UserPlus } from 'lucide-react';
import { DemoBanner } from '../components/Common/DemoBanner';
import { StatusBadge } from '../components/UI/StatusBadge';
import { Card } from 'primereact/card';

const mockStudents = [
    { id: 'S1001', firstName: 'John', lastName: 'Smith', dateOfBirth: '2010-05-15', grade: '8', status: 'Eligible', flags: [] },
    { id: 'S1002', firstName: 'Jane', lastName: 'Doe', dateOfBirth: '2011-03-22', grade: '7', status: 'Review', flags: ['Incomplete'] },
    { id: 'S1003', firstName: 'Robert', lastName: 'Johnson', dateOfBirth: '2010-11-30', grade: '8', status: 'Draft', flags: [] },
    { id: 'S1004', firstName: 'Maria', lastName: 'Garcia', dateOfBirth: '2011-07-14', grade: '7', status: 'Eligible', flags: [] },
    { id: 'S1005', firstName: 'David', lastName: 'Brown', dateOfBirth: '2010-09-05', grade: '8', status: 'Ineligible', flags: ['Duplicate'] },
    { id: 'S1006', firstName: 'Sarah', lastName: 'Wilson', dateOfBirth: '2011-01-18', grade: '7', status: 'Review', flags: [] },
    { id: 'S1007', firstName: 'Michael', lastName: 'Taylor', dateOfBirth: '2010-12-25', grade: '8', status: 'Eligible', flags: [] },
    { id: 'S1008', firstName: 'Emily', lastName: 'Anderson', dateOfBirth: '2011-04-30', grade: '7', status: 'Draft', flags: ['Incomplete'] },
];

export const StudentsList: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        status: { value: '', matchMode: FilterMatchMode.EQUALS },
        grade: { value: '', matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const statusOptions = [
        { label: 'All Statuses', value: '' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Review', value: 'Review' },
        { label: 'Eligible', value: 'Eligible' },
        { label: 'Ineligible', value: 'Ineligible' },
    ];

    const gradeOptions = [
        { label: 'All Grades', value: '' },
        { label: 'Grade 6', value: '6' },
        { label: 'Grade 7', value: '7' },
        { label: 'Grade 8', value: '8' },
    ];

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const statusBodyTemplate = (rowData: any) => {
        return <StatusBadge status={rowData.status} />;
    };

    const flagsBodyTemplate = (rowData: any) => {
        return rowData.flags?.length > 0 ? (
            <div className="flex space-x-1">
                {rowData.flags.map((flag: string, index: number) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded"
                        role="status"
                        aria-label={`Flag: ${flag}`}
                    >
                        {flag}
                    </span>
                ))}
            </div>
        ) : null;
    };

    const actionsBodyTemplate = (rowData: any) => {
        return (
            <div className="flex space-x-2">
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-text"
                    onClick={() => navigate(`/students/${rowData.id}`)}
                    aria-label={`View details for ${rowData.firstName} ${rowData.lastName}`}
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text"
                    onClick={() => navigate(`/students/${rowData.id}/edit`)}
                    aria-label={`Edit ${rowData.firstName} ${rowData.lastName}`}
                />
                <Button
                    icon="pi pi-check-circle"
                    className="p-button-rounded p-button-text"
                    onClick={() => navigate(`/eligibility/${rowData.id}`)}
                    aria-label={`Review eligibility for ${rowData.firstName} ${rowData.lastName}`}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h2 className="text-xl font-semibold">Student Roster</h2>
                <p className="text-gray-600">Mock student data for demonstration</p>
            </div>
            <div className="flex items-center space-x-4">
                <span className="p-input-icon-left">
                    <Search className="h-4 w-4" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search students..."
                        aria-label="Search students"
                    />
                </span>
                <Button
                    label="Add Student"
                    icon="pi pi-user-plus"
                    onClick={() => navigate('/students/new')}
                    aria-label="Add new student"
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-600">Central visibility of all students</p>
            </header>

            <Card>
                {/* Filters */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <Dropdown
                                id="status-filter"
                                value={filters.status.value}
                                options={statusOptions}
                                onChange={(e) => setFilters({ ...filters, status: { value: e.value, matchMode: FilterMatchMode.EQUALS } })}
                                placeholder="Filter by status"
                                className="w-full"
                                aria-label="Filter by student status"
                            />
                        </div>
                        <div>
                            <label htmlFor="grade-filter" className="block text-sm font-medium mb-1">
                                Grade
                            </label>
                            <Dropdown
                                id="grade-filter"
                                value={filters.grade.value}
                                options={gradeOptions}
                                onChange={(e) => setFilters({ ...filters, grade: { value: e.value, matchMode: FilterMatchMode.EQUALS } })}
                                placeholder="Filter by grade"
                                className="w-full"
                                aria-label="Filter by grade"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                label="Clear Filters"
                                icon="pi pi-filter-slash"
                                className="p-button-outlined w-full"
                                onClick={() => {
                                    setFilters({
                                        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
                                        status: { value: '', matchMode: FilterMatchMode.EQUALS },
                                        grade: { value: '', matchMode: FilterMatchMode.EQUALS },
                                    });
                                    setGlobalFilterValue('');
                                }}
                                aria-label="Clear all filters"
                            />
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    value={mockStudents}
                    paginator
                    rows={10}
                    filters={filters}
                    header={header}
                    emptyMessage="No students found"
                    aria-label="Student roster table"
                >
                    <Column
                        field="id"
                        header="Student ID"
                        sortable
                        style={{ width: '15%' }}
                        aria-label="Student ID column"
                    />
                    <Column
                        field="firstName"
                        header="First Name"
                        sortable
                        style={{ width: '15%' }}
                        aria-label="First name column"
                    />
                    <Column
                        field="lastName"
                        header="Last Name"
                        sortable
                        style={{ width: '15%' }}
                        aria-label="Last name column"
                    />
                    <Column
                        field="dateOfBirth"
                        header="Date of Birth"
                        sortable
                        style={{ width: '15%' }}
                        aria-label="Date of birth column"
                    />
                    <Column
                        field="grade"
                        header="Grade"
                        sortable
                        style={{ width: '10%' }}
                        aria-label="Grade column"
                    />
                    <Column
                        field="status"
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{ width: '15%' }}
                        aria-label="Status column"
                    />
                    <Column
                        field="flags"
                        header="Flags"
                        body={flagsBodyTemplate}
                        style={{ width: '15%' }}
                        aria-label="Flags column"
                    />
                    <Column
                        header="Actions"
                        body={actionsBodyTemplate}
                        style={{ width: '15%' }}
                        aria-label="Actions column"
                    />
                </DataTable>

                {/* Summary */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Total Students</p>
                            <p className="text-lg font-bold">{mockStudents.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Eligible</p>
                            <p className="text-lg font-bold text-green-600">
                                {mockStudents.filter(s => s.status === 'Eligible').length}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Under Review</p>
                            <p className="text-lg font-bold text-orange-600">
                                {mockStudents.filter(s => s.status === 'Review').length}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">With Flags</p>
                            <p className="text-lg font-bold text-red-600">
                                {mockStudents.filter(s => s.flags && s.flags.length > 0).length}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};