const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
// require("dotenv").config();

const mnemonic = "various fold turn member draft century flight census motion tobacco large tuition";

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
   development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*"
   },
   rinkeby: {
       provider: function() { 
        return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/1be3984e363c42aaad5b986eabf050e3");
       },
       network_id: 4,
       gas: 4500000,
       gasPrice: 10000000000
   }
  }
 };