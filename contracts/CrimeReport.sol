// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IllegalActivityTracker {
    struct Report {
        uint256 id;
        address reporter;
        string content;
        string reportType;
        string location; 
        string proof; 
        string status;
        uint256 timestamp;
    }


    uint256 public reportCount = 0;
    ERC20 public rewardToken; 
    uint256 public rewardAmount; 

    mapping(uint256 => Report) public reports;

    event ReportSubmitted(uint256 reportId, address indexed reporter);
    event ReportValidated(uint256 reportId, uint256 rewardAmount);
    event ReportRejected(uint256 reportId);

    constructor(ERC20 _rewardToken, uint256 _rewardAmount) {
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
    }

    function submitReport(string memory _content, string memory _reportType, string memory _location, string memory _proof) external {
        reportCount++;
        reports[reportCount] = Report(reportCount, msg.sender, _content, _reportType, _location, _proof, "pending", block.timestamp);
        
        emit ReportSubmitted(reportCount, msg.sender);
    }

    function validateReport(uint256 reportId) external {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(keccak256(abi.encodePacked(report.status)) == keccak256(abi.encodePacked("pending")), 
                "Report has already been validated or rejected");

        report.status = "verified";
        rewardToken.transfer(report.reporter, rewardAmount);

        emit ReportValidated(reportId, rewardAmount);
    }

    function rejectReport(uint256 reportId) external {
        require(reportId <= reportCount, "Report does not exist");
        Report storage report = reports[reportId];

        require(keccak256(abi.encodePacked(report.status)) == keccak256(abi.encodePacked("pending")),
                "Report cannot be rejected because it has already been validated or rejected");

        report.status = "rejected";

        emit ReportRejected(reportId);
    }

    function getReport(uint256 reportId) external view returns (Report memory) {
        require(reportId <= reportCount, "Report does not exist");
        return reports[reportId];
    }
}
