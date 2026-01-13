import React from 'react';

interface ComplianceWrapperProps {
  children: React.ReactNode;
  label?: string;
  description?: string;
  role?: string;
  tabIndex?: number;
}

export const ComplianceWrapper: React.FC<ComplianceWrapperProps> = ({
  children,
  label,
  description,
  role,
  tabIndex
}) => {
  return (
    <div
      role={role}
      aria-label={label}
      aria-describedby={description ? 'compliance-description' : undefined}
      tabIndex={tabIndex}
      className="compliance-wrapper"
    >
      {description && (
        <div id="compliance-description" className="sr-only">
          {description}
        </div>
      )}
      {children}
    </div>
  );
};