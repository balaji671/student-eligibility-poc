import React from 'react';
import { Card } from 'primereact/card';

interface MockChartProps {
    type: 'line' | 'bar' | 'doughnut' | 'pie';
    title?: string;
}

export const MockChart: React.FC<MockChartProps> = ({ type, title }) => {
    const renderChart = () => {
        switch (type) {
            case 'doughnut':
                return (
                    <div className="relative w-48 h-48 mx-auto">
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                        <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-orange-500" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-sm text-gray-600">Mock Data</p>
                            </div>
                        </div>
                    </div>
                );
            case 'line':
                return (
                    <div className="h-48 relative">
                        <div className="absolute inset-0 flex items-end">
                            {[30, 50, 40, 70, 60, 90, 80].map((height, index) => (
                                <div
                                    key={index}
                                    className="flex-1 mx-0.5 bg-blue-500 rounded-t"
                                    style={{ height: `${height}%` }}
                                    aria-hidden="true"
                                ></div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300"></div>
                    </div>
                );
            default:
                return (
                    <div className="h-48 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg font-semibold">Mock Chart</p>
                            <p className="text-sm text-gray-600">({type} chart placeholder)</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            className="mock-chart"
            role="img"
            aria-label={`Mock ${type} chart for demonstration purposes`}
        >
            {renderChart()}
            <p className="text-xs text-gray-500 text-center mt-4">
                This is a mock visualization. Real charts would display actual data.
            </p>
        </div>
    );
};