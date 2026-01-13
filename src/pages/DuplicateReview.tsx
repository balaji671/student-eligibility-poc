import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DemoBanner } from '../components/Common/DemoBanner';
import { StatusBadge } from '../components/UI/StatusBadge';
import { ComparisonCard } from '../components/UI/ComparisonCard';
import { toast } from 'sonner';

interface DuplicateCandidate {
    id: string;
    student1: {
        id: string;
        name: string;
        dob: string;
        grade: string;
        enrollmentDate: string;
    };
    student2: {
        id: string;
        name: string;
        dob: string;
        grade: string;
        enrollmentDate: string;
    };
    confidence: 'High' | 'Medium' | 'Low';
    matchingFields: string[];
}

export const DuplicateReview: React.FC = () => {
    const [duplicates, setDuplicates] = useState<DuplicateCandidate[]>([
        {
            id: '1',
            student1: { id: 'S1001', name: 'John A. Smith', dob: '2010-05-15', grade: '8', enrollmentDate: '2023-08-20' },
            student2: { id: 'S1002', name: 'John Smith', dob: '2010-05-15', grade: '8', enrollmentDate: '2023-08-21' },
            confidence: 'High',
            matchingFields: ['First Name', 'Last Name', 'Date of Birth', 'Grade']
        },
        {
            id: '2',
            student1: { id: 'S1003', name: 'Maria Garcia', dob: '2011-11-22', grade: '7', enrollmentDate: '2023-08-15' },
            student2: { id: 'S1004', name: 'Maria L. Garcia', dob: '2011-11-22', grade: '7', enrollmentDate: '2023-08-16' },
            confidence: 'Medium',
            matchingFields: ['First Name', 'Last Name', 'Date of Birth']
        }
    ]);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAction = (id: string, action: 'same' | 'different') => {
        toast.success(`Marked as ${action === 'same' ? 'Same Student' : 'Different Students'} (Demo)`);
        setDuplicates(duplicates.filter(d => d.id !== id));
        setExpandedId(null);
    };

    const getConfidenceColor = (confidence: string) => {
        switch (confidence) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-orange-100 text-orange-800';
            case 'Low': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Potential Duplicate Review</h1>
                <p className="text-gray-600">Mock duplicate detection workflow</p>
            </header>

            <Card>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Duplicate Detection Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded">
                            <p className="text-sm text-blue-700">Total Flagged</p>
                            <p className="text-2xl font-bold">{duplicates.length}</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded">
                            <p className="text-sm text-red-700">High Confidence</p>
                            <p className="text-2xl font-bold">
                                {duplicates.filter(d => d.confidence === 'High').length}
                            </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded">
                            <p className="text-sm text-green-700">Resolved</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4" role="list" aria-label="List of potential duplicates">
                    {duplicates.map((dup) => (
                        <Card key={dup.id} className="border">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedId(expandedId === dup.id ? null : dup.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setExpandedId(expandedId === dup.id ? null : dup.id)}
                                aria-expanded={expandedId === dup.id}
                                aria-controls={`duplicate-details-${dup.id}`}
                            >
                                <div>
                                    <h3 className="font-semibold">Potential Duplicate #{dup.id}</h3>
                                    <p className="text-sm text-gray-600">
                                        {dup.student1.name} ↔ {dup.student2.name}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(dup.confidence)}`}>
                                        {dup.confidence} Confidence
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {dup.matchingFields.length} matching fields
                                    </span>
                                    <Button
                                        icon={`pi pi-${expandedId === dup.id ? 'chevron-up' : 'chevron-down'}`}
                                        className="p-button-text"
                                        aria-label={expandedId === dup.id ? 'Collapse details' : 'Expand details'}
                                    />
                                </div>
                            </div>

                            {expandedId === dup.id && (
                                <div
                                    id={`duplicate-details-${dup.id}`}
                                    className="mt-4 pt-4 border-t"
                                    role="region"
                                    aria-label="Duplicate comparison details"
                                >
                                    <ComparisonCard
                                        student1={dup.student1}
                                        student2={dup.student2}
                                        matchingFields={dup.matchingFields}
                                    />

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <Button
                                            label="Mark as Same Student"
                                            icon="pi pi-check"
                                            className="p-button-success"
                                            onClick={() => handleAction(dup.id, 'same')}
                                            aria-label={`Mark ${dup.student1.name} and ${dup.student2.name} as same student`}
                                        />
                                        <Button
                                            label="Mark as Different"
                                            icon="pi pi-times"
                                            className="p-button-danger"
                                            onClick={() => handleAction(dup.id, 'different')}
                                            aria-label={`Mark ${dup.student1.name} and ${dup.student2.name} as different students`}
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {duplicates.length === 0 && (
                    <div
                        className="text-center py-12"
                        role="alert"
                        aria-live="polite"
                    >
                        <p className="text-lg font-semibold text-gray-700">No pending duplicates to review</p>
                        <p className="text-gray-600 mt-2">All potential duplicates have been resolved (demo state)</p>
                    </div>
                )}
            </Card>

            <div
                role="region"
                aria-label="Demo instructions"
                className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
            >
                <h3 className="font-semibold text-yellow-800 mb-2">Demo Instructions:</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    <li>Click on any duplicate pair to expand comparison view</li>
                    <li>Use "Mark as Same Student" or "Mark as Different" buttons to resolve</li>
                    <li>All actions are simulated with mock data</li>
                </ul>
            </div>
        </div>
    );
};