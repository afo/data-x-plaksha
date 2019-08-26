pragma solidity ^0.4.13;


contract SimpleBank {

    mapping (address => uint) private balances;

    address public owner;

    // Events - publicize actions to external listeners
    event LogDepositMade(address accountAddress, uint amount);

    // Constructor, can receive one or many variables here; only one allowed
    function SimpleBank() {
        owner = msg.sender;
    }

    /// @notice Enroll a customer with the bank, giving them 1000 tokens for free
    /// @return The balance of the user after enrolling
    function enroll() public returns (uint) { 
        balances[msg.sender] = 1000;
        return balances[msg.sender];
    }

    /// @notice Deposit token into bank
    /// @return The balance of the user after the deposit is made
    function deposit(uint amount) public returns (uint) {
        balances[msg.sender] += amount;

        LogDepositMade(msg.sender, amount); // fire event

        return balances[msg.sender];
    }

    /// @notice Withdraw token from bank
    /// @dev This does not return any excess balance sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        if (balances[msg.sender] >= withdrawAmount) {
            balances[msg.sender] -= withdrawAmount;
        }
        return balances[msg.sender];
    }

    /// @notice Get balance
    /// @return The balance of the user
    // 'constant' prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance() constant returns (uint) {
        return balances[msg.sender];
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function () {
        revert();
    }
}
