// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrimeReport {
    struct Report {
        uint256 id;
        address reporter;
        string content;
        string reportType;
        string location;
        string proof;
        string status;
        uint256 timestamp;
        uint256 validationCount;
        uint256 rejectionCount;
    }

    struct Validator {
        uint256 reputationScore;
    }

    uint256 public reportCount = 0;
    ERC20 public rewardToken;
    uint256 public rewardAmount;
    address[] public validators;
    uint256 public validatorThreshold;
    uint256 public pointsPerSuccessfulValidation = 10;
    uint256 public pointsLostForFalseValidation = 10;

    mapping(uint256 => Report) public reports;
    mapping(address => Validator) public validatorReputation;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ReportSubmitted(uint256 reportId, address indexed reporter);
    event ReportValidated(uint256 reportId, uint256 rewardAmount);
    event ReportRejected(uint256 reportId);
    event ReputationUpdated(address indexed validator, uint256 newScore);

    constructor(
        ERC20 _rewardToken,
        uint256 _rewardAmount,
        address[] memory _validators
    ) {
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
        validators = _validators;
        validatorThreshold = (_validators.length + 1) / 2;
    }

    modifier onlyValidator() {
        bool isValidator = false;
        for (uint256 i = 0; i < validators.length; i++) {
            if (validators[i] == msg.sender) {
                isValidator = true;
                break;
            }
        }
        require(isValidator, "Only validators can vote");
        _;
    }
    function addValidator(address newValidator) external {
        validators.push(newValidator);
    }

    function submitReport(
        string memory _content,
        string memory _reportType,
        string memory _location,
        string memory _proof
    ) external {
        reportCount++;
        reports[reportCount] = Report(
            reportCount,
            msg.sender,
            _content,
            _reportType,
            _location,
            _proof,
            "pending",
            block.timestamp,
            0,
            0
        );

        emit ReportSubmitted(reportCount, msg.sender);
    }

    function validateReport(uint256 reportId) external onlyValidator {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(
            keccak256(abi.encodePacked(report.status)) ==
                keccak256(abi.encodePacked("pending")),
            "Report already validated or rejected"
        );
        require(!hasVoted[reportId][msg.sender], "You have already voted");

        report.validationCount++;
        hasVoted[reportId][msg.sender] = true;

        if (report.validationCount > validatorThreshold) {
            report.status = "verified";
            rewardToken.transfer(report.reporter, rewardAmount);
            rewardValidator(msg.sender); // Update validator's reputation
            emit ReportValidated(reportId, rewardAmount);
        }
    }

    function rejectReport(uint256 reportId) external onlyValidator {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(
            keccak256(abi.encodePacked(report.status)) ==
                keccak256(abi.encodePacked("pending")),
            "Report already validated or rejected"
        );
        require(!hasVoted[reportId][msg.sender], "You have already voted");

        report.rejectionCount++;
        hasVoted[reportId][msg.sender] = true;

        if (report.rejectionCount > validatorThreshold) {
            report.status = "rejected";
            penalizeValidator(msg.sender); // Penalize validator if the report is rejected
            emit ReportRejected(reportId);
        }
    }

    // Function to reward points if a report is validated as verified
    function rewardValidator(address validator) internal {
        validatorReputation[validator]
            .reputationScore += pointsPerSuccessfulValidation;
        emit ReputationUpdated(
            validator,
            validatorReputation[validator].reputationScore
        );
    }

    function penalizeValidator(address validator) internal {
        validatorReputation[validator]
            .reputationScore -= pointsLostForFalseValidation;

        emit ReputationUpdated(
            validator,
            validatorReputation[validator].reputationScore
        );
    }

    function getReputation(address validator) external view returns (uint256) {
        return validatorReputation[validator].reputationScore;
    }
}
