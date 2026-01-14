import React from 'react';

interface MockChartProps {
    type: 'line' | 'bar' | 'doughnut' | 'pie';
    title?: string;
}

export const MockChart: React.FC<MockChartProps> = ({ type }) => {
    const renderChart = () => {
        switch (type) {
            case 'doughnut':
                return (
                    <div className="relative w-52 h-52 mx-auto" data-aos="zoom-in-up">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                            <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="565" strokeDashoffset="150" className="text-indigo-500 transition-all duration-1000 ease-out" />
                            <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="565" strokeDashoffset="400" className="text-emerald-500" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-800">1,247</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students</p>
                            </div>
                        </div>
                    </div>
                );
            case 'line':
            case 'bar':
                return (
                    <div className="h-56 w-full flex flex-col justify-end">
                        <div className="flex items-end justify-between h-full gap-2 px-2">
                            {[40, 65, 45, 90, 55, 80]?.map((height, index) => {
                                return (
                                    <div key={index} className="flex-1 flex flex-col justify-end items-center group h-full">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded mb-2 font-bold whitespace-nowrap">
                                            {height}%
                                        </div>
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-700 ease-out hover:brightness-110 shadow-lg ${index % 3 === 0 ? 'bg-indigo-500 shadow-indigo-100' : index % 2 === 0 ? 'bg-emerald-500 shadow-emerald-100' : 'bg-gray-300 shadow-gray-100'}`}
                                            style={{ height: `${height}%`, transitionDelay: `${index * 100}ms` }}
                                        >
                                            <div className="w-full h-1/2 bg-white/10 rounded-t-lg"></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex justify-between mt-4 border-t border-slate-100 pt-2 px-2">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                                <span key={month} className="text-[10px] font-bold text-slate-400 uppercase">
                                    {month}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <div className="text-center">
                            <div className="p-3 bg-white rounded-full shadow-sm inline-block mb-2">
                                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-ping"></div>
                            </div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Generating {type} visual...</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            className="relative p-2 mock-chart"
            role="img"
            aria-label={`Visual representation of ${type} data`}
        >
            {renderChart()}

            <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Eligible</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                </div>
            </div>

            <div className="mt-4 py-2 px-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-400 text-center font-medium italic">
                    Visualization simulated for POC environment. Performance metrics may vary.
                </p>
            </div>
        </div>
    );
};