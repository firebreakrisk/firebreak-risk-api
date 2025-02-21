/**
 * Constants for risk scoring
 */
const RISK_LEVELS = {
    LOW: { min: 0, max: 25 },
    MODERATE: { min: 26, max: 50 },
    HIGH: { min: 51, max: 75 },
    EXTREME: { min: 76, max: 100 }
};

const CATEGORY_WEIGHTS = {
    HOME_HARDENING: 0.6,
    EMBER_ZONE: 0.4
};

/**
 * Calculate risk level based on numeric score
 * @param {number} score - Numeric score between 0-100
 * @returns {string} Risk level category
 */
function calculateRiskLevel(score) {
    for (const [level, range] of Object.entries(RISK_LEVELS)) {
        if (score >= range.min && score <= range.max) {
            return level;
        }
    }
    return 'EXTREME';
}

/**
 * Normalize section scores to 0-100 scale
 * @param {number} score - Raw score (0-3)
 * @returns {number} Normalized score (0-100)
 */
function normalizeScore(score) {
    return (100 - (score / 3) * 100);
}

/**
 * Calculate weighted average of scores
 * @param {Array<number>} scores - Array of scores
 * @param {Array<number>} weights - Array of weights
 * @returns {number} Weighted average
 */
function calculateWeightedAverage(scores, weights) {
    const sum = scores.reduce((acc, score, i) => acc + score * weights[i], 0);
    const weightSum = weights.reduce((acc, weight) => acc + weight, 0);
    return sum / weightSum;
}

/**
 * Main scoring function to process photo analysis results
 * @param {Object} photoAnalysisResults - Results from photo analysis API
 * @returns {Object} Comprehensive risk assessment
 */
function calculateRiskScores(photoAnalysisResults) {
    const { propertyId, analysisDate, photoResults } = photoAnalysisResults;
    
    // Initialize category containers
    const categoryScores = {
        HOME_HARDENING: { scores: [], weights: [] },
        EMBER_ZONE: { scores: [], weights: [] }
    };

    // Process each photo result
    const sectionScores = photoResults.flatMap(result => {
        return result.detections.map(detection => {
            // Convert raw score (0-3) to normalized score (0-100)
            const normalizedScore = normalizeScore(detection.value);
            
            // Add to category scores
            categoryScores[result.category].scores.push(normalizedScore);
            categoryScores[result.category].weights.push(detection.confidence);

            return {
                section: result.section,
                code: detection.code,
                score: detection.value,
                mitigation: detection.observations?.join(', ') || '',
                confidence: detection.confidence
            };
        });
    });

    // Calculate category scores
    const finalCategoryScores = {
        homeHardening: {
            score: calculateWeightedAverage(
                categoryScores.HOME_HARDENING.scores,
                categoryScores.HOME_HARDENING.weights
            ),
            weight: CATEGORY_WEIGHTS.HOME_HARDENING,
            riskLevel: calculateRiskLevel(categoryScores.HOME_HARDENING.score)
        },
        emberZone: {
            score: calculateWeightedAverage(
                categoryScores.EMBER_ZONE.scores,
                categoryScores.EMBER_ZONE.weights
            ),
            weight: CATEGORY_WEIGHTS.EMBER_ZONE,
            riskLevel: calculateRiskLevel(categoryScores.EMBER_ZONE.score)
        }
    };

    // Calculate overall score
    const overallScore = calculateWeightedAverage(
        [finalCategoryScores.homeHardening.score, finalCategoryScores.emberZone.score],
        [CATEGORY_WEIGHTS.HOME_HARDENING, CATEGORY_WEIGHTS.EMBER_ZONE]
    );

    return {
        propertyId,
        assessmentDate,
        overallScore,
        riskLevel: calculateRiskLevel(overallScore),
        categoryScores: finalCategoryScores,
        sectionScores
    };
}

module.exports = {
    calculateRiskScores,
    calculateRiskLevel,
    normalizeScore,
    calculateWeightedAverage
};