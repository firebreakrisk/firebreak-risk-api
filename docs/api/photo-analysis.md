# Photo Analysis Ingest API

### Purpose
This API accepts results from photo analysis of properties to assess wildfire risk factors. It processes multiple photos per property and their associated detections of risk factors.

### Key Endpoints

#### POST /analysis/photo-results
Ingest photo analysis results for a property.

**Request Body Structure:**
```json
{
  "propertyId": "string",
  "correlationId": "string",
  "analysisDate": "2024-02-06T10:00:00Z",
  "photoDistanceFromPropertyFeet": 25.5,
  "photoResults": [
    {
      "photoId": "string",
      "photoURL": "string",
      "category": "HOME_HARDENING",
      "section": "ROOF_LITTER",
      "detections": [
        {
          "code": "RC1",
          "confidence": 0.95,
          "observations": ["string"]
        }
      ]
    }
  ]
}
```

### Response Codes
- 201: Successfully created
- 400: Invalid input
- 500: Internal server error

## Risk Scoring API

### Purpose
This API provides access to calculated risk scores based on processed photo analysis results.

### Key Endpoints

#### GET /scores/{propertyId}
Retrieve comprehensive risk assessment scores for a property.

**Response Structure:**
```json
{
  "propertyId": "string",
  "lastCorrelationID": "string",
  "assessmentDate": "2024-02-06T10:00:00Z",
  "overallScore": 45.5,
  "overallGrade": "C+",
  "riskLevel": "MODERATE",
  "categoryScores": {
    "homeHardening": {
      "score": 42.0,
      "weight": 0.6,
      "grade": "B"
      "riskLevel": "MODERATE"
    },
    "emberZone": {
      "score": 50.5,
      "weight": 0.4,
      "grade": "C"
      "riskLevel": "HIGH"
    }
  },
  "sectionScores": [
    {
      "section": "ROOF_LITTER",
      "code": "RC1",
      "score": 2,
      "mitigation": "Roof debris is regularly cleaned and maintained",
      "confidence": 0.95
    }
  ]
}
```

### Risk Level Categories
- LOW: 0-25
- MODERATE: 26-50
- HIGH: 51-75
- EXTREME: 76-100

### Category Weights
- Home Hardening: 60%
- Ember Zone: 40%

## Implementation Notes

1. All scores are normalized to a 0-100 scale where 0 represents the lowest risk and 100 represents the highest risk.
2. Confidence scores from photo analysis are used as weights in calculating section and category scores.
3. The API supports both real-time scoring and historical assessment retrieval through the optional assessmentDate parameter.

## Error Handling

The API uses standard HTTP status codes:
- 2xx: Success
- 4xx: Client errors (invalid input, missing parameters)
- 5xx: Server errors

## Security Considerations

1. All API endpoints require authentication (implementation details provided separately)
2. Rate limiting is applied to prevent abuse
3. Data is encrypted in transit using TLS 1.3
4. Property IDs should be treated as sensitive information
