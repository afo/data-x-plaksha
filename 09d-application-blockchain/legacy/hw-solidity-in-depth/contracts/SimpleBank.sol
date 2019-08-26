pragma solidity ^0.4.13;


contract SimpleBank {

    /* Take a look @ the public keyword. 
    Why: We want to protect our users balance from modification*/
    mapping (address => uint) private balances;

    /* Let's make sure everyone knows who owns the bank. public is the appropriate keyword for this*/
    address public owner;

    // Events - publicize actions to external listeners
    /* Add 2 arguments for this event, an accountAddress and an amount */
    event LogDepositMade();

    // Modifier... 
    /* Create a modifier to check if a user is the owner. change 0x0 to the correct value*/
    modifier isOwner {if (owner != 0x0) {_;}}

    // Constructor, can receive one or many variables here; only one allowed
    function SimpleBank() {
        /* Set the owner to the creator of this contract */
    }

    /// @notice Enroll a customer with the bank, giving them 1000 tokens for free
    /// @return The balance of the user after enrolling
    /* Add our modifier to make sure only the owner can enroll new users */
    function enroll(address user) public returns (uint) { 
      /* Set the user's balance to 1000, return the user's balance */
    }

    /// @notice Deposit token into bank
    /// @return The balance of the user after the deposit is made
    function deposit(uint amount) public returns (uint) {
        /* Add the amount to the sender's balance, call the event associated with a deposit,
          then return the balance of the sender */
    }

    /// @notice Withdraw token from bank
    /// @dev This does not return any excess balance sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint) {
        /* If the sender's balance is at least the amount they want to withdraw,
           Subtract the amount from the sender's balance, and try to send that amount of token
           to the sender attempting to withdraw. IF the send fails, add the amount back to the sender's balance
           return the sender's balance.*/
    }

    /// @notice Get balance
    /// @return The balance of the user
    // ADD THE SPECIAL KEYWORD which prevents function from modifying state variables;
    // allows function to run locally/off blockchain
    function balance() returns (uint) {
        /* Get the balance of the sender of this transaction */
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
