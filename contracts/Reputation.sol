// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CrimeReport.sol";

contract Reputation {
    CrimeReport public crimeReport;

    struct Validator {
        uint256 reputationScore;
    }

    mapping(address => Validator) public validators;
    uint256 public pointsPerSuccessfulValidation = 10;
    uint256 public pointsLostForFalseValidation = 10;

    event ReputationUpdated(address indexed validator, uint256 newScore);

    constructor(CrimeReport _crimeReport) {
        crimeReport = _crimeReport;
    }

    // Function to reward points if a report is validated as verified
    function rewardValidator(address validator) external {
        validators[validator].reputationScore += pointsPerSuccessfulValidation;
        emit ReputationUpdated(validator, validators[validator].reputationScore);
    }

    // Function to penalize points if a report is proven false
    function penalizeValidator(address validator) external {
        if (validators[validator].reputationScore >= pointsLostForFalseValidation) {
            validators[validator].reputationScore -= pointsLostForFalseValidation;
        } else {
            validators[validator].reputationScore = 0;  // Prevent negative scores
        }
        emit ReputationUpdated(validator, validators[validator].reputationScore);
    }

    // Function to get a validator's current reputation score
    function getReputation(address validator) external view returns (uint256) {
        return validators[validator].reputationScore;
    }
}
