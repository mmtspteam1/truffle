const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const infuraKey = "2b21394de8bb4457942f069131180f16";   // Replace with your Infura project ID
const mnemonic = "zero ankle prize mansion demise goose side ready enter fresh fancy maple";    // Replace with your wallet's mnemonic

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111,        // Sepolia's network ID
      gas: 4500000,                // Gas limit
      gasPrice: 10000000000,       // Gas price (10 gwei)
      confirmations: 2,            // Number of confirmations to wait between deployments
      timeoutBlocks: 200,          // Number of blocks to wait before timing out
      skipDryRun: true             // Skip dry run before migrations
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"             // Specify the Solidity compiler version
    }
  }
};
