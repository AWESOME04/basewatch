// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrimeReport {
    struct Report {
        uint256 id;
        string reporter;
        string content;
        string reportType;
        string proof;
        string status;
        uint256 timestamp;
        uint256 validationCount;
        uint256 rejectionCount;
        uint256 likes;
        string latitude;
        string longitude;
    }

    struct Validator {
        uint256 reputationScore;
    }

    uint256 public reportCount = 0;
    ERC20 public rewardToken;
    uint256 public rewardAmount;
    string[] public validators;
    uint256 public validatorThreshold;
    uint256 public pointsPerSuccessfulValidation = 10;
    uint256 public pointsLostForFalseValidation = 10;

    mapping(uint256 => Report) public reports;
    mapping(string => Validator) public validatorReputation;
    mapping(uint256 => mapping(string => bool)) public hasVoted;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    mapping(uint256 => mapping(string => bool)) public voteCast;
    mapping(string => address) public basenameToAddress;

    event ReportSubmitted(uint256 reportId, string indexed reporter);
    event ReportValidated(uint256 reportId, uint256 rewardAmount);
    event ReportRejected(uint256 reportId);
    event ReputationUpdated(string indexed validator, uint256 newScore);
    event ReportLiked(uint256 reportId, address indexed liker);

    constructor(
        ERC20 _rewardToken,
        uint256 _rewardAmount,
        string[] memory _validators
    ) {
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
        validators = _validators;
        validatorThreshold = (_validators.length + 1) / 2;
    }

    modifier onlyValidator(string memory basename) {
        require(isValidator(basename), "Only validators can vote");
        _;
    }

    function isValidator(string memory basename) public view returns (bool) {
        for (uint256 i = 0; i < validators.length; i++) {
            if (
                keccak256(abi.encodePacked(validators[i])) ==
                keccak256(abi.encodePacked(basename))
            ) {
                return true;
            }
        }
        return false;
    }

    function addValidator(
        string memory newValidator,
        address validatorAddress
    ) external {
        validators.push(newValidator);
        basenameToAddress[newValidator] = validatorAddress;
    }

    function submitReport(
        string memory _reporter,
        string memory _content,
        string memory _reportType,
        string memory _proof,
        string memory _latitude,
        string memory _longitude
    ) external {
        reportCount++;
        reports[reportCount] = Report(
            reportCount,
            _reporter,
            _content,
            _reportType,
            _proof,
            "pending",
            block.timestamp,
            0,
            0,
            0,
            _latitude,
            _longitude
        );

        emit ReportSubmitted(reportCount, _reporter);
    }

    function getAllReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](reportCount);
        for (uint256 i = 1; i <= reportCount; i++) {
            allReports[i - 1] = reports[i];
        }
        return allReports;
    }

    function validateReport(
        uint256 reportId,
        string memory basename
    ) external onlyValidator(basename) {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(
            keccak256(abi.encodePacked(report.status)) ==
                keccak256(abi.encodePacked("pending")),
            "Report already validated or rejected"
        );
        require(!hasVoted[reportId][basename], "You have already voted");

        report.validationCount++;
        hasVoted[reportId][basename] = true;
        voteCast[reportId][basename] = true;

        if (report.validationCount > validatorThreshold) {
            report.status = "verified";
            rewardToken.transfer(
                basenameToAddress[report.reporter],
                rewardAmount
            );

            for (uint256 i = 0; i < validators.length; i++) {
                if (hasVoted[reportId][validators[i]]) {
                    if (voteCast[reportId][basename]) {
                        rewardValidator(validators[i]);
                    } else {
                        penalizeValidator(validators[i]);
                    }
                }
            }

            emit ReportValidated(reportId, rewardAmount);
        }
    }

    function rejectReport(
        uint256 reportId,
        string memory basename
    ) external onlyValidator(basename) {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(
            keccak256(abi.encodePacked(report.status)) ==
                keccak256(abi.encodePacked("pending")),
            "Report already validated or rejected"
        );
        require(!hasVoted[reportId][basename], "You have already voted");

        report.rejectionCount++;
        hasVoted[reportId][basename] = true;

        if (report.rejectionCount > validatorThreshold) {
            report.status = "rejected";

            for (uint256 i = 0; i < validators.length; i++) {
                if (hasVoted[reportId][validators[i]]) {
                    if (voteCast[reportId][basename]) {
                        penalizeValidator(validators[i]);
                    } else {
                        rewardValidator(validators[i]);
                    }
                }
            }

            emit ReportRejected(reportId);
        }
    }

    function rewardValidator(string memory basename) internal {
        validatorReputation[basename]
            .reputationScore += pointsPerSuccessfulValidation;
        emit ReputationUpdated(
            basename,
            validatorReputation[basename].reputationScore
        );
    }

    function penalizeValidator(string memory basename) internal {
        validatorReputation[basename]
            .reputationScore -= pointsLostForFalseValidation;
        emit ReputationUpdated(
            basename,
            validatorReputation[basename].reputationScore
        );
    }

    function getReputation(
        string memory basename
    ) external view returns (uint256) {
        return validatorReputation[basename].reputationScore;
    }

    function likeReport(uint256 reportId) external {
        require(reportId <= reportCount, "Report does not exist");

        if (hasLiked[reportId][msg.sender]) {
            reports[reportId].likes--;
            hasLiked[reportId][msg.sender] = false;
        } else {
            reports[reportId].likes++;
            hasLiked[reportId][msg.sender] = true;
        }

        emit ReportLiked(reportId, msg.sender);
    }

    function getLikes(uint256 reportId) external view returns (uint256) {
        require(reportId <= reportCount, "Report does not exist");
        return reports[reportId].likes;
    }
}
