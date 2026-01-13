import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray';
    message?: string;
    fullScreen?: boolean;
    ariaLabel?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'blue',
    message = 'Loading...',
    fullScreen = false,
    ariaLabel = 'Loading content'
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const colorClasses = {
        blue: 'border-blue-600',
        white: 'border-white',
        gray: 'border-gray-600'
    };

    const spinner = (
        <div
            className="flex flex-col items-center justify-center"
            role="status"
            aria-label={ariaLabel}
        >
            <div
                className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
                aria-hidden="true"
            />
            {message && (
                <p className="mt-3 text-sm text-gray-600">{message}</p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div
                className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50"
                role="alert"
                aria-live="assertive"
                aria-busy="true"
            >
                {spinner}
            </div>
        );
    }

    return spinner;
};

// Inline loading indicator
export const InlineLoading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
    return (
        <div className="inline-flex items-center" role="status">
            <div
                className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"
                aria-hidden="true"
            />
            <span className="text-sm text-gray-600">{message}</span>
        </div>
    );
};

// Skeleton loader for content
export const SkeletonLoader: React.FC<{
    type?: 'text' | 'card' | 'table' | 'form';
    count?: number;
    className?: string;
}> = ({ type = 'text', count = 1, className = '' }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'text':
                return (
                    <div className="animate-pulse space-y-3">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                );

            case 'card':
                return (
                    <div className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded"></div>
                        <div className="mt-4 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div className="animate-pulse space-y-3">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                );

            case 'form':
                return (
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className={className}
            role="status"
            aria-label="Content loading"
        >
            {renderSkeleton()}
            <span className="sr-only">Loading content...</span>
        </div>
    );
};

// Loading overlay with cancel option
export const LoadingOverlay: React.FC<{
    message?: string;
    onCancel?: () => void;
    progress?: number;
}> = ({ message = 'Processing...', onCancel, progress }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-label="Loading overlay"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>

                    <p className="text-lg font-medium text-gray-900 mb-2">{message}</p>

                    {progress !== undefined && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            ></div>
                        </div>
                    )}

                    <p className="text-sm text-gray-600 text-center mb-4">
                        Please wait while we process your request...
                    </p>

                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                            aria-label="Cancel loading"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};