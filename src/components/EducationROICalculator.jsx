// EducationROICalculator.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EducationROICalculator = () => {
  const [inputs, setInputs] = useState({
    universityTuition: 40000,
    tradeTuition: 15000,
    communityTuition: 5000,
    universitySalary: 55000,
    tradeSalary: 45000,
    communitySalary: 45000
  });

  const calculateROI = () => {
    const years = 10;
    const data = [];
    
    // Calculate yearly totals for each path
    for (let year = 0; year <= years; year++) {
      // University path: 4 years of tuition, then salary
      let universityTotal = year <= 4 ? 
        -inputs.universityTuition * year : 
        -inputs.universityTuition * 4 + inputs.universitySalary * (year - 4);

      // Trade school path: 2 years of tuition, then salary
      let tradeTotal = year <= 2 ? 
        -inputs.tradeTuition * year : 
        -inputs.tradeTuition * 2 + inputs.tradeSalary * (year - 2);

      // Community college path: 2 years of tuition, then salary
      let communityTotal = year <= 2 ? 
        -inputs.communityTuition * year : 
        -inputs.communityTuition * 2 + inputs.communitySalary * (year - 2);

      data.push({
        year,
        'University Path': universityTotal,
        'Trade School Path': tradeTotal,
        'Community College Path': communityTotal
      });
    }
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Education ROI Calculator</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            University Tuition (per year)
          </label>
          <input
            type="number"
            name="universityTuition"
            value={inputs.universityTuition}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Trade School Tuition (per year)
          </label>
          <input
            type="number"
            name="tradeTuition"
            value={inputs.tradeTuition}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Community College Tuition (per year)
          </label>
          <input
            type="number"
            name="communityTuition"
            value={inputs.communityTuition}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Starting Salary (University)
          </label>
          <input
            type="number"
            name="universitySalary"
            value={inputs.universitySalary}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Starting Salary (Trade)
          </label>
          <input
            type="number"
            name="tradeSalary"
            value={inputs.tradeSalary}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Starting Salary (Community)
          </label>
          <input
            type="number"
            name="communitySalary"
            value={inputs.communitySalary}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="w-full h-[400px]">
        <LineChart
          width={600}
          height={400}
          data={calculateROI()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year"
            label={{ value: 'Years', position: 'bottom' }}
          />
          <YAxis
            label={{ value: 'Return ($)', angle: -90, position: 'left' }}
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="University Path" 
            stroke="#8884d8" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="Trade School Path" 
            stroke="#82ca9d" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="Community College Path" 
            stroke="#ffc658" 
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default EducationROICalculator;