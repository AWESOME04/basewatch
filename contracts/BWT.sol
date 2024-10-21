// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BWT is ERC20, ERC20Permit {
    constructor() ERC20("BWT", "BWT") ERC20Permit("BWT") {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }
}