import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';
import { StatusBadge } from '../components/UI/StatusBadge';

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
        householdIncome: '$25k-$50k',
        previousStatus: 'Review'
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
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Eligibility Review</h1>
                <p className="text-gray-600">Mock eligibility decision workflow</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Summary */}
                <Card className="lg:col-span-1">
                    <h2 className="font-semibold mb-4">Student Summary</h2>
                    <dl className="space-y-3">
                        <div>
                            <dt className="text-sm text-gray-500">Student ID</dt>
                            <dd className="font-medium">{mockStudent.id}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Name</dt>
                            <dd className="font-medium">{mockStudent.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Grade</dt>
                            <dd className="font-medium">{mockStudent.grade}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Current Status</dt>
                            <dd className="mt-1"><StatusBadge status={mockStudent.previousStatus as any} /></dd>
                        </div>
                    </dl>
                </Card>

                {/* Review Form */}
                <Card className="lg:col-span-2">
                    <h2 className="font-semibold mb-6">Eligibility Decision</h2>

                    {/* Mock Eligibility Criteria */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Mock Eligibility Criteria (Simulated)
                        </h3>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li>Household income within program limits (simulated check)</li>
                            <li>Residency verification (simulated check)</li>
                            <li>Age/grade requirements (simulated check)</li>
                            <li>Program-specific criteria (simulated check)</li>
                        </ul>
                    </div>

                    {/* Decision Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-3">
                            Select Eligibility Decision *
                        </label>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <RadioButton
                                    inputId="eligible"
                                    name="decision"
                                    value="eligible"
                                    onChange={(e) => setDecision(e.value)}
                                    checked={decision === 'eligible'}
                                    aria-label="Mark as eligible"
                                />
                                <label
                                    htmlFor="eligible"
                                    className="ml-2 flex items-center text-green-700 font-medium"
                                >
                                    <CheckCircle className="h-5 w-5 mr-2" />
                                    Eligible
                                </label>
                            </div>
                            <div className="flex items-center">
                                <RadioButton
                                    inputId="ineligible"
                                    name="decision"
                                    value="ineligible"
                                    onChange={(e) => setDecision(e.value)}
                                    checked={decision === 'ineligible'}
                                    aria-label="Mark as ineligible"
                                />
                                <label
                                    htmlFor="ineligible"
                                    className="ml-2 flex items-center text-red-700 font-medium"
                                >
                                    <XCircle className="h-5 w-5 mr-2" />
                                    Not Eligible
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                        <label
                            htmlFor="notes"
                            className="block text-sm font-medium mb-2"
                        >
                            Review Notes (Optional)
                        </label>
                        <InputTextarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            className="w-full"
                            placeholder="Add any notes or comments about this eligibility decision..."
                            aria-label="Review notes"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                        <Button
                            label="Back to Student"
                            icon="pi pi-arrow-left"
                            className="p-button-text"
                            onClick={() => navigate(`/students/${mockStudent.id}`)}
                            aria-label="Go back to student details"
                        />
                        <div className="space-x-3">
                            <Button
                                label="Request Correction"
                                icon="pi pi-exclamation-circle"
                                className="p-button-warning"
                                onClick={() => {
                                    toast.info('Correction requested (Demo)');
                                    navigate('/students');
                                }}
                                aria-label="Request correction"
                            />
                            <Button
                                label="Submit Decision"
                                icon="pi pi-check"
                                className="p-button-success"
                                onClick={handleSubmit}
                                disabled={!decision}
                                aria-label="Submit eligibility decision"
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Mock Data Display */}
            <Card>
                <h2 className="font-semibold mb-4">Submitted Information (Mock Data)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Household Information</p>
                        <p className="font-medium mt-1">{mockStudent.householdIncome} annual income</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Program Applications</p>
                        <p className="font-medium mt-1">{mockStudent.programs.join(', ')}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Enrollment Date</p>
                        <p className="font-medium mt-1">{mockStudent.enrollmentDate}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium mt-1">{mockStudent.dob}</p>
                    </div>
                </div>

                <div
                    className="mt-4 p-3 bg-yellow-50 rounded text-sm text-yellow-700"
                    role="note"
                    aria-label="Demo note"
                >
                    <p className="font-medium mb-1">Note: All data displayed is mock data</p>
                    <p>No real student information is shown or processed in this demo.</p>
                </div>
            </Card>
        </div>
    );
};