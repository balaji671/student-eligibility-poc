import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    ShieldCheck,
    ChevronLeft,
    ClipboardCheck,
    FileText,
    History,
    ArrowRight
} from 'lucide-react';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { toast } from 'sonner';

export const EligibilityReview: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [decision, setDecision] = useState<'eligible' | 'ineligible' | null>(null);
    const [notes, setNotes] = useState('');

    const mockStudent = {
        id: id || 'S1001',
        name: 'John Smith',
        grade: '8',
        dob: '2010-05-15',
        enrollmentDate: '2023-08-20',
        programs: ['Free Lunch'],
        householdIncome: '$25,000 - $50,000',
        previousStatus: 'Review Pending'
    };

    const handleSubmit = () => {
        if (!decision) {
            toast.error('Please select an eligibility decision');
            return;
        }
        toast.success(`Marked as ${decision === 'eligible' ? 'Eligible' : 'Not Eligible'} (Demo)`);
        navigate(`/students/${mockStudent.id}`);
    };

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-700">
            {/* 1. Standardized Header UI */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-8">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase leading-none">Eligibility Determination</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                            <ShieldCheck size={14} /> Verification Protocol Active
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/students')}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                    aria-label="Return to student list"
                >
                    <ChevronLeft size={16} /> Exit Review
                </button>
            </header>

            <main className="mx-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 2. Left Column: Student Dossier */}
                <aside className="lg:col-span-4 space-y-6">
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-slate-900 text-white rounded-2xl">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject Profile</p>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">{mockStudent.name}</h2>
                            </div>
                        </div>

                        <dl className="space-y-6">
                            <InfoField label="Internal ID" value={mockStudent.id} />
                            <InfoField label="Academic Grade" value={`${mockStudent.grade}th Grade`} />
                            <InfoField label="Current Status" value={mockStudent.previousStatus} isStatus />
                            <InfoField label="Household Income" value={mockStudent.householdIncome} />
                        </dl>
                    </section>

                    <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <History size={80} className="absolute -right-4 -bottom-4 opacity-10" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-emerald-400">System Audit</h3>
                        <p className="text-sm font-bold leading-relaxed opacity-80">
                            Last automated check performed on {new Date().toLocaleDateString()}. No discrepancies found in residency records.
                        </p>
                    </section>
                </aside>

                {/* 3. Right Column: Decision Form */}
                <section className="lg:col-span-8 space-y-6">
                    <article className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-8">
                            <ClipboardCheck className="text-slate-900" size={24} />
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Adjudication Form</h2>
                        </div>

                        {/* Criteria Checklist */}
                        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CriteriaItem label="Income Verification" />
                            <CriteriaItem label="Residency Validation" />
                            <CriteriaItem label="Grade Level Check" />
                            <CriteriaItem label="Program Specifics" />
                        </div>

                        {/* Decision Selection */}
                        <fieldset className="mb-10">
                            <legend className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Final Determination</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label
                                    className={`flex items-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${decision === 'eligible' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                                >
                                    <RadioButton
                                        inputId="eligible"
                                        name="decision"
                                        value="eligible"
                                        onChange={(e) => setDecision(e.value)}
                                        checked={decision === 'eligible'}
                                    />
                                    <div className="ml-4">
                                        <span className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${decision === 'eligible' ? 'text-emerald-700' : 'text-slate-500'}`}>
                                            <CheckCircle size={16} /> Eligible
                                        </span>
                                    </div>
                                </label>

                                <label
                                    className={`flex items-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${decision === 'ineligible' ? 'border-rose-500 bg-rose-50/50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                                >
                                    <RadioButton
                                        inputId="ineligible"
                                        name="decision"
                                        value="ineligible"
                                        onChange={(e) => setDecision(e.value)}
                                        checked={decision === 'ineligible'}
                                    />
                                    <div className="ml-4">
                                        <span className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${decision === 'ineligible' ? 'text-rose-700' : 'text-slate-500'}`}>
                                            <XCircle size={16} /> Ineligible
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </fieldset>

                        {/* Notes */}
                        <div className="mb-10">
                            <label htmlFor="notes" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">
                                Adjudication Rationale
                            </label>
                            <InputTextarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                className="w-full p-6 rounded-3xl border-slate-200 focus:border-slate-900 transition-all text-sm font-medium"
                                placeholder="State the reasoning for this decision..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100">
                            <button
                                onClick={() => toast.info('Correction process initiated')}
                                className="text-xs font-black text-amber-600 uppercase tracking-widest hover:text-amber-700 transition-all flex items-center gap-2"
                            >
                                <AlertCircle size={16} /> Request Correction
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={!decision}
                                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-20 flex items-center justify-center gap-2"
                            >
                                Submit Determination <ArrowRight size={16} />
                            </button>
                        </div>
                    </article>

                    {/* Footer Info */}
                    <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-4">
                        <AlertCircle className="text-amber-600 shrink-0" size={20} />
                        <div>
                            <p className="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-1">Compliance Notice</p>
                            <p className="text-xs font-bold text-amber-700 leading-relaxed opacity-80">
                                This is a simulated environment. All eligibility decisions made here do not affect actual student records or financial aid distribution.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

// Helper Component for Sidebar Data
const InfoField = ({ label, value, isStatus }: { label: string, value: string, isStatus?: boolean }) => (
    <div>
        <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</dt>
        <dd className={`text-sm font-bold tracking-tight ${isStatus ? 'text-blue-600' : 'text-slate-700'}`}>
            {value}
        </dd>
    </div>
);

// Helper Component for Checklist Items
const CriteriaItem = ({ label }: { label: string }) => (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <CheckCircle size={12} strokeWidth={3} />
        </div>
        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{label}</span>
    </div>
);