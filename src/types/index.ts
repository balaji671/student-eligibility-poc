export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  grade: string;
  status: 'Draft' | 'Review' | 'Eligible' | 'Ineligible';
  flags?: string[];
  householdIncome?: string;
  programs?: string[];
  enrollmentDate?: string;
}

export interface DuplicateCandidate {
  id: string;
  student1: Student;
  student2: Student;
  confidence: 'High' | 'Medium' | 'Low';
  matchingFields: string[];
}

export interface EligibilityResult {
  studentId: string;
  status: 'Eligible' | 'Not Eligible';
  reason: string;
  reviewedBy?: string;
  reviewedDate?: string;
}

export interface UploadResult {
  totalRows: number;
  processed: number;
  flagged: number;
  duplicatesFound: number;
}