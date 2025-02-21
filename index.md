# FireBreak Risk API Specifications

## Overview

This repository contains the open source specifications for the FireBreak Risk API system, a comprehensive API framework for wildfire risk assessment and mitigation scoring. These specifications are designed to standardize how wildfire risk data is collected, processed, and shared across different platforms and organizations.

## Repository Contents

- `/specs/swagger/` - OpenAPI/Swagger specifications
  - `photo-analysis-ingest.yaml` - Specification for ingesting photo analysis results
  - `risk-scoring.yaml` - Specification for risk score calculation and retrieval
- `/docs/` - Detailed documentation
  - `scoring-function.md` - Documentation for the risk scoring algorithm
  - `api-usage.md` - General API usage guidelines
- `/examples/` - Example implementations and code samples
- `/schemas/` - data dictionaries and JSON schemas for data validation
  - [Wildfire Standards](schemas/wildfire-standards.html) 
  - [Mitigation Data Dictionary](schemas/mitigation_data_dictionary.html) 
## Purpose

This open source initiative aims to:

1. Standardize wildfire risk assessment methodologies
2. Enable interoperability between different wildfire risk management systems
3. Promote collaboration in developing better risk assessment tools
4. Provide a foundation for building wildfire risk management applications

## Getting Started

### Prerequisites
- Basic understanding of REST APIs
- Familiarity with OpenAPI/Swagger specifications
- Knowledge of wildfire risk assessment concepts

### Quick Start
1. Review the data dictionary at and [Mitigation Data Dictionary](schemas/mitigation_data_dictionary.html) 
2. Review the Wildfire Standards Comparison at [Wildfire Standards](schemas/wildfire-standards.html) 
3. Review the  API specifications in the `/specs/swagger/` directory
4. Check out the example implementations in `/examples/` [Report UI](examples/report_ui.html) and [Mitigation Recommendations UI](examples/mitigation_recommendations_ui.html) 
5. Read through the documentation in `/docs/`

## Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

### Areas for Contribution
- Additional language implementations
- Enhanced documentation
- New risk assessment methodologies
- Bug fixes and improvements
- Test cases and validation

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- Create an issue in the GitHub repository
- Join our community discussions
- Check out the wiki for additional resources

## Citation

If you use these specifications in your research or projects, please cite:

```bibtex
@misc{firebreak-risk-api,
  title = {FireBreak Risk API Specifications},
  year = {2024},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/firebreak/risk-api-specs}}
}
```
