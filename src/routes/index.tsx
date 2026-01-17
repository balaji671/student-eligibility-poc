import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { StudentsList } from '../pages/StudentsList';
import { StudentCreate } from '../pages/StudentCreate';
import { StudentDetail } from '../pages/StudentDetail';
import { UploadStudents } from '../pages/UploadStudents';
import { DuplicateReview } from '../pages/DuplicateReview';
import { EligibilityReview } from '../pages/EligibilityReview';
import { Reports } from '../pages/Reports';
import { Profile } from '../pages/Profile';
import PrivateLayout from '../components/Layout/Layout';
import { useAppSelector } from '../hooks/reduxHooks';

interface AppRoutesProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const PublicRoute: React.FC<{
    isAuthenticated: boolean;
    children: React.ReactNode;
}> = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export const AppRoutes: React.FC<AppRoutesProps> = ({ onLogout }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>} />

            {isAuthenticated ? (
                <Route element={<PrivateLayout onLogout={onLogout} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<StudentsList />} />
                    <Route path="/students/new" element={<StudentCreate />} />
                    <Route path="/students/:id" element={<StudentDetail />} />
                    <Route path="/students/:id/edit" element={<StudentCreate />} />
                    <Route path="/students/upload" element={<UploadStudents />} />
                    <Route path="/duplicates" element={<DuplicateReview />} />
                    <Route path="/eligibility/:id" element={<EligibilityReview />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
};