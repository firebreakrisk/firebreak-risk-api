import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Shield,
  Home,
  Fence,
  Trees,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Camera
} from 'lucide-react';

const RiskAssessment = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // Example assessment data
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
          bounds: {
            x: 150,
            y: 400,
            width: 200,
            height: 600
          }
        }
      ],
      recommendations: [
        "Install a non-combustible fence transition (e.g. metal or masonry) within 5' of the home",
        "Apply a fire-resistant coating or replace wooden panels/gate with ignition-resistant materials"
      ]
    },
    analysisMetadata: {
      processingTime: 1324,
      modelVersion: "1.2.0",
      qualityScore: 0.88,
      warnings: []
    }
  };

  const getRiskLevel = (score) => {
    switch (score) {
      case 0:
        return { 
          label: 'Best', 
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle2,
          progressColor: 'bg-green-500'
        };
      case 1:
        return { 
          label: 'Better', 
          color: 'bg-blue-100 text-blue-800',
          icon: Shield,
          progressColor: 'bg-blue-500'
        };
      case 2:
        return { 
          label: 'Good', 
          color: 'bg-yellow-100 text-yellow-800',
          icon: AlertTriangle,
          progressColor: 'bg-yellow-500'
        };
      case 3:
        return { 
          label: 'Needs Mitigation', 
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          progressColor: 'bg-red-500'
        };
      default:
        return { 
          label: 'Unknown', 
          color: 'bg-gray-100 text-gray-800',
          icon: AlertTriangle,
          progressColor: 'bg-gray-500'
        };
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'fencing': Fence,
      'home': Home,
      'vegetation': Trees
    };
    return icons[category] || Shield;
  };

  const risk = getRiskLevel(assessment.assessment.score);
  const CategoryIcon = getCategoryIcon(assessment.category);
  const RiskIcon = risk.icon;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6 overflow-hidden">
        <div className={`w-full h-2 ${risk.progressColor}`} />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${risk.color}`}>
                <CategoryIcon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl capitalize mb-2 flex items-center gap-2">
                  {assessment.category} Assessment
                  <Badge className={`${risk.color} text-sm px-3 py-1`}>
                    {risk.label}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  ID: {assessment.photoId}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Confidence</span>
                <Progress value={assessment.assessment.confidence * 100} className="w-32" />
                <span className="text-sm font-medium">
                  {Math.round(assessment.assessment.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Risk Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
              <RiskIcon className={`w-12 h-12 ${risk.color.replace('bg-', 'text-').replace('-100', '-500')}`} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-2 rounded ${
                        level <= assessment.assessment.score
                          ? risk.progressColor
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-600">
                  Current risk level indicates immediate attention required
                </p>
              </div>
            </div>

            {/* Detected Features with Visual Indicators */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Detected Features</h3>
              {assessment.assessment.detectedFeatures.map((feature, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{feature.feature}</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Detection Confidence</span>
                      <Progress value={feature.confidence * 100} className="w-32" />
                      <span className="text-sm font-medium">
                        {Math.round(feature.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Recommendations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recommended Actions</h3>
              {assessment.assessment.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden transition-all duration-200"
                >
                  <button
                    className={`w-full p-4 text-left flex items-center justify-between ${
                      selectedRecommendation === index ? 'bg-gray-50' : 'bg-white'
                    }`}
                    onClick={() => setSelectedRecommendation(
                      selectedRecommendation === index ? null : index
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">{recommendation}</span>
                    </div>
                    {selectedRecommendation === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {selectedRecommendation === index && (
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">Priority:</span>
                        <Badge className="bg-red-100 text-red-800">High</Badge>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Expandable Metadata Section */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                {showDetails ? <ChevronUp /> : <ChevronDown />}
                <span>Analysis Details</span>
              </button>
              
              {showDetails && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Model Version</p>
                    <p className="font-medium">{assessment.analysisMetadata.modelVersion}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Quality Score</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={assessment.analysisMetadata.qualityScore * 100} 
                        className="w-20" 
                      />
                      <span className="font-medium">
                        {Math.round(assessment.analysisMetadata.qualityScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Processing Time</p>
                    <p className="font-medium">{assessment.analysisMetadata.processingTime}ms</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;