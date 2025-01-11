// EducationROICalculator.jsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EducationROICalculator = () => {
  // MAXX Potential constants
  const maxxInitialSalary = 31200; // $15/hr = ~$31,200/year
  const maxxFullSalary = 60000;    // $60,000/year after apprenticeship

  const [inputs, setInputs] = useState({
    universityTuition: 18000,
    communityTuition: 5000,
    universitySalary: 65000,
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

      // MAXX Potential path: Earning from day 1, no tuition
      let maxxTotal;
      if (year < 1.25) { // 15 months apprenticeship
        maxxTotal = maxxInitialSalary * year;
      } else {
        maxxTotal = (maxxInitialSalary * 1.25) + (maxxFullSalary * (year - 1.25));
      }

      // Community college path: 2 years of tuition, then salary
      let communityTotal = year <= 2 ? 
        -inputs.communityTuition * year : 
        -inputs.communityTuition * 2 + inputs.communitySalary * (year - 2);

      data.push({
        year,
        'University': universityTotal,
        'MAXX Apprenticeship': maxxTotal,
        'Community College': communityTotal
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
      <div className="mb-8">
        <img 
          src="/maxx-logo.png" 
          alt="MAXX Potential" 
          className="h-12 w-auto mb-10" 
        />
        <h1 className="text-2xl font-bold">Career Pathways ROI Calculator</h1>
      </div>
      
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
            Post Bachelor's Degree Starting Salary
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
            Post Associates Degree Starting Salary
          </label>
          <input
            type="number"
            name="communitySalary"
            value={inputs.communitySalary}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">MAXX Potential Apprenticeship:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>$15/hr ($31,200/year) during 15-month apprenticeship</li>
            <li>$60,000/year after completing apprenticeship</li>
            <li>No tuition costs</li>
            <li>Earning from day one</li>
          </ul>
        </div>
      </div>

      <div className="w-full h-96">
        <h3 className="text-lg font-medium mb-4">10-Year ROI Comparison of Career Pathways</h3>
        <LineChart
          width={600}
          height={500}
          data={calculateROI()}
          margin={{ top: 15, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year"
            label={{ value: 'Years', position: 'bottom', offset: 15 }}
          />
          <YAxis
            label={{ value: 'Return ($)', angle: -90, position: 'left' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={100}
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend 
            layout="horizontal"
  verticalAlign="top"
  align="center"
  />
          <Line 
            type="monotone" 
            dataKey="University" 
            stroke="#8884d8" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="MAXX Apprenticeship" 
            stroke="#C41E3A" 
            strokeWidth={3}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="Community College" 
            stroke="#ffc658" 
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default EducationROICalculator;