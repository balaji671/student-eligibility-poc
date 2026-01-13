import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from 'primereact/card';

interface ComparisonCardProps {
    student1: any;
    student2: any;
    matchingFields: string[];
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
    student1,
    student2,
    matchingFields
}) => {
    const fields = [
        { key: 'id', label: 'Student ID' },
        { key: 'name', label: 'Full Name' },
        { key: 'dob', label: 'Date of Birth' },
        { key: 'grade', label: 'Grade' },
        { key: 'enrollmentDate', label: 'Enrollment Date' },
    ];

    const isMatching = (field: string) => {
        return matchingFields.includes(field);
    };

    return (
        <div
            className="space-y-4"
            role="region"
            aria-label="Student comparison"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <h3 className="font-semibold text-center mb-2">Student A</h3>
                </div>
                <div className="md:col-span-1">
                    <h3 className="font-semibold text-center mb-2">Comparison</h3>
                </div>
                <div className="md:col-span-1">
                    <h3 className="font-semibold text-center mb-2">Student B</h3>
                </div>
            </div>

            {fields.map((field) => (
                <div key={field.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Card className="p-3">
                        <p className="text-sm text-gray-500">{field.label}</p>
                        <p className="font-medium">{student1[field.key]}</p>
                    </Card>

                    <div className="flex justify-center">
                        {isMatching(field.label) ? (
                            <div
                                className="flex items-center text-green-600"
                                role="status"
                                aria-label="Fields match"
                            >
                                <Check className="h-5 w-5 mr-2" />
                                <span className="text-sm font-medium">Match</span>
                            </div>
                        ) : (
                            <div
                                className="flex items-center text-red-600"
                                role="status"
                                aria-label="Fields do not match"
                            >
                                <X className="h-5 w-5 mr-2" />
                                <span className="text-sm font-medium">Different</span>
                            </div>
                        )}
                    </div>

                    <Card className="p-3">
                        <p className="text-sm text-gray-500">{field.label}</p>
                        <p className="font-medium">{student2[field.key]}</p>
                    </Card>
                </div>
            ))}

            <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-800">
                    Matching Fields: {matchingFields.join(', ')}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                    This comparison is based on simulated duplicate detection logic.
                </p>
            </div>
        </div>
    );
};