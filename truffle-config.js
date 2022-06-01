// Requerir dotenv para la gestion de variables de entorno
const dotenv = require('dotenv');

// Instalación HDWalletProvider: npm i @truffle/hdwallet-provider
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Activamos la configuración de dotenv para la gestion de las variables de entorno
dotenv.config();

// Clave secreta: 12 palabras de la Wallet
const mnemonic = process.env.REACT_APP_MNEMONIC;

const ganacheTestnetUrl = process.env.REACT_APP_GANACHE_TESTNET_URL;
const bscTestnetUrl = process.env.REACT_APP_BSC_TESTNET_URL;
const maticTestnetUrl = process.env.REACT_APP_MATIC_TESTNET_URL;
const contractDirectory = process.env.REACT_APP_CONTRACTS_DIRECTORY;

module.exports = {
  networks: {
    // Ganache
    ganacheTestnet: {
      host: ganacheTestnetUrl,     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    // Binance Smart Chain: BSC
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, bscTestnetUrl, 1),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    // Polygon: MATIC
    maticTestnet: {
      provider: () => new HDWalletProvider(mnemonic, maticTestnetUrl, 1),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    }

  },

  mocha: {
    // timeout: 100000
  },

  contracts_build_directory: contractDirectory,

  compilers: {
    solc: {
      version: "0.8.1",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  db: {
    enabled: false
  }

};
