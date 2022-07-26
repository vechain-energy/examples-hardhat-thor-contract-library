// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./libraries/LibExample.sol";

contract LibUser {
    // Deploying library using
    // "for" keyword
    using LibExample for uint256;

    // Calling function pow to
    // calculate power
    function getPow(uint256 num1, uint256 num2) public pure returns (uint256) {
        return num1.pow(num2);
    }
}
