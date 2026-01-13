import React, { type ReactNode, useState } from 'react';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';

interface Step {
    label: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
}

interface StepFormProps {
    steps: Step[];
    activeStep: number;
    onStepChange?: (index: number) => void;
    onNext?: () => boolean | void;
    onBack?: () => void;
    onSubmit?: () => void;
    children: ReactNode;
    showNavigation?: boolean;
    nextLabel?: string;
    backLabel?: string;
    submitLabel?: string;
    className?: string;
    ariaLabel?: string;
}

export const StepForm: React.FC<StepFormProps> = ({
    steps,
    activeStep,
    onStepChange,
    onNext,
    onBack,
    onSubmit,
    children,
    showNavigation = true,
    nextLabel = 'Next',
    backLabel = 'Back',
    submitLabel = 'Submit',
    className = '',
    ariaLabel = 'Multi-step form'
}) => {
    const [localActiveStep, setLocalActiveStep] = useState(activeStep);

    const currentStep = onStepChange !== undefined ? activeStep : localActiveStep;

    const handleNext = () => {
        if (onNext) {
            const canProceed = onNext();
            if (canProceed === false) return;
        }

        if (onStepChange) {
            onStepChange(currentStep + 1);
        } else {
            setLocalActiveStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        }

        if (onStepChange) {
            onStepChange(currentStep - 1);
        } else {
            setLocalActiveStep(prev => Math.max(prev - 1, 0));
        }
    };

    const handleStepClick = (index: number) => {
        if (steps[index].disabled) return;

        if (onStepChange) {
            onStepChange(index);
        } else {
            setLocalActiveStep(index);
        }
    };

    const isLastStep = currentStep === steps.length - 1;

    return (
        <div
            className={`step-form ${className}`}
            role="form"
            aria-label={ariaLabel}
        >
            {/* Progress Indicator */}
            <div className="mb-8">
                <Steps
                    model={steps.map((step, index) => ({
                        ...step,
                        command: () => handleStepClick(index)
                    }))}
                    activeIndex={currentStep}
                    readOnly={onStepChange === undefined}
                    aria-label="Form steps"
                />

                {/* Step Description */}
                {steps[currentStep].description && (
                    <p className="mt-4 text-gray-600 text-sm">
                        {steps[currentStep].description}
                    </p>
                )}
            </div>

            {/* Form Content */}
            <Card className="mb-6">
                <div
                    className="step-content"
                    role="region"
                    aria-label={`Step ${currentStep + 1} content`}
                >
                    {children}
                </div>
            </Card>

            {/* Navigation */}
            {showNavigation && (
                <div
                    className="flex justify-between items-center pt-6 border-t"
                    role="navigation"
                    aria-label="Form navigation"
                >
                    <div>
                        <Button
                            label={backLabel}
                            icon="pi pi-arrow-left"
                            className="p-button-text"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            aria-label="Go to previous step"
                        />
                    </div>

                    <div className="text-sm text-gray-500">
                        Step {currentStep + 1} of {steps.length}
                    </div>

                    <div>
                        {isLastStep ? (
                            <Button
                                label={submitLabel}
                                icon="pi pi-check"
                                onClick={onSubmit}
                                aria-label="Submit form"
                            />
                        ) : (
                            <Button
                                label={nextLabel}
                                icon="pi pi-arrow-right"
                                onClick={handleNext}
                                aria-label="Go to next step"
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Progress Status for Screen Readers */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
            </div>
        </div>
    );
};

// Example usage component
export const ExampleStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        program: ''
    });

    const steps: Step[] = [
        { label: 'Personal Info', description: 'Enter basic personal information' },
        { label: 'Program Selection', description: 'Choose your program' },
        { label: 'Review', description: 'Review and submit your information' }
    ];

    const handleNext = () => {
        if (currentStep === 0 && !formData.name) {
            alert('Please enter your name');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        alert('Form submitted successfully!');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Name *</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </label>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Select Program</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={formData.program}
                                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                            >
                                <option value="">Choose a program</option>
                                <option value="program1">Program 1</option>
                                <option value="program2">Program 2</option>
                                <option value="program3">Program 3</option>
                            </select>
                        </label>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Review Your Information</h3>
                        <div className="bg-gray-50 p-4 rounded">
                            <p><strong>Name:</strong> {formData.name}</p>
                            <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                            <p><strong>Program:</strong> {formData.program || 'Not selected'}</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <StepForm
            steps={steps}
            activeStep={currentStep}
            onStepChange={setCurrentStep}
            onNext={handleNext}
            onSubmit={handleSubmit}
            nextLabel="Continue"
            backLabel="Go Back"
            submitLabel="Submit Application"
            ariaLabel="Example application form"
        >
            {renderStepContent()}
        </StepForm>
    );
};