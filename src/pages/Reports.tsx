import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Download, Printer, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';
import { MockChart } from '../components/UI/MockChart';

export const Reports: React.FC = () => {
    const [reportType, setReportType] = useState('summary');
    const [dateRange, setDateRange] = useState<any>(null);

    const reportTypes = [
        { label: 'Summary Report', value: 'summary' },
        { label: 'Eligibility Report', value: 'eligibility' },
        { label: 'Demographic Report', value: 'demographic' },
        { label: 'Duplicate Report', value: 'duplicate' },
        { label: 'Enrollment Report', value: 'enrollment' },
    ];

    const mockReportData = {
        summary: {
            totalStudents: 1247,
            eligible: 856,
            ineligible: 128,
            pending: 263,
            duplicatesResolved: 42,
            uploadsProcessed: 15,
        },
        eligibility: [
            { program: 'Free Lunch', eligible: 645, pending: 89 },
            { program: 'Reduced Lunch', eligible: 423, pending: 45 },
            { program: 'Special Education', eligible: 187, pending: 32 },
            { program: 'ESL', eligible: 234, pending: 56 },
        ]
    };

    const handleExport = (format: 'csv' | 'pdf') => {
        toast.info(`${format.toUpperCase()} export would download in production (Demo)`);
    };

    const handlePrint = () => {
        toast.info('Print dialog would open in production (Demo)');
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600">Demonstrating administrative reporting value</p>
            </header>

            {/* Report Controls */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Report Type</label>
                        <Dropdown
                            value={reportType}
                            options={reportTypes}
                            onChange={(e) => setReportType(e.value)}
                            className="w-full"
                            aria-label="Select report type"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Date Range</label>
                        <Calendar
                            value={dateRange}
                            onChange={(e) => setDateRange(e.value)}
                            selectionMode="range"
                            readOnlyInput
                            className="w-full"
                            showIcon
                            aria-label="Select date range"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button
                            label="Generate Report"
                            icon="pi pi-filter"
                            className="w-full"
                            onClick={() => toast.success('Report generated (Demo)')}
                            aria-label="Generate report"
                        />
                    </div>
                    <div className="flex items-end space-x-2">
                        <Button
                            icon="pi pi-download"
                            className="p-button-outlined flex-1"
                            onClick={() => handleExport('csv')}
                            aria-label="Export as CSV"
                        />
                        <Button
                            icon="pi pi-file-pdf"
                            className="p-button-outlined flex-1"
                            onClick={() => handleExport('pdf')}
                            aria-label="Export as PDF"
                        />
                        <Button
                            icon="pi pi-print"
                            className="p-button-outlined flex-1"
                            onClick={handlePrint}
                            aria-label="Print report"
                        />
                    </div>
                </div>
            </Card>

            {/* Report Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Summary Cards */}
                <Card>
                    <h2 className="text-lg font-semibold mb-4">System Summary</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded">
                            <p className="text-sm text-blue-700">Total Students</p>
                            <p className="text-2xl font-bold">{mockReportData.summary.totalStudents}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded">
                            <p className="text-sm text-green-700">Eligible</p>
                            <p className="text-2xl font-bold">{mockReportData.summary.eligible}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded">
                            <p className="text-sm text-orange-700">Pending Review</p>
                            <p className="text-2xl font-bold">{mockReportData.summary.pending}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded">
                            <p className="text-sm text-purple-700">Duplicates Resolved</p>
                            <p className="text-2xl font-bold">{mockReportData.summary.duplicatesResolved}</p>
                        </div>
                    </div>
                </Card>

                {/* Chart */}
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
                    <MockChart type="doughnut" />
                </Card>

                {/* Eligibility Breakdown */}
                <Card className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Eligibility by Program</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200" role="grid">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Eligible
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pending
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Completion Rate
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockReportData.eligibility.map((row, index) => {
                                    const completionRate = Math.round((row.eligible / (row.eligible + row.pending)) * 100);
                                    return (
                                        <tr key={index} role="row">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{row.program}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-green-600 font-medium">{row.eligible}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-orange-600 font-medium">{row.pending}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ width: `${completionRate}%` }}
                                                            role="progressbar"
                                                            aria-valuenow={completionRate}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm">{completionRate}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Demo Notice */}
            <div
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                role="region"
                aria-label="Demo information"
            >
                <h3 className="font-semibold text-blue-800 mb-2">Demo Reports Information</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>All report data is simulated and randomly generated</li>
                    <li>Export functions are simulated and won't download real files</li>
                    <li>Filters and date ranges are for demonstration purposes only</li>
                    <li>Report generation is instant in demo mode (no processing time)</li>
                </ul>
            </div>
        </div>
    );
};