# BaseWatch: Illegal Activity Tracking System

BaseWatch is a decentralized platform built on the Base blockchain that enables users to report, track, and monitor illegal activities in Ghana, with a focus on environmental crimes such as illegal mining (galamsey) and deforestation. This project aims to increase transparency, encourage citizen participation, and assist authorities in identifying and addressing illegal activities more effectively.

![BaseWatch Logo](https://github.com/user-attachments/assets/856348a9-042e-4d10-8678-2ebe7793117a)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

BaseWatch addresses the critical need for a transparent and efficient system to combat illegal activities, particularly those harming the environment in Ghana. By leveraging blockchain technology, we provide a platform where:

- Citizens can anonymously report illegal activities
- Reports are immutably stored and cannot be tampered with
- Community-driven verification ensures the accuracy of reports
- Authorities can access real-time data for swift action

## Features

1. **User Registration & Authentication**
   - Wallet-based authentication using Base blockchain
   - User categories: General Users (reporters) and Validators

2. **Dashboard**
   - Feed of reported illegal activities
   - Categorized view of reports
   - "Report Illegal Activity" button

3. **Illegal Activity Reporting**
   - User-friendly form for submitting reports
   - Photo and video evidence upload
   - Location selection (GPS or manual input)

4. **Interactive Map**
   - Integration with Google Maps API
   - Color-coded zones based on report density
   - Clickable markers for each reported location

5. **Report Verification**
   - Community-driven verification process
   - Staking mechanism for validators

6. **Legal Activity Registration**
   - Interface for authorized entities to register legal activities

7. **Token Incentivization**
   - Reward system for accurate reporting and validation

8. **Analytics Dashboard**
   - Visual representation of reporting trends
   - Hotspot analysis

## Technology Stack

- Blockchain: Base (Ethereum L2)
- Smart Contracts: Solidity
- Frontend: React.js
- Backend: .NET
- Database: MongoDB
- Map Integration: Open Street Map
- Wallet Integration: MetaMask, WalletConnect, Base
- Decentralized Storage: IPFS

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Serkhani/basewatch.git
   cd basewatch
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     ```

4. Compile smart contracts:
   ```
   npx hardhat compile
   ```

5. Deploy smart contracts:
   ```
   npx hardhat run scripts/deploy.js --network base
   ```

6. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Connect your wallet (MetaMask) to the Base network
2. Register as a user or validator
3. Report illegal activities or validate existing reports
4. Explore the interactive map to view reported incidents

## Smart Contracts

BaseWatch utilizes several smart contracts:

- `ReportRegistry.sol`: Manages the submission and storage of illegal activity reports
- `Verification.sol`: Handles the community-driven verification process
- `LegalActivityRegistry.sol`: Allows registration of legal activities
- `BaseWatchToken.sol`: ERC-20 token for incentivization


## Contributing

We welcome contributions to BaseWatch! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contributors

Evans Acheampong - https://github.com/AWESOME04
Farouk Sedick - https://github.com/sedfarouk
Boniface Delali Dakey - https://github.com/Serkhani
Samuel Adams - https://github.com/samuel2l


## Acknowledgements

- [Base Blockchain](https://base.org/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Hardhat](https://hardhat.org/)
- [Google Maps API](https://developers.google.com/maps)
- [IPFS](https://ipfs.io/)

---

Built with ❤️ for the Based Africa Hackathon