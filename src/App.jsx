import React from 'react';
import EducationROICalculator from './components/EducationROICalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Trading Up: Education ROI Calculator
        </h1>
        <EducationROICalculator />
      </div>
    </div>
  );
}

export default App;