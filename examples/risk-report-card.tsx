import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, Info } from 'lucide-react';

const RiskReportCard = () => {
  const score = 3; // Current assessment score
  const maxScore = 3; // Worst possible score
  const category = "Deck Protection";
  
  const scoreDescriptions = {
    0: { label: 'Optimal', color: 'text-green-600', bg: 'bg-green-50', description: 'Best practices implemented' },
    1: { label: 'Better', color: 'text-blue-600', bg: 'bg-blue-50', description: 'Good mitigation measures' },
    2: { label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50', description: 'Basic mitigation in place' },
    3: { label: 'Mitigation Needed', color: 'text-red-600', bg: 'bg-red-50', description: 'Immediate action required' }
  };

  const getScoreDetails = (score) => scoreDescriptions[score] || scoreDescriptions[3];

  const ScoreIndicator = ({ value, max }) => {
    const percentage = ((max - value) / max) * 100;
    const details = getScoreDetails(value);
    
    return (
      <div className="relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
        <div 
          className="absolute left-0 bottom-0 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2"
        />
        <div 
          className="absolute left-0 bottom-2 w-1 h-6 bg-black"
          style={{ left: `${percentage}%` }}
        />
        <div 
          className="absolute left-0 bottom-8 px-2 py-1 rounded transform -translate-x-1/2 text-sm font-medium"
          style={{ left: `${percentage}%` }}
        >
          Score: {value}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="w-full">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-10 h-10 text-blue-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Firebreak Risk Report</CardTitle>
                <p className="text-gray-500">Assessment Date: February 4, 2025</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Risk Score Assessment</h3>
            <ScoreIndicator value={score} max={maxScore} />
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 mt-1 text-blue-600" />
                <div>
                  <p className="font-medium">Score Interpretation</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Scores range from 0 (optimal) to 3 (needs mitigation). Your score of {score} indicates 
                    {' '}{getScoreDetails(score).description}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Assessment Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Category</span>
                  <span>{category}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Assessment Code</span>
                  <span>SR1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Confidence Score</span>
                  <span>90%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Risk Level</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreDetails(score).bg} ${getScoreDetails(score).color}`}>
                    {getScoreDetails(score).label}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="w-4 h-4" />
                <AlertTitle>Critical Issues Detected</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Combustible, open deck construction</li>
                    <li>Accumulated debris underneath</li>
                    <li>No ember-resistant barriers</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Required Mitigations</h3>
            <div className="space-y-3">
              {[
                {
                  action: "Clear out leaf litter, pine needles, and any flammable debris from under the deck",
                  impact: "Reduces immediate fire risk"
                },
                {
                  action: "Install or extend non-combustible gravel or concrete barriers around/under the deck",
                  impact: "Creates defensive space"
                },
                {
                  action: "Add a 1/8\" metal mesh skirt or ignition-resistant enclosure",
                  impact: "Blocks ember intrusion"
                }
              ].map((rec, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded">
                  <div className="flex items-start space-x-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{rec.action}</p>
                      <p className="text-sm text-blue-600 mt-1">{rec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Assessment ID: photo-002</span>
              </div>
              <span className="text-sm text-gray-500">
                Model Version: 1.2.0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskReportCard;