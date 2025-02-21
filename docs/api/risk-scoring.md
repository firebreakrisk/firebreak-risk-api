openapi: 3.0.0
info:
  title: FireBreak Risk Mitigation Scoring API - Input
  version: '1.0.0'
  description: API for submitting wildfire risk mitigation assessments and scores
servers:
  - url: https://api.firebreakrisk.com/scoring/v1
    description: Production server

paths:
  /mitigation/assessment:
    post:
      summary: Submit a new mitigation assessment
      description: Creates a new mitigation assessment for a property
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MitigationAssessment'
      responses:
        '201':
          description: Assessment created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  correlationId:
                    type: string
                    description: Unique identifier for the created assessment
        '400':
          description: Invalid input
        '500':
          description: Internal server error

  /mitigation/assessment/{correlationId}:
    put:
      summary: Update an existing mitigation assessment
      description: Updates an existing mitigation assessment with new data
      parameters:
        - name: correlationId
          in: path
          required: true
          schema:
            type: string
          description: ID of the assessment to update
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MitigationAssessment'
      responses:
        '200':
          description: Assessment updated successfully
        '400':
          description: Invalid input
        '404':
          description: Assessment not found
        '500':
          description: Internal server error

components:
  schemas:
    MitigationAssessment:
      type: object
      required:
        - propertyId
        - assessmentDate
        - assessor
        - propertyCharacteristics
        - mitigationMeasures
      properties:
        propertyId:
          type: string
          description: Unique identifier for the property
        assessmentDate:
          type: string
          format: date
          description: Date of the assessment
        assessor:
          type: object
          properties:
            id:
              type: string
              description: Assessor's unique identifier
            name:
              type: string
              description: Name of the assessor
            certification:
              type: string
              description: Certification level or type
        propertyCharacteristics:
          type: object
          properties:
            propertyType:
              type: string
              enum: [RESIDENTIAL, COMMERCIAL, AGRICULTURAL, INDUSTRIAL]
            constructionType:
              type: string
              description: Primary construction material and method
            yearBuilt:
              type: integer
              description: Year the primary structure was built
            totalAcreage:
              type: number
              format: float
              description: Total property acreage
            topography:
              type: object
              properties:
                slope:
                  type: number
                  description: Average slope percentage
                aspect:
                  type: string
                  description: Primary aspect direction
        mitigationMeasures:
          type: array
          items:
            type: object
            required:
              - category
              - measures
            properties:
              category:
                type: string
                enum: [VEGETATION_MANAGEMENT, STRUCTURAL, ACCESS_EGRESS, WATER_AVAILABILITY]
              measures:
                type: array
                items:
                  type: object
                  properties:
                    measureId:
                      type: string
                      description: Unique identifier for the measure
                    status:
                      type: string
                      enum: [COMPLETED, IN_PROGRESS, PLANNED, NOT_APPLICABLE]
                    completionDate:
                      type: string
                      format: date
                      description: Date when measure was completed
                    notes:
                      type: string
                      description: Additional notes or observations
        photos:
          type: array
          items:
            type: object
            properties:
              photoId:
                type: string
                description: Unique identifier for the photo
              category:
                type: string
                description: Category or type of photo
              timestamp:
                type: string
                format: date-time
                description: When the photo was taken
              gpsCoordinates:
                type: object
                properties:
                  latitude:
                    type: number
                    format: float
                  longitude:
                    type: number
                    format: float
