require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

require('dotenv').config()
const privateKey = process.env.SECRET_KEY

module.exports = {
  networks: {
    hardhat:{
      forking:{
        url: 'https://eth-mainnet.alchemyapi.io/v2/'+privateKey
      },
      chainId: 1
    }  
  },
  solidity: "0.8.4",
};