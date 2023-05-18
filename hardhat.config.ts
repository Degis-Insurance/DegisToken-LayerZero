import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

import "./tasks/index";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    avax: {
      url: process.env.AVAX_URL || "",
      accounts: {
        mnemonic:
          process.env.PHRASE_AVAX !== undefined ? process.env.PHRASE_AVAX : "",
        count: 20,
      },
    },
    arb: {
      url: process.env.ARB_URL,
      accounts: {
        mnemonic:
          process.env.PHRASE_AVAX !== undefined ? process.env.PHRASE_AVAX : "",
        count: 20,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
      rinkeby: "0x32eB34d060c12aD0491d260c436d30e5fB13a8Cd",
      fuji: 0,
      avax: 0,
      avaxTest: 0,
      arb: 0,
    },
    testAddress: {
      default: 1,
      localhost: 1,
      fuji: 1,
      avax: 1,
      avaxTest: 1,
      arb: 1,
    },
  },
};

export default config;
