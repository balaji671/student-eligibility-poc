export const mockStudents = [
    {
        id: 'S1001',
        countyNumber: '001',
        sponsorLEANumber: '1001',
        siteSchoolNumber: '001',
        firstName: 'John',
        middleName: 'A',
        lastName: 'Smith',
        dateOfBirth: '2010-05-15',
        gender: 'M',
        raceEthnicity: 'WH',
        studentId: 'STU-2023-001',
        lastFourSSN: '1234',
        caseNumber: 'CASE-2023-001',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        enrollmentStartDate: '2023-08-20',
        programs: ['Free Lunch Program', 'Special Education Services'],
        status: 'Eligible',
        eligibilityDate: '2023-09-01',
        createdDate: '2023-08-15',
        lastUpdated: '2023-09-01'
    },
    {
        id: 'S1002',
        countyNumber: '001',
        sponsorLEANumber: '1001',
        siteSchoolNumber: '002',
        firstName: 'Maria',
        middleName: 'L',
        lastName: 'Garcia',
        dateOfBirth: '2011-03-22',
        gender: 'F',
        raceEthnicity: 'HI',
        studentId: 'STU-2023-002',
        lastFourSSN: '5678',
        caseNumber: '',
        addressLine1: '456 Oak Avenue',
        addressLine2: '',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        enrollmentStartDate: '2023-08-15',
        programs: ['English Language Learner (ELL)'],
        status: 'Review',
        eligibilityDate: '',
        createdDate: '2023-08-10',
        lastUpdated: '2023-08-28'
    },
    {
        id: 'S1003',
        countyNumber: '002',
        sponsorLEANumber: '1002',
        siteSchoolNumber: '001',
        firstName: 'Robert',
        middleName: 'J',
        lastName: 'Johnson',
        dateOfBirth: '2010-11-30',
        gender: 'M',
        raceEthnicity: 'BL',
        studentId: 'STU-2023-003',
        lastFourSSN: '9012',
        caseNumber: 'CASE-2023-002',
        addressLine1: '789 Pine Road',
        addressLine2: '',
        city: 'Otherville',
        state: 'CA',
        zipCode: '54321',
        enrollmentStartDate: '2023-08-25',
        programs: ['Free Lunch Program', 'Title I Services'],
        status: 'Draft',
        eligibilityDate: '',
        createdDate: '2023-08-20',
        lastUpdated: '2023-08-25'
    },
    {
        id: 'S1004',
        countyNumber: '001',
        sponsorLEANumber: '1001',
        siteSchoolNumber: '002',
        firstName: 'Sarah',
        middleName: 'M',
        lastName: 'Williams',
        dateOfBirth: '2011-07-14',
        gender: 'F',
        raceEthnicity: 'AS',
        studentId: 'STU-2023-004',
        lastFourSSN: '3456',
        caseNumber: '',
        addressLine1: '321 Elm Street',
        addressLine2: 'Unit 12',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        enrollmentStartDate: '2023-08-18',
        programs: ['Gifted and Talented'],
        status: 'Eligible',
        eligibilityDate: '2023-09-05',
        createdDate: '2023-08-12',
        lastUpdated: '2023-09-05'
    },
    {
        id: 'S1005',
        countyNumber: '003',
        sponsorLEANumber: '1003',
        siteSchoolNumber: '003',
        firstName: 'David',
        middleName: 'K',
        lastName: 'Brown',
        dateOfBirth: '2010-09-05',
        gender: 'M',
        raceEthnicity: 'TM',
        studentId: 'STU-2023-005',
        lastFourSSN: '7890',
        caseNumber: 'CASE-2023-003',
        addressLine1: '654 Maple Lane',
        addressLine2: '',
        city: 'Somewhere',
        state: 'CA',
        zipCode: '67890',
        enrollmentStartDate: '2023-08-22',
        programs: ['Reduced Price Lunch', 'Special Education Services'],
        status: 'Ineligible',
        eligibilityDate: '2023-09-02',
        createdDate: '2023-08-18',
        lastUpdated: '2023-09-02'
    }
];

export const mockDuplicates = [
    {
        id: 'DUP001',
        student1: {
            id: 'S1001',
            name: 'John A. Smith',
            dob: '2010-05-15',
            grade: '8',
            enrollmentDate: '2023-08-20',
            address: '123 Main St, Anytown, CA'
        },
        student2: {
            id: 'S1006',
            name: 'John Smith',
            dob: '2010-05-15',
            grade: '8',
            enrollmentDate: '2023-08-21',
            address: '123 Main Street, Anytown, CA'
        },
        confidence: 'High',
        matchingFields: ['First Name', 'Last Name', 'Date of Birth', 'Address'],
        detectedDate: '2023-09-10'
    },
    {
        id: 'DUP002',
        student1: {
            id: 'S1002',
            name: 'Maria L. Garcia',
            dob: '2011-03-22',
            grade: '7',
            enrollmentDate: '2023-08-15',
            address: '456 Oak Ave, Anytown, CA'
        },
        student2: {
            id: 'S1007',
            name: 'Maria Garcia',
            dob: '2011-03-22',
            grade: '7',
            enrollmentDate: '2023-08-16',
            address: '456 Oak Avenue, Anytown, CA'
        },
        confidence: 'Medium',
        matchingFields: ['First Name', 'Last Name', 'Date of Birth'],
        detectedDate: '2023-09-11'
    }
];

export const mockEligibilityReviews = [
    {
        studentId: 'S1002',
        studentName: 'Maria L. Garcia',
        submittedDate: '2023-08-28',
        reviewedBy: 'Admin User',
        reviewedDate: '',
        status: 'Pending',
        programs: ['English Language Learner (ELL)'],
        notes: 'Awaiting documentation'
    },
    {
        studentId: 'S1003',
        studentName: 'Robert J. Johnson',
        submittedDate: '2023-08-25',
        reviewedBy: '',
        reviewedDate: '',
        status: 'Draft',
        programs: ['Free Lunch Program', 'Title I Services'],
        notes: 'Incomplete application'
    }
];

export const mockReports = {
    summary: {
        totalStudents: 1247,
        eligible: 856,
        ineligible: 128,
        pendingReview: 263,
        duplicatesResolved: 42,
        uploadsProcessed: 15
    },
    byProgram: [
        { program: 'Free Lunch Program', eligible: 645, pending: 89 },
        { program: 'Reduced Price Lunch', eligible: 423, pending: 45 },
        { program: 'Special Education Services', eligible: 187, pending: 32 },
        { program: 'English Language Learner (ELL)', eligible: 234, pending: 56 },
        { program: 'Gifted and Talented', eligible: 156, pending: 23 },
        { program: 'Title I Services', eligible: 345, pending: 67 }
    ],
    bySchool: [
        { school: 'Elementary School (001)', students: 450, eligible: 320 },
        { school: 'Middle School (002)', students: 420, eligible: 280 },
        { school: 'High School (003)', students: 377, eligible: 256 }
    ]
};

export const getUserProfile = () => ({
    id: 'USER001',
    name: 'Demo Administrator',
    email: 'demo@lea.org',
    role: 'LEA Administrator',
    leaNumber: '1001',
    county: '001',
    permissions: ['view_students', 'edit_students', 'review_eligibility', 'generate_reports'],
    lastLogin: '2023-09-15 14:30:00',
    loginCount: 47
});