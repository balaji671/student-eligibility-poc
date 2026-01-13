import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';

export const StudentCreate: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const steps = [
        { label: 'District & School Information' },
        { label: 'Student Demographics' },
        { label: 'Student Identification' },
        { label: 'Address & Enrollment' },
        { label: 'Program Selection' },
        { label: 'Review & Submit' }
    ];

    const [formData, setFormData] = useState({
        // District & School Information
        countyNumber: '',
        sponsorLEANumber: '',
        siteSchoolNumber: '',

        // Student Demographics
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: null as Date | null,
        gender: '',
        raceEthnicity: '',

        // Student Identification
        studentId: '',
        lastFourSSN: '',
        caseNumber: '',

        // Address & Enrollment
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        enrollmentStartDate: null as Date | null,

        // Program Selection
        programs: [] as string[]
    });

    // Mock data options
    const counties = [
        { label: 'Select County', value: '' },
        { label: 'County 001', value: '001' },
        { label: 'County 002', value: '002' },
        { label: 'County 003', value: '003' },
        { label: 'County 004', value: '004' },
    ];

    const leaNumbers = [
        { label: 'Select LEA', value: '' },
        { label: 'LEA-1001', value: '1001' },
        { label: 'LEA-1002', value: '1002' },
        { label: 'LEA-1003', value: '1003' },
    ];

    const schoolNumbers = [
        { label: 'Select School', value: '' },
        { label: 'Elementary School (001)', value: '001' },
        { label: 'Middle School (002)', value: '002' },
        { label: 'High School (003)', value: '003' },
    ];

    const genderOptions = [
        { label: 'Select Gender', value: '' },
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Non-binary', value: 'NB' },
        { label: 'Prefer not to say', value: 'PNS' },
    ];

    const raceEthnicityOptions = [
        { label: 'Select Race/Ethnicity', value: '' },
        { label: 'White', value: 'WH' },
        { label: 'Black or African American', value: 'BL' },
        { label: 'Hispanic or Latino', value: 'HI' },
        { label: 'Asian', value: 'AS' },
        { label: 'American Indian/Alaska Native', value: 'AI' },
        { label: 'Native Hawaiian/Pacific Islander', value: 'NH' },
        { label: 'Two or More Races', value: 'TM' },
    ];

    const stateOptions = [
        { label: 'Select State', value: '' },
        { label: 'AL', value: 'AL' },
        { label: 'AK', value: 'AK' },
        { label: 'AZ', value: 'AZ' },
        { label: 'AR', value: 'AR' },
        { label: 'CA', value: 'CA' },
        { label: 'CO', value: 'CO' },
        { label: 'CT', value: 'CT' },
        { label: 'DE', value: 'DE' },
        { label: 'FL', value: 'FL' },
        { label: 'GA', value: 'GA' },
    ];

    const programs = [
        'Free Lunch Program',
        'Reduced Price Lunch',
        'Special Education Services',
        'English Language Learner (ELL)',
        'Gifted and Talented',
        'Career and Technical Education',
        'Title I Services',
        'Migrant Education'
    ];

    const handleNext = () => {
        // Basic validation for required fields
        if (activeStep === 0) {
            if (!formData.countyNumber || !formData.sponsorLEANumber || !formData.siteSchoolNumber) {
                toast.error('Please fill all required district and school fields');
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender || !formData.raceEthnicity) {
                toast.error('Please fill all required demographic fields');
                return;
            }
        } else if (activeStep === 2) {
            if (!formData.studentId) {
                toast.error('Student ID is required');
                return;
            }
        }

        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            // Submit form
            toast.success('Student record created successfully (Demo)');
            navigate('/students');
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        } else {
            navigate('/dashboard');
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0: // District & School Information
                return (
                    <div className="space-y-4" role="form" aria-label="District and school information form">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="countyNumber" className="block text-sm font-medium mb-1">
                                    County Number *
                                </label>
                                <Dropdown
                                    id="countyNumber"
                                    value={formData.countyNumber}
                                    onChange={(e) => updateFormData('countyNumber', e.value)}
                                    options={counties}
                                    placeholder="Select County"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="County number selection"
                                />
                            </div>
                            <div>
                                <label htmlFor="sponsorLEANumber" className="block text-sm font-medium mb-1">
                                    Sponsor/LEA Number *
                                </label>
                                <Dropdown
                                    id="sponsorLEANumber"
                                    value={formData.sponsorLEANumber}
                                    onChange={(e) => updateFormData('sponsorLEANumber', e.value)}
                                    options={leaNumbers}
                                    placeholder="Select LEA"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="LEA number selection"
                                />
                            </div>
                            <div>
                                <label htmlFor="siteSchoolNumber" className="block text-sm font-medium mb-1">
                                    Site/School Number *
                                </label>
                                <Dropdown
                                    id="siteSchoolNumber"
                                    value={formData.siteSchoolNumber}
                                    onChange={(e) => updateFormData('siteSchoolNumber', e.value)}
                                    options={schoolNumbers}
                                    placeholder="Select School"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="School number selection"
                                />
                            </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded text-sm text-blue-700">
                            <p className="font-medium mb-1">Demo Note:</p>
                            <p>These selections represent mock district and school identifiers for demonstration purposes only.</p>
                        </div>
                    </div>
                );

            case 1: // Student Demographics
                return (
                    <div className="space-y-4" role="form" aria-label="Student demographics form">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                    First Name *
                                </label>
                                <InputText
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="Student first name"
                                />
                            </div>
                            <div>
                                <label htmlFor="middleName" className="block text-sm font-medium mb-1">
                                    Middle Name
                                </label>
                                <InputText
                                    id="middleName"
                                    value={formData.middleName}
                                    onChange={(e) => updateFormData('middleName', e.target.value)}
                                    className="w-full"
                                    aria-label="Student middle name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                    Last Name *
                                </label>
                                <InputText
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData('lastName', e.target.value)}
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="Student last name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
                                    Date of Birth *
                                </label>
                                <Calendar
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => updateFormData('dateOfBirth', e.value)}
                                    className="w-full"
                                    showIcon
                                    required
                                    aria-required="true"
                                    dateFormat="yy-mm-dd"
                                    placeholder="YYYY-MM-DD"
                                    aria-label="Student date of birth"
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                                    Gender *
                                </label>
                                <Dropdown
                                    id="gender"
                                    value={formData.gender}
                                    onChange={(e) => updateFormData('gender', e.value)}
                                    options={genderOptions}
                                    placeholder="Select Gender"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="Student gender"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="raceEthnicity" className="block text-sm font-medium mb-1">
                                Race/Ethnicity *
                            </label>
                            <Dropdown
                                id="raceEthnicity"
                                value={formData.raceEthnicity}
                                onChange={(e) => updateFormData('raceEthnicity', e.value)}
                                options={raceEthnicityOptions}
                                placeholder="Select Race/Ethnicity"
                                className="w-full"
                                required
                                aria-required="true"
                                aria-label="Student race and ethnicity"
                            />
                        </div>

                        <div className="p-3 bg-yellow-50 rounded text-sm text-yellow-700">
                            <p className="font-medium mb-1">Privacy Notice:</p>
                            <p>In this demo, all data is mock/fake. In production, this information would be protected according to FERPA and other privacy regulations.</p>
                        </div>
                    </div>
                );

            case 2: // Student Identification
                return (
                    <div className="space-y-4" role="form" aria-label="Student identification form">
                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium mb-1">
                                Student ID *
                            </label>
                            <InputText
                                id="studentId"
                                value={formData.studentId}
                                onChange={(e) => updateFormData('studentId', e.target.value)}
                                className="w-full"
                                required
                                aria-required="true"
                                placeholder="e.g., STU-2023-001"
                                aria-label="Student identification number"
                            />
                            <p className="text-sm text-gray-500 mt-1">State or local student identifier</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="lastFourSSN" className="block text-sm font-medium mb-1">
                                    Last 4 of SSN
                                </label>
                                <InputMask
                                    id="lastFourSSN"
                                    value={formData.lastFourSSN}
                                    onChange={(e) => updateFormData('lastFourSSN', e.value)}
                                    mask="9999"
                                    placeholder="1234"
                                    className="w-full"
                                    aria-label="Last four digits of social security number"
                                />
                                <p className="text-sm text-gray-500 mt-1">If available for verification</p>
                            </div>
                            <div>
                                <label htmlFor="caseNumber" className="block text-sm font-medium mb-1">
                                    Case Number
                                </label>
                                <InputText
                                    id="caseNumber"
                                    value={formData.caseNumber}
                                    onChange={(e) => updateFormData('caseNumber', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., CASE-2023-001"
                                    aria-label="Assistance program case number"
                                />
                                <p className="text-sm text-gray-500 mt-1">Assistance program case ID (if applicable)</p>
                            </div>
                        </div>

                        <div className="p-3 bg-red-50 rounded text-sm text-red-700">
                            <p className="font-medium mb-1">Security Warning (Demo):</p>
                            <p>Never enter real SSN information in this demo system. All data entered here is mock/fake and for demonstration purposes only.</p>
                        </div>
                    </div>
                );

            case 3: // Address & Enrollment
                return (
                    <div className="space-y-4" role="form" aria-label="Address and enrollment form">
                        <div>
                            <label htmlFor="addressLine1" className="block text-sm font-medium mb-1">
                                Address Line 1 *
                            </label>
                            <InputText
                                id="addressLine1"
                                value={formData.addressLine1}
                                onChange={(e) => updateFormData('addressLine1', e.target.value)}
                                className="w-full"
                                required
                                aria-required="true"
                                placeholder="123 Main Street"
                                aria-label="Student address line 1"
                            />
                        </div>

                        <div>
                            <label htmlFor="addressLine2" className="block text-sm font-medium mb-1">
                                Address Line 2
                            </label>
                            <InputText
                                id="addressLine2"
                                value={formData.addressLine2}
                                onChange={(e) => updateFormData('addressLine2', e.target.value)}
                                className="w-full"
                                placeholder="Apartment, Suite, Unit (optional)"
                                aria-label="Student address line 2"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-1">
                                    City *
                                </label>
                                <InputText
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => updateFormData('city', e.target.value)}
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    placeholder="Anytown"
                                    aria-label="Student city"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium mb-1">
                                    State *
                                </label>
                                <Dropdown
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => updateFormData('state', e.value)}
                                    options={stateOptions}
                                    placeholder="Select State"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="Student state"
                                />
                            </div>
                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                                    ZIP Code *
                                </label>
                                <InputMask
                                    id="zipCode"
                                    value={formData.zipCode}
                                    onChange={(e) => updateFormData('zipCode', e.value)}
                                    mask="99999"
                                    placeholder="12345"
                                    className="w-full"
                                    required
                                    aria-required="true"
                                    aria-label="Student zip code"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="enrollmentStartDate" className="block text-sm font-medium mb-1">
                                Enrollment Start Date *
                            </label>
                            <Calendar
                                id="enrollmentStartDate"
                                value={formData.enrollmentStartDate}
                                onChange={(e) => updateFormData('enrollmentStartDate', e.value)}
                                className="w-full"
                                showIcon
                                required
                                aria-required="true"
                                dateFormat="yy-mm-dd"
                                placeholder="YYYY-MM-DD"
                                aria-label="Student enrollment start date"
                            />
                            <p className="text-sm text-gray-500 mt-1">Date student enrolled in current school</p>
                        </div>

                        <div className="p-3 bg-blue-50 rounded text-sm text-blue-700">
                            <p className="font-medium mb-1">Demo Note:</p>
                            <p>Address information in this demo is mock data only. No real addresses should be entered.</p>
                        </div>
                    </div>
                );

            case 4: // Program Selection
                return (
                    <div className="space-y-4" role="form" aria-label="Program selection form">
                        <p className="text-sm text-gray-600 mb-4">
                            Select applicable programs for this student (mock selection for demonstration)
                        </p>
                        <div className="space-y-3">
                            {programs.map((program) => (
                                <div key={program} className="flex items-start">
                                    <Checkbox
                                        inputId={`program-${program}`}
                                        checked={formData.programs.includes(program)}
                                        onChange={(e) => {
                                            const updated = e.checked
                                                ? [...formData.programs, program]
                                                : formData.programs.filter(p => p !== program);
                                            updateFormData('programs', updated);
                                        }}
                                        aria-label={`Select ${program}`}
                                    />
                                    <label
                                        htmlFor={`program-${program}`}
                                        className="ml-3 text-sm leading-tight cursor-pointer"
                                    >
                                        {program}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-green-50 rounded text-sm text-green-700 mt-4">
                            <p className="font-medium mb-1">Program Information:</p>
                            <p>Program selection in this demo is for workflow demonstration only. No actual eligibility determination occurs.</p>
                        </div>
                    </div>
                );

            case 5: // Review & Submit
                return (
                    <div role="region" aria-label="Review student information">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-lg mb-4">Review Student Information</h3>

                                {/* District & School */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">District & School Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                            <p className="text-sm text-gray-500">County Number</p>
                                            <p className="font-medium">{formData.countyNumber || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">LEA Number</p>
                                            <p className="font-medium">{formData.sponsorLEANumber || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">School Number</p>
                                            <p className="font-medium">{formData.siteSchoolNumber || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Demographics */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">Student Demographics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">
                                                {formData.firstName} {formData.middleName && `${formData.middleName} `}{formData.lastName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date of Birth</p>
                                            <p className="font-medium">
                                                {formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString('en-CA') : 'Not specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Gender</p>
                                            <p className="font-medium">
                                                {genderOptions.find(g => g.value === formData.gender)?.label || 'Not specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Race/Ethnicity</p>
                                            <p className="font-medium">
                                                {raceEthnicityOptions.find(r => r.value === formData.raceEthnicity)?.label || 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Identification */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">Student Identification</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Student ID</p>
                                            <p className="font-medium">{formData.studentId || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Last 4 of SSN</p>
                                            <p className="font-medium">{formData.lastFourSSN ? '••••' : 'Not provided'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500">Case Number</p>
                                            <p className="font-medium">{formData.caseNumber || 'Not applicable'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">Address & Enrollment</h4>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">
                                                {formData.addressLine1 || 'Not specified'}
                                                {formData.addressLine2 && `, ${formData.addressLine2}`}
                                            </p>
                                            <p className="font-medium">
                                                {formData.city && `${formData.city}, `}
                                                {formData.state} {formData.zipCode}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Enrollment Start Date</p>
                                            <p className="font-medium">
                                                {formData.enrollmentStartDate ? formData.enrollmentStartDate.toLocaleDateString('en-CA') : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Programs */}
                                {formData.programs.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">Selected Programs</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {formData.programs.map((program, index) => (
                                                <li key={index} className="text-gray-700">{program}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Demo Disclaimer */}
                            <div
                                role="alert"
                                className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                            >
                                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Demo Submission Notice</h4>
                                <p className="text-yellow-700 text-sm">
                                    This is a Proof of Concept demonstration. No real student data will be saved or transmitted.
                                    All information entered is mock data for workflow demonstration only.
                                </p>
                                <p className="text-yellow-700 text-sm mt-2">
                                    In a production system, this submission would trigger actual data processing,
                                    eligibility verification, and compliance checks.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">Add New Student Record</h1>
                <p className="text-gray-600">Multi-step form for manual student entry (Mock Data)</p>
            </header>

            <Card>
                <Steps
                    model={steps}
                    activeIndex={activeStep}
                    onSelect={(e) => setActiveStep(e.index)}
                    readOnly={false}
                    aria-label="Student creation form steps"
                />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-6">{steps[activeStep].label}</h2>
                    {renderStepContent()}
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button
                        label="Back"
                        icon="pi pi-arrow-left"
                        onClick={handleBack}
                        className="p-button-text"
                        aria-label="Go to previous step"
                        disabled={activeStep === 0}
                    />

                    <div className="text-sm text-gray-500">
                        Step {activeStep + 1} of {steps.length}
                    </div>

                    <Button
                        label={activeStep === steps.length - 1 ? 'Submit Mock Record' : 'Next'}
                        icon={`pi pi-${activeStep === steps.length - 1 ? 'check' : 'arrow-right'}`}
                        onClick={handleNext}
                        aria-label={activeStep === steps.length - 1 ? 'Submit mock student record' : 'Go to next step'}
                    />
                </div>
            </Card>

            {/* Demo Instructions */}
            <Card className="bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Demo Instructions:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>Fill out each step with mock data (no real student information)</li>
                    <li>Required fields are marked with asterisks (*)</li>
                    <li>Use the Back/Next buttons to navigate through steps</li>
                    <li>Review all information before final submission</li>
                    <li>All data is mock/fake for demonstration only</li>
                </ul>
            </Card>
        </div>
    );
};