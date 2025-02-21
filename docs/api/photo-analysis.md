# Wildfire Risk Scoring Function

## Overview

The Wildfire Risk Scoring Function is a JavaScript module that calculates comprehensive wildfire risk scores based on photo analysis data. The function processes detection results from property photos and generates normalized risk scores, taking into account different risk categories and confidence levels.

## Core Functionality

The scoring system operates on two main categories: Home Hardening (60% weight) and Ember Zone (40% weight). Each category contains multiple sections that are evaluated based on photo analysis results. The function converts raw scores (0-3 scale) to a normalized 0-100 scale, where lower scores indicate better mitigation and higher scores indicate greater risk.

### Main Components

The module exports four key functions:

1. calculateRiskScores(photoAnalysisResults): The primary function that processes photo analysis data and returns a complete risk assessment.
2. calculateRiskLevel(score): Determines the risk level category based on a numeric score.
3. normalizeScore(score): Converts raw scores to the 0-100 scale.
4. calculateWeightedAverage(scores, weights): Computes weighted averages for multiple scores.

## Input Requirements

The function expects photo analysis results in the following structure:

```javascript
{
    propertyId: string,
    analysisDate: string (ISO date format),
    photoResults: [{
        photoId: string,
        category: "HOME_HARDENING" | "EMBER_ZONE",
        section: string,
        detections: [{
            code: string,
            value: number (0-3),
            confidence: number (0-1),
            observations?: string[]
        }]
    }]
}
```

## Error Handling

The function implements comprehensive error handling for various edge cases:

### Input Validation
- Checks for required fields (propertyId, analysisDate, photoResults)
- Validates score ranges (0-3 for raw scores, 0-1 for confidence)
- Verifies category values match expected enums

### Edge Cases

The function handles several edge cases gracefully:

1. Empty Photo Results
   - Returns null scores for categories with no data
   - Includes warning flag in response
   - Maintains overall score calculation for partial data

2. Invalid Confidence Scores
   - Defaults to 1.0 if confidence is missing
   - Clamps values to 0-1 range if out of bounds
   - Logs warning for invalid confidence values

3. Missing Detections
   - Skips sections with no valid detections
   - Maintains calculation integrity for available data
   - Includes missing sections in response with null values

4. Category Imbalance
   - Adjusts weights if one category has no data
   - Maintains relative weighting for available categories
   - Includes warning flag for significant imbalances

### Error Response Structure

When errors occur, the function returns an error object:

```javascript
{
    error: true,
    message: string,
    details: {
        code: string,
        location: string,
        invalidValue?: any
    },
    partialResults?: Object
}
```

## Performance Considerations

The function is optimized for performance with the following characteristics:

1. Time Complexity: O(n) where n is the total number of detections
2. Space Complexity: O(m) where m is the number of unique sections
3. Memory Usage: Approximately 1KB + 100B per detection

For optimal performance:
- Batch size should not exceed 1000 photos
- Pre-sort photos by category if possible
- Consider using Web Workers for large datasets

## Usage Examples

Basic usage:

```javascript
const { calculateRiskScores } = require('./scoring-function');

const results = calculateRiskScores({
    propertyId: "123",
    analysisDate: "2024-02-06T10:00:00Z",
    photoResults: [...]
});
```

With error handling:

```javascript
try {
    const results = calculateRiskScores(photoAnalysisResults);
    if (results.warnings) {
        console.warn('Calculation completed with warnings:', results.warnings);
    }
} catch (error) {
    console.error('Calculation failed:', error.message);
}
```

## Testing

The function includes comprehensive test coverage:

1. Unit tests for individual components
2. Integration tests for full calculation flow
3. Edge case validation
4. Performance benchmarks

Run tests using:

```bash
npm test
```

## Maintenance Notes

The scoring function requires periodic updates to align with latest risk assessment standards:

1. Category weights should be reviewed annually
2. Risk level thresholds may need adjustment based on historical data
3. New detection codes should be added to validation lists
4. Performance metrics should be monitored for large-scale deployments

## Dependencies

The function has minimal dependencies:

- Core JavaScript (ES6+)
- No external runtime dependencies
- Test framework dependencies (dev only)

## Version History

- 1.0.0: Initial release
- 1.0.1: Added edge case handling
- 1.1.0: Performance optimizations
- 1.1.1: Bug fixes for confidence scoring

## Contributing

When contributing to this function:

1. Follow the established error handling patterns
2. Maintain test coverage above 90%
3. Document any new edge cases
4. Update performance benchmarks
5. Follow semantic versioning
