import React from 'react';

interface StatusBadgeProps {
  status: 'Draft' | 'Review' | 'Eligible' | 'Ineligible' | 'Duplicate' | 'Complete';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const baseClasses = "inline-flex items-center rounded-full font-medium";
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  const statusClasses = {
    Draft: "bg-gray-100 text-gray-800",
    Review: "bg-blue-100 text-blue-800",
    Eligible: "bg-green-100 text-green-800",
    Ineligible: "bg-red-100 text-red-800",
    Duplicate: "bg-orange-100 text-orange-800",
    Complete: "bg-purple-100 text-purple-800"
  };

  const ariaLabels = {
    Draft: "Draft status",
    Review: "Under review",
    Eligible: "Eligible",
    Ineligible: "Not eligible",
    Duplicate: "Potential duplicate",
    Complete: "Complete"
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${statusClasses[status]}`}
      role="status"
      aria-label={ariaLabels[status]}
    >
      {status}
    </span>
  );
};