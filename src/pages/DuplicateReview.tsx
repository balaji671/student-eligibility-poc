import React, { useState } from 'react';
import {
    Users,
    CheckCircle2,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    ShieldCheck,
    Split,
    ArrowRightLeft,
    Fingerprint,
    Info
} from 'lucide-react';
import { Button } from 'primereact/button';
import { toast } from 'sonner';

interface DuplicateCandidate {
    id: string;
    student1: {
        id: string;
        name: string;
        dob: string;
        grade: string;
        enrollmentDate: string;
        school: string;
    };
    student2: {
        id: string;
        name: string;
        dob: string;
        grade: string;
        enrollmentDate: string;
        school: string;
    };
    confidence: 'High' | 'Medium' | 'Low';
    matchingFields: string[];
}

export const DuplicateReview: React.FC = () => {
    const [duplicates, setDuplicates] = useState<DuplicateCandidate[]>([
        {
            id: '1',
            student1: { id: 'S1001', name: 'John A. Smith', dob: '2010-05-15', grade: '8', enrollmentDate: '2023-08-20', school: 'Lincoln Middle' },
            student2: { id: 'S1002', name: 'John Smith', dob: '2010-05-15', grade: '8', enrollmentDate: '2023-08-21', school: 'Lincoln Middle' },
            confidence: 'High',
            matchingFields: ['First Name', 'Last Name', 'Date of Birth', 'Grade', 'School']
        },
        {
            id: '2',
            student1: { id: 'S1003', name: 'Maria Garcia', dob: '2011-11-22', grade: '7', enrollmentDate: '2023-08-15', school: 'Washington High' },
            student2: { id: 'S1004', name: 'Maria L. Garcia', dob: '2011-11-22', grade: '7', enrollmentDate: '2023-08-16', school: 'Jefferson North' },
            confidence: 'Medium',
            matchingFields: ['First Name', 'Last Name', 'Date of Birth']
        }
    ]);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAction = (id: string, action: 'same' | 'different') => {
        const message = action === 'same' ? 'Records merged successfully' : 'Records marked as unique';
        toast.success(`${message} (Demo Mode)`);
        setDuplicates(duplicates.filter(d => d.id !== id));
        setExpandedId(null);
    };

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-700">
            {/* 1. Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Conflict Resolution</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <Users size={14} /> Review and reconcile potential duplicate student identities
                        </span>
                    </div>
                </div>
            </header>


            {/* 2. Summary Dashboard */}
            <section className="mx-4 md:mx-0 grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Duplicate Summary">
                <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Awaiting Review</p>
                    <p className="text-4xl font-black text-slate-900">{duplicates.length}</p>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem]">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={14} className="text-rose-600" />
                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">High Confidence</p>
                    </div>
                    <p className="text-4xl font-black text-rose-900">
                        {duplicates.filter(d => d.confidence === 'High').length}
                    </p>
                </div>
                <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white">
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">System Accuracy</p>
                    <p className="text-4xl font-black italic tracking-tighter text-emerald-400">99.4%</p>
                </div>
            </section>

            {/* 3. Main Review Area */}
            <main className="mx-4 lg:mx-0 space-y-4">
                <div aria-live="polite" className="sr-only">
                    {duplicates.length} duplicate pairs remaining to review.
                </div>

                {duplicates.map((dup) => (
                    <article
                        key={dup.id}
                        className={`bg-white border transition-all duration-300 rounded-[2.5rem] overflow-hidden ${expandedId === dup.id ? 'border-slate-900 ring-4 ring-slate-100' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
                    >
                        {/* Summary Header */}
                        <button
                            onClick={() => setExpandedId(expandedId === dup.id ? null : dup.id)}
                            className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                            aria-expanded={expandedId === dup.id}
                            aria-controls={`details-${dup.id}`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl ${dup.confidence === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                    <Fingerprint size={24} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Conflict #{dup.id}</h2>
                                    <p className="text-lg font-bold text-slate-600 tracking-tight">
                                        {dup.student1.name} <span className="text-slate-300 mx-2 font-normal">vs</span> {dup.student2.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:block text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Matched On</p>
                                    <p className="text-[11px] font-bold text-slate-900 uppercase">{dup.matchingFields.length} Data Points</p>
                                </div>
                                {expandedId === dup.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                            </div>
                        </button>

                        {/* Detailed Comparison */}
                        {expandedId === dup.id && (
                            <div id={`details-${dup.id}`} className="px-8 pb-8 animate-in slide-in-from-top-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative">
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 shadow-sm z-10">
                                        <ArrowRightLeft size={16} />
                                    </div>

                                    {/* Student 1 Card */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Existing Record</span>
                                        </div>
                                        <DataField label="Student ID" value={dup.student1.id} />
                                        <DataField label="Date of Birth" value={dup.student1.dob} highlighted={dup.matchingFields.includes('Date of Birth')} />
                                        <DataField label="School" value={dup.student1.school} highlighted={dup.matchingFields.includes('School')} />
                                        <DataField label="Grade" value={dup.student1.grade} highlighted={dup.matchingFields.includes('Grade')} />
                                    </div>

                                    {/* Student 2 Card */}
                                    <div className="space-y-4 md:pl-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Incoming Record</span>
                                        </div>
                                        <DataField label="Student ID" value={dup.student2.id} />
                                        <DataField label="Date of Birth" value={dup.student2.dob} highlighted={dup.matchingFields.includes('Date of Birth')} />
                                        <DataField label="School" value={dup.student2.school} highlighted={dup.matchingFields.includes('School')} />
                                        <DataField label="Grade" value={dup.student2.grade} highlighted={dup.matchingFields.includes('Grade')} />
                                    </div>
                                </div>

                                {/* Resolution Actions */}
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mr-auto mb-4 sm:mb-0">
                                        <Info size={12} className="inline mr-1 -mt-0.5" />
                                        Merging will consolidate all historical records into the existing ID.
                                    </p>
                                    <button
                                        onClick={() => handleAction(dup.id, 'different')}
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-rose-600 text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                                        aria-label="Confirm these are different students"
                                    >
                                        <Split size={16} /> Mark as Unique
                                    </button>
                                    <button
                                        onClick={() => handleAction(dup.id, 'same')}
                                        className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                                        aria-label="Confirm these are the same student and merge"
                                    >
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Authorize Merge
                                    </button>
                                </div>
                            </div>
                        )}
                    </article>
                ))}

                {duplicates.length === 0 && (
                    <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                        <div className="bg-emerald-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="text-emerald-500" size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Queue Cleared</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase mt-2">All potential identity conflicts have been resolved.</p>
                        <Button
                            label="Return to Dashboard"
                            className="mt-8 p-button-text font-black text-xs uppercase tracking-[0.2em] text-slate-900"
                            onClick={() => window.location.href = '/'}
                        />
                    </div>
                )}
            </main>

            {/* 4. Help Section */}
            <footer className="mx-4 lg:mx-0 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400">
                    <Info size={20} />
                </div>
                <div>
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">Resolution Protocol</h3>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-2xl">
                        When a merge is authorized, the incoming record is archived and linked to the master record.
                        If marked as unique, both records will remain active with independent identity chains.
                        Actions taken here are logged for compliance auditing.
                    </p>
                </div>
            </footer>
        </div>
    );
};

// Helper Component for Data Rows
const DataField = ({ label, value, highlighted }: { label: string, value: string, highlighted?: boolean }) => (
    <div className={`p-4 rounded-xl transition-all ${highlighted ? 'bg-emerald-50/50 border border-emerald-100' : 'bg-transparent border border-transparent'}`}>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-sm font-bold tracking-tight ${highlighted ? 'text-emerald-700' : 'text-slate-700'}`}>
            {value} {highlighted && <CheckCircle2 size={12} className="inline ml-1 opacity-50" />}
        </p>
    </div>
);