import React, { useState, useEffect } from 'react';
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
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const RiskAssessment = () => {
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
        return { label: 'Best', color: 'bg-green-100 text-green-800' };
      case 1:
        return { label: 'Better', color: 'bg-blue-100 text-blue-800' };
      case 2:
        return { label: 'Good', color: 'bg-yellow-100 text-yellow-800' };
      case 3:
        return { label: 'Needs Mitigation', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getDescriptionFromCode = (category, code) => {
    // This would typically fetch from the CSV data
    const descriptions = {
      "fencing": {
        "SR4": "Combustible fences provide a path of fuel for fire to reach a home. Even for homes with non-combustible cladding, flames from a burning fence can threaten eaves and nearby windows."
      }
    };
    return descriptions[category]?.[code] || "No description available";
  };

  const risk = getRiskLevel(assessment.assessment.score);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl capitalize mb-2">
                {assessment.category} Assessment
              </CardTitle>
              <CardDescription>
                ID: {assessment.photoId}
              </CardDescription>
            </div>
            <Badge className={`${risk.color} text-sm px-3 py-1`}>
              {risk.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Risk Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                {getDescriptionFromCode(assessment.category, assessment.assessment.code)}
              </p>
            </div>

            {/* Detected Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Detected Features</h3>
              {assessment.assessment.detectedFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-gray-700">{feature.feature}</p>
                    <p className="text-sm text-gray-500">
                      Confidence: {Math.round(feature.confidence * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
              {assessment.assessment.recommendations.map((recommendation, index) => (
                <Alert key={index} className="mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>{recommendation}</AlertDescription>
                </Alert>
              ))}
            </div>

            {/* Analysis Metadata */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Model Version</p>
                  <p className="font-medium">{assessment.analysisMetadata.modelVersion}</p>
                </div>
                <div>
                  <p className="text-gray-500">Quality Score</p>
                  <p className="font-medium">
                    {Math.round(assessment.analysisMetadata.qualityScore * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Processing Time</p>
                  <p className="font-medium">{assessment.analysisMetadata.processingTime}ms</p>
                </div>
                <div>
                  <p className="text-gray-500">Confidence</p>
                  <p className="font-medium">
                    {Math.round(assessment.assessment.confidence * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;