import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, UserPlus, Upload, Copy,
    CheckCircle2, XCircle,
    Pencil,
    Eye,
} from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const mockStudents = [
    { id: 'S1001', firstName: 'John', lastName: 'Smith', email: 'john.smith@edu.com', dateOfBirth: '2010-05-15', grade: '8', status: 'Eligible', flags: [] },
    { id: 'S1002', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@edu.com', dateOfBirth: '2011-03-22', grade: '7', status: 'Review', flags: ['Incomplete'] },
    { id: 'S1003', firstName: 'Robert', lastName: 'Johnson', email: "robert.johnson@edu.com", dateOfBirth: '2010-11-30', grade: '8', status: 'Draft', flags: [] },
    { id: 'S1004', firstName: 'Maria', lastName: 'Garcia', email: "maria.garcia@edu.com", dateOfBirth: '2011-07-14', grade: '7', status: 'Eligible', flags: [] },
    { id: 'S1005', firstName: 'David', lastName: 'Brown', email: "david.brown@edu.com", dateOfBirth: '2010-09-05', grade: '8', status: 'Ineligible', flags: ['Duplicate'] },
    { id: 'S1006', firstName: 'Sarah', lastName: 'Wilson', email: "sarah.wilson@edu.com", dateOfBirth: '2011-01-18', grade: '7', status: 'Review', flags: [] },
    { id: 'S1007', firstName: 'Michael', lastName: 'Taylor', email: "michael.taylor@edu.com", dateOfBirth: '2010-12-25', grade: '8', status: 'Eligible', flags: [] },
    { id: 'S1008', firstName: 'Emily', lastName: 'Anderson', email: "emily.anderson@edu.com", dateOfBirth: '2011-04-30', grade: '7', status: 'Draft', flags: ['Incomplete'] },
];

export const StudentsList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const statusTabs = ['All', 'Eligible', 'Review', 'Draft', 'Ineligible'];

    const gradeOptions = [
        { label: 'All Grades', value: '' },
        { label: 'Grade 6', value: '6' },
        { label: 'Grade 7', value: '7' },
        { label: 'Grade 8', value: '8' },
    ];

    // 508 Compliance: Use useMemo for filtering to prevent jitter for screen readers
    const filteredStudents = useMemo(() => {
        return mockStudents.filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, selectedStatus]);

    const nameBodyTemplate = (rowData: any) => (
        <div className="flex items-center gap-3 py-1">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-[10px] border border-slate-200" aria-hidden="true">
                {rowData.firstName.charAt(0)}{rowData.lastName.charAt(0)}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 leading-tight">{rowData.firstName} {rowData.lastName}</span>
                <span className="text-[11px] text-slate-500 font-medium">{rowData.id}</span>
            </div>
        </div>
    );

    const statusBodyTemplate = (rowData: any) => {
        const styles: Record<string, string> = {
            Eligible: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            Review: 'bg-amber-50 text-amber-700 border-amber-100',
            Draft: 'bg-slate-50 text-slate-600 border-slate-100',
            Ineligible: 'bg-rose-50 text-rose-700 border-rose-100',
        };
        return (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wide ${styles[rowData.status]}`}>
                {rowData.status}
            </span>
        );
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
            <div className="flex items-center justify-center gap-1">
                <Button outlined onClick={() => navigate(`/students/${rowData.id}/edit`)} className="border-none! p-2! text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title={`Edit ${rowData.firstName} ${rowData.lastName}`} aria-label={`Edit ${rowData.firstName} ${rowData.lastName}`}>
                    <Pencil size={15} />
                </Button>
                <Button outlined onClick={() => navigate(`/students/${rowData.id}`)} className="border-none! p-2! text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title={`View details for ${rowData.firstName} ${rowData.lastName}`} aria-label={`View details for ${rowData.firstName} ${rowData.lastName}`}>
                    <Eye size={15} />
                </Button>
                <Button outlined onClick={() => navigate(`/eligibility/${rowData.id}`)} className="border-none! p-2! text-slate-400 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-all" title={`Review eligibility for ${rowData.firstName} ${rowData.lastName}`} aria-label={`Review eligibility for ${rowData.firstName} ${rowData.lastName}`}>
                    <CheckCircle2 size={15} />
                </Button>
            </div>
        );
    };

    return (
        <div className="mx-auto space-y-6">
            {/* 1. Header Section - Using your requested structure */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Student Management</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <CheckCircle2 size={10} /> {mockStudents?.length} Students Synced
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center border-r border-slate-200 pr-2 mr-2 gap-2">
                        <button
                            onClick={() => navigate('/students/upload')}
                            className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            aria-label="Bulk Upload Students"
                            title="Bulk Upload"
                        >
                            <Upload size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/duplicates')}
                            className="p-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all relative"
                            aria-label="Review Duplicate Records"
                            title="Review Duplicates"
                        >
                            <Copy size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    <button
                        onClick={() => navigate('/students/new')}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                    >
                        <UserPlus size={18} />
                        Add Student
                    </button>
                </div>
            </header>

            {/* 2. Professional Tabbed Navigation & Search */}
            <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100">
                    <nav className="flex items-center" aria-label="Filter by Status">
                        {statusTabs?.map((tab, index) => {
                            return (
                                <button
                                    key={`${tab}-${index}`}
                                    onClick={() => setSelectedStatus(tab)}
                                    className={`text-sm font-medium transition-all relative px-4 py-2 ${selectedStatus === tab
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-[#02061866] hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                    {selectedStatus === tab && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                                    )}
                                </button>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-3 pb-2 lg:pb-0">
                        <div>
                            <Dropdown
                                id="grade-filter"
                                // value={filters.grade.value}
                                options={gradeOptions}
                                // onChange={(e) => setFilters({ ...filters, grade: { value: e.value, matchMode: FilterMatchMode.EQUALS } })}
                                placeholder="Filter by grade"
                                className="w-full"
                                aria-label="Filter by grade"
                            />
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={15} />
                            <InputText
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search students..."
                                aria-label="Search student by name, ID or email"
                                className="w-64 pl-10! pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedStatus('All'); }}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                            aria-label="Clear all filters"
                        >
                            <XCircle size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Data Table - Professional & Accessible */}
            <main className="bg-white rounded-lg shadow-sm border border-gray-200">
                <DataTable
                    value={filteredStudents}
                    className="p-datatable-sm professional-table"
                    rowClassName={() => 'border-b border-slate-50/50 hover:bg-slate-50/30 transition-colors'}
                    emptyMessage="No students found"
                    aria-label="Student roster table"
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column header="STUDENT" body={nameBodyTemplate} className="pl-6!" headerClassName="p-3! pl-6! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Student" />
                    <Column field="dateOfBirth" header="Date of Birth" className="text-xs text-slate-600 font-medium" headerClassName="p-3! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Date of birth" />
                    <Column field="email" header="Email" className="text-xs text-slate-600 font-medium" headerClassName="p-3! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Email" />
                    <Column field="grade" header="Grade" className="text-xs font-bold text-slate-500" headerClassName="p-3! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Grade" />
                    <Column field="status" header="Status" body={statusBodyTemplate} headerClassName="p-3! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Status" />
                    <Column field="flags" header="Flags" body={flagsBodyTemplate} headerClassName="p-3! text-[11px] font-bold text-slate-400 bg-slate-50/50" aria-label="Flags column" />
                    <Column header="ACTIONS" headerClassName="p-3! text-[11px] flex justify-center font-bold text-slate-400 bg-slate-50/50 pr-6" className="pr-6" body={actionsBodyTemplate} />
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
            </main>
        </div>
    );
};