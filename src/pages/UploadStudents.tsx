import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Download, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';

export const UploadStudents: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [result, setResult] = useState<any>(null);

    const handleUpload = () => {
        setUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);

                    // Mock results
                    const mockResult = {
                        totalRows: 150,
                        processed: 145,
                        // flagged
                        duplicatesFound: 5,
                        errors: 5,
                        warnings: 10
                    };

                    setResult(mockResult);
                    toast.success('Upload processed successfully (Demo)');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const downloadSampleFile = () => {
        const sampleData = `StudentID,FirstName,LastName,DateOfBirth,Grade,IncomeRange
S1001,John,Smith,2010-05-15,8,$25k-$50k
S1002,Jane,Doe,2011-03-22,7,$50k-$75k
S1003,Robert,Johnson,2010-11-30,8,$75k-$100k
S1004,Maria,Garcia,2011-07-14,7,$25k-$50k`;

        const blob = new Blob([sampleData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_upload_sample.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        toast.info('Sample CSV downloaded');
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Bulk Student Upload</h1>
                <p className="text-gray-600">Mock CSV upload and processing</p>
            </header>

            <Card>
                <div className="space-y-6">
                    {/* Upload Section */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold mb-2">Upload Student CSV File</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Upload a CSV file with student information. Format must match the sample template.
                        </p>

                        <FileUpload
                            mode="basic"
                            name="demo-upload"
                            url="/api/upload"
                            accept=".csv"
                            maxFileSize={1000000}
                            chooseLabel="Select CSV File"
                            disabled={uploading}
                            auto
                            chooseOptions={{
                                icon: 'pi pi-upload',
                                className: 'p-button-outlined'
                            }}
                            onBeforeSend={() => {
                                handleUpload();
                                return false; // Prevent actual upload
                            }}
                            aria-label="Select CSV file for upload"
                        />

                        <div className="mt-4">
                            <Button
                                label="Download Sample CSV"
                                icon="pi pi-download"
                                className="p-button-text"
                                onClick={downloadSampleFile}
                                aria-label="Download sample CSV template"
                            />
                        </div>
                    </div>

                    {/* Progress Section */}
                    {uploading && (
                        <div
                            className="p-6 bg-blue-50 rounded-lg"
                            role="region"
                            aria-label="Upload progress"
                        >
                            <h3 className="font-semibold mb-4">Processing Upload...</h3>
                            <ProgressBar
                                value={uploadProgress}
                                showValue={false}
                                aria-label={`Upload progress: ${uploadProgress}%`}
                            />
                            <p className="text-sm text-gray-600 mt-2 text-center">
                                {uploadProgress}% complete
                            </p>
                            <p className="text-xs text-gray-500 mt-1 text-center">
                                This is a simulation. No real data is being processed.
                            </p>
                        </div>
                    )}

                    {/* Results Section */}
                    {result && (
                        <div
                            className="p-6 bg-green-50 rounded-lg"
                            role="region"
                            aria-label="Upload results"
                        >
                            <h3 className="font-semibold mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Upload Results
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Total Rows</p>
                                    <p className="text-2xl font-bold">{result.totalRows}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Successfully Processed</p>
                                    <p className="text-2xl font-bold text-green-600">{result.processed}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Flagged for Review</p>
                                    <p className="text-2xl font-bold text-orange-600">{result.flagged}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Duplicates Found</p>
                                    <p className="text-2xl font-bold text-red-600">{result.duplicatesFound}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Errors</p>
                                    <p className="text-2xl font-bold text-red-600">{result.errors}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-500">Warnings</p>
                                    <p className="text-2xl font-bold text-yellow-600">{result.warnings}</p>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    label="Review Duplicates"
                                    icon="pi pi-users"
                                    className="p-button-warning"
                                    onClick={() => window.location.href = '/duplicates'}
                                    aria-label="Review duplicate students"
                                />
                                <Button
                                    label="View Student List"
                                    icon="pi pi-list"
                                    className="p-button-success"
                                    onClick={() => window.location.href = '/students'}
                                    aria-label="View student list"
                                />
                                <Button
                                    label="Export Results (Demo)"
                                    icon="pi pi-download"
                                    className="p-button-outlined"
                                    onClick={() => toast.info('Export would download CSV in production')}
                                    aria-label="Export upload results"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Demo Instructions */}
            <Card>
                <h3 className="font-semibold mb-3">Demo Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Click "Select CSV File" to simulate file selection (no actual upload)</li>
                    <li>Click "Download Sample CSV" to get a template</li>
                    <li>Upload simulation will show progress and mock results</li>
                    <li>All processing is simulated with mock data</li>
                </ul>
            </Card>
        </div>
    );
};