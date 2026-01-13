import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Timeline } from 'primereact/timeline';
import { Badge } from 'primereact/badge';
import { Calendar, User, Home, FileText, School, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';
import { StatusBadge } from '../components/UI/StatusBadge';
import { mockStudents } from '../utils/mockData';

export const StudentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [student, setStudent] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        // Find student by ID
        const foundStudent = mockStudents.find(s => s.id === id);
        if (foundStudent) {
            setStudent(foundStudent);
        } else {
            toast.error('Student not found (Demo)');
            navigate('/students');
        }
    }, [id, navigate]);

    if (!student) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading student data...</p>
                </div>
            </div>
        );
    }

    const timelineEvents = [
        {
            status: 'Record Created',
            date: student.createdDate,
            icon: 'pi pi-user-plus',
            color: 'blue',
            description: 'Student record created manually'
        },
        {
            status: 'Enrolled',
            date: student.enrollmentStartDate,
            icon: 'pi pi-calendar',
            color: 'green',
            description: 'Student enrollment started'
        },
        ...(student.eligibilityDate ? [{
            status: 'Eligibility Determined',
            date: student.eligibilityDate,
            icon: 'pi pi-check-circle',
            color: 'purple',
            description: `Marked as ${student.status}`
        }] : []),
        {
            status: 'Last Updated',
            date: student.lastUpdated,
            icon: 'pi pi-refresh',
            color: 'orange',
            description: 'Record updated'
        }
    ];

    const getGenderLabel = (code: string) => {
        const genders: Record<string, string> = {
            'M': 'Male',
            'F': 'Female',
            'NB': 'Non-binary',
            'PNS': 'Prefer not to say'
        };
        return genders[code] || code;
    };

    const getRaceLabel = (code: string) => {
        const races: Record<string, string> = {
            'WH': 'White',
            'BL': 'Black or African American',
            'HI': 'Hispanic or Latino',
            'AS': 'Asian',
            'AI': 'American Indian/Alaska Native',
            'NH': 'Native Hawaiian/Pacific Islander',
            'TM': 'Two or More Races'
        };
        return races[code] || code;
    };

    const getCountyLabel = (code: string) => {
        const counties: Record<string, string> = {
            '001': 'County 001',
            '002': 'County 002',
            '003': 'County 003',
            '004': 'County 004'
        };
        return counties[code] || code;
    };

    const getSchoolLabel = (code: string) => {
        const schools: Record<string, string> = {
            '001': 'Elementary School',
            '002': 'Middle School',
            '003': 'High School'
        };
        return schools[code] || code;
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-4">
                        <Button
                            icon="pi pi-arrow-left"
                            className="p-button-text"
                            onClick={() => navigate('/students')}
                            aria-label="Back to student list"
                        />
                        <h1 className="text-2xl font-bold text-gray-900">
                            {student.firstName} {student.middleName && `${student.middleName} `}{student.lastName}
                        </h1>
                        <StatusBadge status={student.status as any} size="lg" />
                    </div>
                    <p className="text-gray-600 mt-2">Student ID: {student.studentId}</p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        label="Edit Record"
                        icon="pi pi-pencil"
                        className="p-button-outlined"
                        onClick={() => navigate(`/students/${student.id}/edit`)}
                        aria-label="Edit student record"
                    />
                    <Button
                        label="Review Eligibility"
                        icon="pi pi-check-circle"
                        className="p-button-success"
                        onClick={() => navigate(`/eligibility/${student.id}`)}
                        aria-label="Review eligibility"
                    />
                    <Button
                        label="Duplicate Check"
                        icon="pi pi-users"
                        className="p-button-warning"
                        onClick={() => navigate('/duplicates')}
                        aria-label="Check for duplicates"
                    />
                </div>
            </div>

            <TabView
                activeIndex={activeTab}
                onTabChange={(e) => setActiveTab(e.index)}
                aria-label="Student detail tabs"
            >
                <TabPanel
                    header="Overview"
                    leftIcon="pi pi-user mr-2"
                    aria-label="Student overview tab"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Basic Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">
                                            {student.firstName} {student.middleName && `${student.middleName} `}{student.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="font-medium">{student.dateOfBirth}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{getGenderLabel(student.gender)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Race/Ethnicity</p>
                                        <p className="font-medium">{getRaceLabel(student.raceEthnicity)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Student ID</p>
                                        <p className="font-medium">{student.studentId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last 4 of SSN</p>
                                        <p className="font-medium">••{student.lastFourSSN}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <Home className="h-5 w-5 mr-2" />
                                    Address Information
                                </h2>
                                <div className="space-y-2">
                                    <p className="font-medium">{student.addressLine1}</p>
                                    {student.addressLine2 && (
                                        <p className="font-medium">{student.addressLine2}</p>
                                    )}
                                    <p className="font-medium">
                                        {student.city}, {student.state} {student.zipCode}
                                    </p>
                                </div>
                            </Card>

                            <Card>
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <School className="h-5 w-5 mr-2" />
                                    School Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">County</p>
                                        <p className="font-medium">{getCountyLabel(student.countyNumber)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">LEA Number</p>
                                        <p className="font-medium">{student.sponsorLEANumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">School</p>
                                        <p className="font-medium">{getSchoolLabel(student.siteSchoolNumber)}</p>
                                    </div>
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-500">Enrollment Start Date</p>
                                        <p className="font-medium">{student.enrollmentStartDate}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Timeline & Programs */}
                        <div className="space-y-6">
                            <Card>
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Student Timeline
                                </h2>
                                <Timeline
                                    value={timelineEvents}
                                    content={(item) => (
                                        <div className="p-3">
                                            <p className="font-medium">{item.status}</p>
                                            <p className="text-sm text-gray-600">{item.date}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                        </div>
                                    )}
                                    opposite={(item) => (
                                        <div className={`text-${item.color}-600`}>
                                            <i className={`${item.icon} text-lg`}></i>
                                        </div>
                                    )}
                                    aria-label="Student timeline"
                                />
                            </Card>

                            <Card>
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    Program Enrollment
                                </h2>
                                {student.programs && student.programs.length > 0 ? (
                                    <div className="space-y-2">
                                        {student.programs.map((program: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center p-2 bg-blue-50 rounded"
                                            >
                                                <Badge value="✓" severity="success" className="mr-3" />
                                                <span className="text-sm">{program}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No programs enrolled</p>
                                )}
                            </Card>

                            <Card>
                                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Button
                                        label="View Eligibility Details"
                                        icon="pi pi-eye"
                                        className="p-button-outlined w-full justify-start"
                                        onClick={() => setActiveTab(1)}
                                        aria-label="View eligibility details"
                                    />
                                    <Button
                                        label="Generate Report"
                                        icon="pi pi-file-pdf"
                                        className="p-button-outlined w-full justify-start"
                                        onClick={() => toast.info('Report generation would open in production')}
                                        aria-label="Generate student report"
                                    />
                                    <Button
                                        label="Check for Updates"
                                        icon="pi pi-refresh"
                                        className="p-button-outlined w-full justify-start"
                                        onClick={() => toast.success('Checked for updates (Demo)')}
                                        aria-label="Check for student updates"
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel
                    header="Eligibility Details"
                    leftIcon="pi pi-check-circle mr-2"
                    aria-label="Eligibility details tab"
                >
                    <Card>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Eligibility Status</h3>
                                    <p className="text-gray-600">Current eligibility determinations</p>
                                </div>
                                <StatusBadge status={student.status as any} size="lg" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 rounded">
                                    <h4 className="font-medium mb-3">Program Eligibility</h4>
                                    {student.programs && student.programs.length > 0 ? (
                                        <div className="space-y-2">
                                            {student.programs.map((program: string, index: number) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span>{program}</span>
                                                    <Badge value="Eligible" severity="success" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">No program eligibility determined</p>
                                    )}
                                </div>

                                <div className="p-4 bg-gray-50 rounded">
                                    <h4 className="font-medium mb-3">Eligibility History</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Current Status</span>
                                            <span className="font-medium">{student.status}</span>
                                        </div>
                                        {student.eligibilityDate && (
                                            <div className="flex justify-between">
                                                <span className="text-sm">Determined On</span>
                                                <span className="font-medium">{student.eligibilityDate}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-sm">Last Updated</span>
                                            <span className="font-medium">{student.lastUpdated}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded">
                                <h4 className="font-medium text-blue-800 mb-2">Eligibility Notes</h4>
                                <p className="text-blue-700 text-sm">
                                    This student's eligibility status is based on simulated data.
                                    In a production system, this would show detailed eligibility determinations,
                                    documentation status, and review comments.
                                </p>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button
                                    label="Request Re-review"
                                    icon="pi pi-refresh"
                                    className="p-button-warning"
                                    onClick={() => toast.info('Re-review requested (Demo)')}
                                    aria-label="Request eligibility re-review"
                                />
                                <Button
                                    label="Update Eligibility"
                                    icon="pi pi-pencil"
                                    className="p-button-success"
                                    onClick={() => navigate(`/eligibility/${student.id}`)}
                                    aria-label="Update eligibility status"
                                />
                            </div>
                        </div>
                    </Card>
                </TabPanel>

                <TabPanel
                    header="Documents & Notes"
                    leftIcon="pi pi-file mr-2"
                    aria-label="Documents and notes tab"
                >
                    <Card>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Demo Documents</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                                            <div>
                                                <p className="font-medium">Enrollment Form</p>
                                                <p className="text-sm text-gray-500">Mock document • {student.enrollmentStartDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-green-600 mr-3" />
                                            <div>
                                                <p className="font-medium">Eligibility Application</p>
                                                <p className="text-sm text-gray-500">Mock document • {student.createdDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Notes & Comments</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-yellow-50 rounded">
                                        <p className="text-sm font-medium text-yellow-800">Demo Note</p>
                                        <p className="text-yellow-700 text-sm mt-1">
                                            This is a demonstration system. In production, this section would contain
                                            case notes, communication logs, and documentation tracking.
                                        </p>
                                        <p className="text-xs text-yellow-600 mt-2">Added by System • Demo Mode</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded">
                                <h4 className="font-medium mb-3">Add New Note</h4>
                                <textarea
                                    className="w-full p-3 border rounded mb-3"
                                    rows={3}
                                    placeholder="Enter notes or comments about this student..."
                                    aria-label="Add new note"
                                />
                                <Button
                                    label="Save Note (Demo)"
                                    icon="pi pi-save"
                                    onClick={() => toast.info('Note saved (Demo)')}
                                    aria-label="Save note"
                                />
                            </div>
                        </div>
                    </Card>
                </TabPanel>
            </TabView>

            {/* Demo Footer */}
            <Card className="bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-blue-800">Demo Information</h3>
                        <p className="text-sm text-blue-700">
                            This student detail view demonstrates comprehensive student information display.
                            All data is mock/fake for demonstration purposes.
                        </p>
                    </div>
                    <Button
                        label="View Mock Data"
                        icon="pi pi-code"
                        className="p-button-outlined p-button-sm"
                        onClick={() => {
                            console.log('Student data:', student);
                            toast.info('Student data logged to console');
                        }}
                        aria-label="View mock data in console"
                    />
                </div>
            </Card>
        </div>
    );
};