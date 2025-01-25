// App.jsx
import React from 'react';
import EducationROICalculator from './components/EducationROICalculator';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="container mx-auto p-4">
      <EducationROICalculator />
      {/* <Analytics /> */}
    </div>
  );
}

export default App;