import React, { useState } from 'react';
import {
    BarChart3,
    Download,
    FileText,
    Filter,
    Printer,
    Calendar as CalendarIcon,
    TrendingUp,
    Users,
    CheckCircle2,
    Clock,
    ShieldCheck,
    ChevronDown
} from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { toast } from 'sonner';
import { MockChart } from '../components/UI/MockChart';

export const Reports: React.FC = () => {
    const [reportType, setReportType] = useState('summary');
    const [dateRange, setDateRange] = useState<any>(null);

    const reportTypes = [
        { label: 'System Summary', value: 'summary' },
        { label: 'Eligibility Metrics', value: 'eligibility' },
        { label: 'Demographic Insights', value: 'demographic' },
        { label: 'Audit Log Report', value: 'duplicate' },
    ];

    const mockReportData = {
        summary: {
            totalStudents: 1247,
            eligible: 856,
            ineligible: 128,
            pending: 263,
            duplicatesResolved: 42,
        },
        eligibility: [
            { program: 'Free Lunch', eligible: 645, pending: 89, color: 'bg-emerald-500' },
            { program: 'Reduced Lunch', eligible: 423, pending: 45, color: 'bg-blue-500' },
            { program: 'Special Education', eligible: 187, pending: 32, color: 'bg-purple-500' },
            { program: 'ESL', eligible: 234, pending: 56, color: 'bg-amber-500' },
        ]
    };

    const handleExport = (format: 'csv' | 'pdf') => {
        toast.info(`${format.toUpperCase()} Export process initiated (Demo)`);
    };

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-700">
            {/* 1. Standardized Header UI */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 lg:px-0">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase leading-none">Intelligence & Analytics</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">
                            <BarChart3 size={14} /> Real-time System Audit
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleExport('csv')}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                    <button
                        className="p-3 rounded-2xl bg-slate-900 text-white hover:bg-black transition-all shadow-lg shadow-slate-200"
                        aria-label="Print Report"
                    >
                        <Printer size={18} />
                    </button>
                </div>
            </header>

            {/* 2. Advanced Control Bar */}
            <section className="mx-4 lg:mx-0 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full relative">
                    <Dropdown
                        value={reportType}
                        options={reportTypes}
                        onChange={(e) => setReportType(e.value)}
                        className="w-full border-none shadow-none text-sm font-bold h-14 flex items-center px-4"
                        placeholder="Select Report Module"
                    />
                </div>
                <div className="h-10 w-px bg-slate-200 hidden md:block" />
                <div className="flex-1 w-full relative">
                    <Calendar
                        value={dateRange}
                        onChange={(e) => setDateRange(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        className="w-full border-none shadow-none h-14"
                        placeholder="Time Range: Last 30 Days"
                        inputClassName="border-none font-bold text-sm px-10!"
                    />
                    <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button
                    onClick={() => toast.success('Filtering database...')}
                    className="w-full md:w-auto px-8 h-14 rounded-3xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    <Filter size={16} /> Update View
                </button>
            </section>

            {/* 3. KPI Dashboard */}
            <div className="px-4 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard label="Total Registry" value={mockReportData.summary.totalStudents} icon={<Users />} trend="+12%" color="blue" />
                <KPICard label="Approved Students" value={mockReportData.summary.eligible} icon={<CheckCircle2 />} trend="+8%" color="emerald" />
                <KPICard label="Pending Adjudication" value={mockReportData.summary.pending} icon={<Clock />} trend="-4%" color="amber" />
                <KPICard label="Resolved Flags" value={mockReportData.summary.duplicatesResolved} icon={<ShieldCheck />} trend="+24%" color="purple" />
            </div>

            {/* 4. Visualizations */}
            <main className="px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Distribution Chart */}
                <article className="lg:col-span-5 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Data Perspective</p>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Status Distribution</h2>
                        </div>
                        <TrendingUp className="text-emerald-500" size={20} />
                    </div>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                        <MockChart type="doughnut" />
                    </div>
                </article>

                {/* Eligibility Table */}
                <article className="lg:col-span-7 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-slate-900 text-white rounded-2xl">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Program Analysis</p>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Eligibility by Classification</h2>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {mockReportData.eligibility.map((row, index) => {
                            const total = row.eligible + row.pending;
                            const rate = Math.round((row.eligible / total) * 100);
                            return (
                                <div key={index} className="group transition-all">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{row.program}</p>
                                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">{row.eligible} Approved • {row.pending} Waiting</p>
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{rate}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${row.color} transition-all duration-1000 ease-out group-hover:opacity-80`}
                                            style={{ width: `${rate}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </main>

            {/* 5. System Notice */}
            <footer className="mx-4 lg:mx-0 p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <ShieldCheck size={28} className="text-emerald-400" />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1">Data Verification Protocol</h3>
                        <p className="text-xs font-bold opacity-60 leading-relaxed max-w-2xl">
                            All analytics displayed are generated from the encrypted mock database. Real-time synchronization is simulated to demonstrate the high-concurrency capabilities of the reporting engine.
                        </p>
                    </div>
                    <button className="md:ml-auto w-full md:w-auto px-8 py-3 rounded-xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                        View Audit Log
                    </button>
                </div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
            </footer>
        </div>
    );
};

// Sub-component for KPI Cards
const KPICard = ({ label, value, icon, trend, color }: any) => {
    const colorMap: any = {
        blue: 'text-blue-600 bg-blue-50',
        emerald: 'text-emerald-600 bg-emerald-50',
        amber: 'text-amber-600 bg-amber-50',
        purple: 'text-purple-600 bg-purple-50',
    };

    return (
        <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:border-slate-900 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl transition-colors ${colorMap[color]}`}>
                    {React.cloneElement(icon, { size: 20 })}
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight mt-1">{value.toLocaleString()}</p>
        </div>
    );
};