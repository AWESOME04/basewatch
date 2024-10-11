// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrimeReport {

    struct Report {
        string basename;  
        string crimeType; 
        string description;
        uint256 timestamp;
    }


    Report[] public reports;


    event ReportSubmitted(string basename, string crimeType, string description, uint256 timestamp);

    function submitReport(string memory _basename, string memory _crimeType, string memory _description) public {
        Report memory newReport = Report({
            basename: _basename,
            crimeType: _crimeType,
            description: _description,
            timestamp: block.timestamp
        });

        reports.push(newReport);

        emit ReportSubmitted(_basename, _crimeType, _description, block.timestamp);
    }

    function getTotalReports() public view returns (uint256) {
        return reports.length;
    }

    function getReport(uint256 _index) public view returns (string memory, string memory, string memory, uint256) {
        require(_index < reports.length, "Report does not exist.");
        Report memory r = reports[_index];
        return (r.basename, r.crimeType, r.description, r.timestamp);
    }
}
