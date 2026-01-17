import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, CheckCircle2,
    User, School, Fingerprint, MapPin,
    ListChecks, ShieldCheck, AlertCircle,
    Info, Check, ArrowLeft, GraduationCap,
    Lock, Calendar as CalendarIcon, Globe
} from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { toast } from 'sonner';

export const StudentCreate: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const steps = [
        { label: 'District & School', icon: <School size={18} /> },
        { label: 'Demographics', icon: <User size={18} /> },
        { label: 'Identification', icon: <Fingerprint size={18} /> },
        { label: 'Address & Enrollment', icon: <MapPin size={18} /> },
        { label: 'Program Selection', icon: <ListChecks size={18} /> },
        { label: 'Review & Submit', icon: <ShieldCheck size={18} /> }
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
    ];

    const leaNumbers = [
        { label: 'Select LEA', value: '' },
        { label: 'LEA-1001', value: '1001' },
        { label: 'LEA-1002', value: '1002' },
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
        if (activeStep === 0) {
            if (!formData.countyNumber || !formData.sponsorLEANumber || !formData.siteSchoolNumber) {
                toast.error('District and school fields are required');
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender || !formData.raceEthnicity) {
                toast.error('All demographic fields are required');
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
            window.scrollTo(0, 0);
        } else {
            toast.success('Student record created successfully');
            navigate('/students');
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
            window.scrollTo(0, 0);
        } else {
            navigate('/dashboard');
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" role="form" aria-label="District and school information form">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="countyNumber" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">County Number *</label>
                                <Dropdown
                                    id="countyNumber"
                                    value={formData.countyNumber}
                                    onChange={(e) => updateFormData('countyNumber', e.value)}
                                    options={counties}
                                    placeholder="Select County"
                                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 transition-all"
                                    required
                                    aria-required="true"
                                    aria-label="County number selection"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sponsorLEANumber" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Sponsor/LEA Number *</label>
                                <Dropdown
                                    id="sponsorLEANumber"
                                    value={formData.sponsorLEANumber}
                                    onChange={(e) => updateFormData('sponsorLEANumber', e.value)}
                                    options={leaNumbers}
                                    placeholder="Select LEA"
                                    className="w-full bg-slate-50 border-slate-200 rounded-xl"
                                    required
                                    aria-required="true"
                                    aria-label="LEA number selection"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="siteSchoolNumber" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Site/School Number *</label>
                                <Dropdown
                                    id="siteSchoolNumber"
                                    value={formData.siteSchoolNumber}
                                    onChange={(e) => updateFormData('siteSchoolNumber', e.value)}
                                    options={schoolNumbers}
                                    placeholder="Select School"
                                    className="w-full bg-slate-50 border-slate-200 rounded-xl"
                                    required
                                    aria-required="true"
                                    aria-label="School number selection"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                            <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600"><School size={20} /></div>
                            <div>
                                <p className="text-xs font-bold text-indigo-900 uppercase tracking-tight">Demo Environment</p>
                                <p className="text-xs text-indigo-700/80">These selections represent mock district and school identifiers.</p>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" role="form" aria-label="Student demographics form">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name *</label>
                                <InputText
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                    className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    required
                                    aria-required="true"
                                    aria-label="Student first name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="middleName" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Middle Name</label>
                                <InputText
                                    id="middleName"
                                    value={formData.middleName}
                                    onChange={(e) => updateFormData('middleName', e.target.value)}
                                    className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    aria-label="Student middle name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name *</label>
                                <InputText
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData('lastName', e.target.value)}
                                    className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    required
                                    aria-required="true"
                                    aria-label="Student last name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="dateOfBirth" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Date of Birth *</label>

                                <Calendar
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => updateFormData('dateOfBirth', e.value)}
                                    className="rounded-xl overflow-hidden border-none bg-slate-50"
                                    inputClassName="py-3! border-slate-200 bg-transparent rounded-xl"
                                    showIcon
                                    required
                                    aria-required="true"
                                    dateFormat="yy-mm-dd"
                                    placeholder="YYYY-MM-DD"
                                    aria-label="Student date of birth"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="gender" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Gender *</label>
                                <Dropdown
                                    id="gender"
                                    value={formData.gender}
                                    onChange={(e) => updateFormData('gender', e.value)}
                                    options={genderOptions}
                                    placeholder="Select Gender"
                                    className="w-full bg-slate-50 border-slate-200 rounded-xl"
                                    required
                                    aria-required="true"
                                    aria-label="Student gender"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="raceEthnicity" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Race/Ethnicity *</label>
                            <Dropdown
                                id="raceEthnicity"
                                value={formData.raceEthnicity}
                                onChange={(e) => updateFormData('raceEthnicity', e.value)}
                                options={raceEthnicityOptions}
                                placeholder="Select Race/Ethnicity"
                                className="w-full bg-slate-50 border-slate-200 rounded-xl"
                                required
                                aria-required="true"
                                aria-label="Student race and ethnicity"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" role="form" aria-label="Student identification form">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="studentId" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Student ID *</label>
                            <InputText id="studentId" value={formData.studentId} onChange={(e) => updateFormData('studentId', e.target.value)} className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold" placeholder="e.g., STU-2023-001" required aria-required="true" aria-label="Student identification number" />
                            <p className="text-[10px] font-medium text-slate-400 ml-1">State or local student identifier</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastFourSSN" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last 4 of SSN</label>
                                <InputMask
                                    id="lastFourSSN"
                                    value={formData.lastFourSSN}
                                    onChange={(e) => updateFormData('lastFourSSN', e.value)}
                                    mask="9999"
                                    placeholder="1234"
                                    className="py-3!px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    aria-label="Last four digits of social security number"
                                />
                                <p className="text-sm text-gray-500 mt-1">If available for verification</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="caseNumber" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Case Number</label>
                                <InputText
                                    id="caseNumber"
                                    value={formData.caseNumber}
                                    onChange={(e) => updateFormData('caseNumber', e.target.value)}
                                    className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    placeholder="e.g., CASE-2023-001"
                                    aria-label="Assistance program case number"
                                />
                                <p className="text-sm text-gray-500 mt-1">Assistance program case ID (if applicable)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <div className="bg-white p-2 rounded-lg shadow-sm text-red-600"><Lock size={20} /></div>
                            <div>
                                <p className="text-xs font-bold text-red-900 uppercase tracking-tight">Security Protocol</p>
                                <p className="text-xs text-red-700/80">Never enter real SSN information in this POC environment.</p>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" role="form" aria-label="Address and enrollment form">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="addressLine1" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Address Line 1 *</label>
                            <InputText
                                id="addressLine1"
                                value={formData.addressLine1}
                                onChange={(e) => updateFormData('addressLine1', e.target.value)}
                                className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                required
                                aria-required="true"
                                placeholder="123 Main Street"
                                aria-label="Student address line 1"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="addressLine2" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Address Line 2</label>
                            <InputText
                                id="addressLine2"
                                value={formData.addressLine2}
                                onChange={(e) => updateFormData('addressLine2', e.target.value)}
                                className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                aria-label="Student address line 2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="city" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">City *</label>
                                <InputText id="city" value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold" aria-required="true"
                                    placeholder="Anytown"
                                    aria-label="Student city" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="state" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">State *</label>
                                <Dropdown id="state" value={formData.state} onChange={(e) => updateFormData('state', e.value)} options={stateOptions} className="w-full bg-slate-50 border-slate-200 rounded-xl"
                                    placeholder="Select State"
                                    required
                                    aria-required="true"
                                    aria-label="Student state"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="zipCode" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">ZIP Code *</label>
                                <InputMask id="zipCode" value={formData.zipCode} onChange={(e) => updateFormData('zipCode', e.value)} mask="99999" className="py-3! px-4! bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold"
                                    placeholder="12345"
                                    required
                                    aria-required="true"
                                    aria-label="Student zip code"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-4">
                            <label htmlFor="enrollmentStartDate" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Enrollment Start Date *</label>
                            <Calendar id="enrollmentStartDate" value={formData.enrollmentStartDate} onChange={(e) => updateFormData('enrollmentStartDate', e.value)} className="rounded-xl overflow-hidden border-none bg-slate-50" inputClassName="py-3! border-slate-200 bg-transparent rounded-xl" showIcon dateFormat="yy-mm-dd"
                                required
                                aria-required="true"
                                placeholder="YYYY-MM-DD"
                                aria-label="Student enrollment start date"
                            />
                            <p className="text-sm text-gray-500 mt-1">Date student enrolled in current school</p>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" role="form" aria-label="Program selection form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {programs.map((program) => (
                                <div key={program} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${formData.programs.includes(program) ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'}`} onClick={() => {
                                    const updated = formData.programs.includes(program) ? formData.programs.filter(p => p !== program) : [...formData.programs, program];
                                    updateFormData('programs', updated);
                                }}>
                                    <Checkbox
                                        inputId={`program-${program}`}
                                        checked={formData.programs.includes(program)}
                                        onChange={() => { }}
                                        className={formData.programs.includes(program) ? 'checkbox-white' : ''}
                                        aria-label={`Select ${program}`}
                                    />
                                    <label htmlFor={`program-${program}`} className="text-xs font-bold uppercase tracking-tight cursor-pointer flex-1">
                                        {program}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div role="region" aria-label="Review student information" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Main Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                            {/* 1. District & School */}
                            <section className="space-y-4">
                                <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <School size={14} className="text-slate-400" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">District</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">County Number</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.countyNumber || '---'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">LEA Number</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.sponsorLEANumber || '---'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">School ID</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.siteSchoolNumber || '---'}</p>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Demographics */}
                            <section className="space-y-4">
                                <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <User size={14} className="text-slate-400" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Student</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Full Name</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.firstName} {formData.middleName} {formData.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">DOB / Gender</p>
                                        <p className="text-sm font-bold text-slate-700">
                                            {formData.dateOfBirth?.toLocaleDateString('en-CA')} <span className="text-slate-300 mx-1">|</span> {formData.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Ethnicity</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.raceEthnicity}</p>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Identification */}
                            <section className="space-y-4">
                                <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <Fingerprint size={14} className="text-slate-400" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Identity</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Student ID</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.studentId || '---'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Last 4 SSN</p>
                                        <p className="text-sm font-bold text-slate-700">***-**-{formData.lastFourSSN || '0000'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Case Number</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.caseNumber || 'N/A'}</p>
                                    </div>
                                </div>
                            </section>

                            {/* 4. Address & Enrollment */}
                            <section className="space-y-4">
                                <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <MapPin size={14} className="text-slate-400" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Location</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Residence</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">
                                            {formData.addressLine1}
                                            {formData.addressLine2 && <span className="block">{formData.addressLine2}</span>}
                                        </p>
                                        <p className="text-[11px] font-medium text-slate-500 uppercase">{formData.city}, {formData.state} {formData.zipCode}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Enrollment Date</p>
                                        <p className="text-sm font-bold text-slate-700">{formData.enrollmentStartDate?.toLocaleDateString('en-CA')}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Programs Section - Custom Dark Banner */}
                        {formData.programs.length > 0 ? (
                            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl shadow-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <ListChecks size={18} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Authorized Programs</h4>
                                        <p className="text-[10px] text-white/40 font-bold uppercase">The following services will be provisioned upon submission</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.programs.map((p, i) => (
                                        <span key={i} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-[10px] font-black border border-white/10 uppercase tracking-widest flex items-center gap-2">
                                            <CheckCircle2 size={12} className="text-emerald-500" /> {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No additional programs selected</p>
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Add New Record</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <GraduationCap size={14} /> Manual entry workflow for verified enrollments
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/students')}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                >
                    <ChevronLeft size={18} />
                    Exit to Roster
                </button>
            </header>

            <nav aria-label="Registration Progress" className="px-2">
                <ol className="flex items-center justify-between w-full">
                    {steps?.map((step, idx) => (
                        <li key={idx} className="flex-1 flex flex-col items-center relative">
                            {idx !== 0 && (
                                <div className={`absolute top-6 -left-1/2 w-full h-0.75 -z-10 transition-all duration-700 ${activeStep >= idx ? 'bg-slate-900' : 'bg-slate-100'}`} />
                            )}
                            <button
                                onClick={() => idx < activeStep && setActiveStep(idx)}
                                disabled={idx > activeStep}
                                className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all duration-500 border-2 
                                    ${activeStep === idx ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-110' :
                                        activeStep > idx ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'bg-white border-slate-200 text-slate-300'}`}
                                aria-current={activeStep === idx ? 'step' : undefined}
                                aria-label={`Step ${idx + 1}: ${step.label}`}
                            >
                                {activeStep > idx ? <Check size={20} strokeWidth={3} /> : step.icon}
                            </button>
                            <span className={`text-[9px] font-black mt-3 uppercase tracking-widest ${activeStep === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                                {step.label.split(' ')[0]}
                            </span>
                        </li>
                    ))}
                </ol>
            </nav>

            <main className="overflow-hidden flex flex-col px-2">
                <div className="py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-900 shadow-sm">
                            {steps[activeStep].icon}
                        </div>
                        <div>
                            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{steps[activeStep].label}</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Section {activeStep + 1} of 6</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-700 uppercase">Live Entry</span>
                    </div>
                </div>

                <div className="flex-1">
                    {renderStepContent()}
                </div>

                <footer className="mt-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className="flex items-center gap-2 px-8 py-4 text-xs font-black text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all uppercase tracking-widest"
                    >
                        <ChevronLeft size={18} strokeWidth={3} /> Back
                    </button>

                    <div className="hidden md:flex gap-1">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${activeStep === i ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`} />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className={`group flex items-center gap-3 px-12 py-4 rounded-2xl text-xs font-black shadow-xl transition-all active:scale-95 uppercase tracking-[0.2em]
                            ${activeStep === steps.length - 1 ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100' : 'bg-slate-900 hover:bg-black text-white shadow-slate-200'}`}
                    >
                        {activeStep === steps.length - 1 ? 'Submit Record' : 'Next Step'}
                        {activeStep !== steps.length - 1 && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
                    </button>
                </footer>
            </main>

            <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-xl text-white">
                    <div className="bg-white/10 p-2.5 rounded-xl"><Globe size={20} className="text-white" /></div>
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black uppercase tracking-widest opacity-60">System Compliance</h4>
                        <p className="text-xs font-bold leading-relaxed">This form is optimized for WCAG 2.1 & Section 508 accessibility standards.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-indigo-600 rounded-xl text-white">
                    <div className="bg-white/10 p-2.5 rounded-xl"><Info size={20} className="text-white" /></div>
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black uppercase tracking-widest opacity-60">Entry Support</h4>
                        <p className="text-xs font-bold leading-relaxed">Required fields are marked with (*). Data is automatically validated upon entry.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};