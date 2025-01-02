import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EducationROICalculator = () => {
  const [inputs, setInputs] = useState({
    // Tuition costs
    universityTuition: 40000,
    communityCollegeTuition: 5000,
    tradeSchoolTuition: 15000,
    
    // Duration
    universityYears: 4,
    communityCollegeYears: 2,
    tradeSchoolYears: 1,
    
    // Starting salaries
    startingSalaryUniversity: 55000,
    startingSalaryTrade: 45000,
    startingSalaryCommunity: 45000,
    
    // Growth rates
    salaryGrowthRateUniversity: 5,
    salaryGrowthRateTrade: 5,
    salaryGrowthRateCommunity: 5,
    
    // Loan details
    loanInterestRate: 5.8,
    loanTerm: 10,
    percentFinancedUniversity: 80,
    percentFinancedCommunity: 50,
    percentFinancedTrade: 60,
    
    // Projection
    yearsToProject: 10
  });

  const calculateMonthlyLoanPayment = (principal, interestRate, years) => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
           / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const calculateNetWorthOverTime = () => {
    const data = [];
    
    for (let year = 0; year <= inputs.yearsToProject; year++) {
      const yearData = { year };
      
      // University path calculations
      const universityLoanAmount = inputs.universityTuition * inputs.universityYears 
                                 * (inputs.percentFinancedUniversity / 100);
      const universityMonthlyPayment = calculateMonthlyLoanPayment(
        universityLoanAmount, 
        inputs.loanInterestRate, 
        inputs.loanTerm
      );
      
      const universityEarnings = year > inputs.universityYears 
        ? inputs.startingSalaryUniversity * Math.pow(1 + inputs.salaryGrowthRateUniversity / 100, year - inputs.universityYears) 
        : 0;
      const universityCosts = year <= inputs.universityYears 
        ? inputs.universityTuition 
        : (year <= inputs.loanTerm ? universityMonthlyPayment * 12 : 0);
      yearData.university = year === 0 ? 0 
        : data[year - 1].university + universityEarnings - universityCosts;

      // Trade school path calculations
      const tradeLoanAmount = inputs.tradeSchoolTuition * inputs.tradeSchoolYears 
                            * (inputs.percentFinancedTrade / 100);
      const tradeMonthlyPayment = calculateMonthlyLoanPayment(
        tradeLoanAmount, 
        inputs.loanInterestRate, 
        inputs.loanTerm
      );
      
      const tradeEarnings = year > inputs.tradeSchoolYears 
        ? inputs.startingSalaryTrade * Math.pow(1 + inputs.salaryGrowthRateTrade / 100, year - inputs.tradeSchoolYears) 
        : 0;
      const tradeCosts = year <= inputs.tradeSchoolYears 
        ? inputs.tradeSchoolTuition 
        : (year <= inputs.loanTerm ? tradeMonthlyPayment * 12 : 0);
      yearData.trade = year === 0 ? 0 
        : data[year - 1].trade + tradeEarnings - tradeCosts;

      // Community college path calculations
      const communityLoanAmount = inputs.communityCollegeTuition * inputs.communityCollegeYears 
                                * (inputs.percentFinancedCommunity / 100);
      const communityMonthlyPayment = calculateMonthlyLoanPayment(
        communityLoanAmount, 
        inputs.loanInterestRate, 
        inputs.loanTerm
      );
      
      const communityEarnings = year > inputs.communityCollegeYears 
        ? inputs.startingSalaryCommunity * Math.pow(1 + inputs.salaryGrowthRateCommunity / 100, year - inputs.communityCollegeYears) 
        : 0;
      const communityCosts = year <= inputs.communityCollegeYears 
        ? inputs.communityCollegeTuition 
        : (year <= inputs.loanTerm ? communityMonthlyPayment * 12 : 0);
      yearData.community = year === 0 ? 0 
        : data[year - 1].community + communityEarnings - communityCosts;

      data.push(yearData);
    }
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const data = calculateNetWorthOverTime();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Compare Education Paths</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* University Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">University Tuition (per year)</label>
              <input
                type="number"
                name="universityTuition"
                value={inputs.universityTuition}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">University Starting Salary</label>
              <input
                type="number"
                name="startingSalaryUniversity"
                value={inputs.startingSalaryUniversity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Trade School Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Trade School Tuition (per year)</label>
              <input
                type="number"
                name="tradeSchoolTuition"
                value={inputs.tradeSchoolTuition}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trade School Starting Salary</label>
              <input
                type="number"
                name="startingSalaryTrade"
                value={inputs.startingSalaryTrade}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'bottom' }} 
              />
              <YAxis 
                label={{ value: 'Net Worth ($)', angle: -90, position: 'left' }} 
                tickFormatter={(value) => `$${(value / 1000)}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']} 
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="university" 
                stroke="#8884d8" 
                name="University Path" 
              />
              <Line 
                type="monotone" 
                dataKey="trade" 
                stroke="#82ca9d" 
                name="Trade School Path" 
              />
              <Line 
                type="monotone" 
                dataKey="community" 
                stroke="#ffc658" 
                name="Community College Path" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationROICalculator;