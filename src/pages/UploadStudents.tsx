import React, { useState } from 'react';
import {
    Upload, FileText, CheckCircle2,
    AlertCircle, Download, List,
    Users, ArrowRight, ShieldCheck,
    Info, FileUp, XCircle
} from 'lucide-react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const UploadStudents: React.FC = () => {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [result, setResult] = useState<any>(null);

    const handleUpload = () => {
        setUploading(true);
        setUploadProgress(0);
        setResult(null);

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);

                    const mockResult = {
                        totalRows: 150,
                        processed: 145,
                        flagged: 5,
                        duplicatesFound: 5,
                        errors: 5,
                        warnings: 10
                    };

                    setResult(mockResult);
                    toast.success('Upload processed successfully (Demo Mode)');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const downloadSampleFile = () => {
        const sampleData = `StudentID,FirstName,LastName,DateOfBirth,Grade,IncomeRange\nS1001,John,Smith,2010-05-15,8,$25k-$50k\nS1002,Jane,Doe,2011-03-22,7,$50k-$75k`;
        const blob = new Blob([sampleData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_upload_sample.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.info('Sample CSV template downloaded');
    };

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-700">
            {/* 1. Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Bulk Student Import</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <FileUp size={14} /> Upload and synchronize student rosters via CSV
                        </span>
                    </div>
                </div>

                <button
                    onClick={downloadSampleFile}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                    aria-label="Download sample CSV template"
                >
                    <Download size={16} /> Get Template
                </button>
            </header>

            {/* 2. Main Upload Container */}
            <main className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden mx-4">
                <div className="p-10 md:p-16">
                    <div className="mx-auto">

                        {!uploading && !result && (
                            <div className="space-y-8 animate-in zoom-in-95 duration-500">
                                {/* Upload Zone */}
                                <div className="group relative border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer">
                                    <div className="bg-slate-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Upload className="text-slate-400 group-hover:text-slate-900" size={32} />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Drop CSV File Here</h2>
                                    <p className="text-sm font-medium text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                                        Ensure your file follows the official template structure for successful processing.
                                    </p>

                                    <FileUpload
                                        mode="basic"
                                        name="demo-upload"
                                        accept=".csv"
                                        maxFileSize={1000000}
                                        chooseLabel="Select From Computer"
                                        className="p-button-rounded"
                                        onBeforeSend={(e) => {
                                            handleUpload();
                                            return false;
                                        }}
                                        chooseOptions={{
                                            className: 'bg-slate-900! border-none! px-8! py-4! text-xs! font-black uppercase tracking-widest hover:bg-black! shadow-xl shadow-slate-200',
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-4 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                                    <Info className="text-indigo-500" size={20} />
                                    <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-tight leading-relaxed">
                                        System supports .CSV files up to 10MB. Real-time validation will occur upon selection.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 3. Progress Section */}
                        {uploading && (
                            <div className="py-20 text-center space-y-8 animate-in fade-in duration-500" role="status" aria-live="polite">
                                <div className="relative w-24 h-24 mx-auto">
                                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-slate-900 rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center font-black text-slate-900 text-lg">
                                        {uploadProgress}%
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Analyzing Records</h3>
                                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tight">Verifying integrity & cross-referencing duplicates...</p>
                                </div>
                                <div className="max-w-md mx-auto">
                                    <ProgressBar
                                        value={uploadProgress}
                                        showValue={false}
                                        className="h-1 bg-slate-100 overflow-hidden rounded-full"
                                        color="#0f172a"
                                    />
                                </div>
                            </div>
                        )}

                        {/* 4. Results Section */}
                        {result && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-500 text-white p-3 rounded-2xl">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Upload Complete</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audit log generated successfully</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setResult(null)}
                                        className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors px-4 py-2 border border-slate-300 rounded-full"
                                    >
                                        Upload Another
                                    </button>
                                </div>

                                {/* Results Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Total Rows', val: result.totalRows, icon: <FileText size={14} />, color: 'text-slate-900', bg: 'bg-slate-50' },
                                        { label: 'Processed', val: result.processed, icon: <CheckCircle2 size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                        { label: 'Flagged', val: result.flagged, icon: <AlertCircle size={14} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                                        { label: 'Duplicates', val: result.duplicatesFound, icon: <Users size={14} />, color: 'text-orange-600', bg: 'bg-orange-50' },
                                        { label: 'Errors', val: result.errors, icon: <XCircle size={14} />, color: 'text-red-600', bg: 'bg-red-50' },
                                        { label: 'Warnings', val: result.warnings, icon: <Info size={14} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    ].map((stat, i) => (
                                        <div key={i} className={`${stat.bg} p-6 rounded-[2rem] border border-transparent hover:border-slate-200 transition-all`}>
                                            <div className="flex items-center gap-2 mb-2 opacity-60">
                                                {stat.icon}
                                                <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                            <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.val}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Footer */}
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200">
                                    <div className="text-center md:text-left">
                                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Review is Required</h4>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-tight">Records with errors or duplicates were not imported</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate('/duplicates')}
                                            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                                        >
                                            Resolve Duplicates
                                        </button>
                                        <button
                                            onClick={() => navigate('/students')}
                                            className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                                        >
                                            Go to Roster <ArrowRight size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* 5. Instructions Section */}
            <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem]">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-slate-900 border border-slate-100"><ShieldCheck size={20} /></div>
                    <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Compliance & Security</h4>
                        <ul className="space-y-1">
                            {['Data is encrypted during transit', 'All entries are checked for FERPA compliance', 'Records are cross-referenced with State ID'].map((text, i) => (
                                <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                    <div className="w-1 h-1 rounded-full bg-slate-300" /> {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-8 bg-slate-900 rounded-[2.5rem] text-white">
                    <div className="bg-white/10 p-3 rounded-2xl text-white"><List size={20} /></div>
                    <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase tracking-widest opacity-60">Upload Protocol</h4>
                        <p className="text-xs font-bold leading-relaxed opacity-90">
                            Download the official template to ensure column headers match system requirements. Automated matching occurs based on Student ID.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};