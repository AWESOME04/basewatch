// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrimeReport {

    struct Report {
        string basename;  // User's Basename (linked to their wallet)
        string crimeType; // Type of illegal activity (e.g., illegal mining)
        string description; // Short description of the activity
        uint256 timestamp; // Timestamp of when the report was submitted
    }

    // Array to store all reports
    Report[] public reports;

    // Event to emit when a new report is created
    event ReportSubmitted(string basename, string crimeType, string description, uint256 timestamp);

    // Function to submit a report
    function submitReport(string memory _basename, string memory _crimeType, string memory _description) public {
        // Create a new report
        Report memory newReport = Report({
            basename: _basename,
            crimeType: _crimeType,
            description: _description,
            timestamp: block.timestamp
        });

        // Store the report on-chain
        reports.push(newReport);

        // Emit event for off-chain tracking (optional)
        emit ReportSubmitted(_basename, _crimeType, _description, block.timestamp);
    }

    // Function to get the total number of reports
    function getTotalReports() public view returns (uint256) {
        return reports.length;
    }

    // Function to get a specific report by index
    function getReport(uint256 _index) public view returns (string memory, string memory, string memory, uint256) {
        require(_index < reports.length, "Report does not exist.");
        Report memory r = reports[_index];
        return (r.basename, r.crimeType, r.description, r.timestamp);
    }
}
