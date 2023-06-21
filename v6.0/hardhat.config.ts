import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

// import './tasks/deploy';

dotenv.config();
const { API_URL, PRIVATE_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  //   hardhat: {
  //     mining: {
  //       auto: true,
  //       interval: 10000
  //     }
  //   },
  //   ropsten: {
  //     url: process.env.API_URL || '',
  //     accounts:
  //       process.env.PRIVATE_KEY !== undefined
  //         ? [process.env.PRIVATE_KEY]
  //         : []
  //   }
  // },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: 'USD'
  // },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
