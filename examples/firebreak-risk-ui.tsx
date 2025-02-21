import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Shield,
  Home,
  Fence,
  Trees,
  ArrowRight,
  Camera,
  Flame,
  CheckCircle,
  XCircle,
  Clock,
  AlertOctagon,
  ThermometerSun,
  Wind,
  Eye
} from 'lucide-react';

const RiskAssessment = () => {
  const [expandedSection, setExpandedSection] = useState('features');

  const assessment = {
    photoId: "photo-001",
    correlationId: "example-correlation-123",
    category: "fencing",
    assessment: {
      code: "SR4",
      score: 3,
      confidence: 0.90,
      detectedFeatures: [
        {
          feature: "Wooden fence attached to the home",
          confidence: 0.85,
          impact: "Critical",
          timeToFix: "2-3 hours",
          cost: "$$",
          bounds: {
            x: 150,
            y: 400,
            width: 200,
            height: 600
          }
        }
      ],
      recommendations: [
        {
          action: "Install a non-combustible fence transition within 5' of the home",
          priority: "High",
          effort: "Medium",
          impact: "Significant",
          timeEstimate: "2-3 hours",
          cost: "$$"
        },
        {
          action: "Apply fire-resistant coating to wooden panels",
          priority: "Medium",
          effort: "Low",
          impact: "Moderate",
          timeEstimate: "1-2 hours",
          cost: "$"
        }
      ]
    },
    analysisMetadata: {
      processingTime: 1324,
      modelVersion: "1.2.0",
      qualityScore: 0.88,
      warnings: []
    }
  };

  const getRiskColors = (score) => {
    const colors = {
      0: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        progress: 'bg-emerald-500'
      },
      1: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        progress: 'bg-blue-500'
      },
      2: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        progress: 'bg-amber-500'
      },
      3: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        progress: 'bg-red-500'
      }
    };
    return colors[score] || colors[3];
  };

  const colors = getRiskColors(assessment.assessment.score);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Top Risk Banner */}
      <div className={`${colors.bg} ${colors.text} p-6 rounded-lg mb-6 border ${colors.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${colors.bg} border-2 ${colors.border}`}>
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Critical Risk Detected</h2>
              <p className="text-lg">Immediate action recommended</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm mb-1">Risk Score</div>
            <div className="text-3xl font-bold">3/3</div>
          </div>
        </div>
      </div>

      {/* Main Assessment Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-gray-500" />
            <CardTitle className="text-xl">Detection Details</CardTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Confidence Score */}
            <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Analysis Confidence</span>
                <span className="font-bold">{Math.round(assessment.assessment.confidence * 100)}%</span>
              </div>
              <Progress value={assessment.assessment.confidence * 100} className="h-2" />
            </div>
            
            {/* Time Sensitivity */}
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="font-medium">Time Sensitive</span>
              </div>
              <p className="text-sm text-amber-700 mt-1">Action needed within 7 days</p>
            </div>

            {/* Weather Risk */}
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-orange-600" />
                <span className="font-medium">High Fire Risk Season</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">Current weather conditions increase risk</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Detected Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              Critical Issues Found
            </h3>
            {assessment.assessment.detectedFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h4 className="font-semibold">{feature.feature}</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-9">
                  <div>
                    <div className="text-sm text-gray-500">Impact</div>
                    <div className="font-medium">{feature.impact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time to Fix</div>
                    <div className="font-medium">{feature.timeToFix}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Cost</div>
                    <div className="font-medium">{feature.cost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Plan */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Recommended Action Plan
            </h3>
            {assessment.assessment.recommendations.map((rec, index) => (
              <div key={index} 
                className="bg-white border rounded-lg p-4 mb-4 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  </div>
                  <h4 className="font-semibold">{rec.action}</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-11">
                  <div>
                    <div className="text-sm text-gray-500">Priority</div>
                    <Badge className={`mt-1 ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Impact</div>
                    <div className="font-medium">{rec.impact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium">{rec.timeEstimate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Cost</div>
                    <div className="font-medium">{rec.cost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Review Findings</h4>
                <p className="text-sm text-gray-600">Check the detected issues and recommended actions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Schedule Work</h4>
                <p className="text-sm text-gray-600">Plan the implementation of recommended actions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Track Progress</h4>
                <p className="text-sm text-gray-600">Monitor completion of safety improvements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;