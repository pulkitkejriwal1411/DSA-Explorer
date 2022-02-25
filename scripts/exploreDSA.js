const hre = require('hardhat')
const DSA = require("dsa-connect");
const { ethers } = hre



require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

const dsa = new DSA({
  web3: web3,
  mode: "node",
  privateKey: privateKey,
});

const address = "0x51571107Cb5c25b3Ef36B714CBAd17F6F900B936";

async function ExploringDSA() {
  
  await hre.network.provider.send('hardhat_setBalance', [
    address,
    ethers.utils.parseEther('272561000.0').toHexString(),
  ])


  await dsa.build({
    gasPrice: "1000000000000000000",
    from: "0x51571107Cb5c25b3Ef36B714CBAd17F6F900B936",
    authority: '0x51571107Cb5c25b3Ef36B714CBAd17F6F900B936',
    version: 2
  });


  const dsaId = await dsa.getAccounts(address);
  console.log(dsaId[0].id);

  dsa.setInstance(dsaId[0].id);

  let spells = await dsa.Spell();


  console.log(spells);

  spells.add({
    connector: "COMPOUND-A",
    method: "deposit",
    args: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "1000000000000000000",
      0,
      0,
    ],
  });



  

  spells.add({
    connector: "AAVE-V2-A",
    method: "deposit",
    args: ["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "1000000000000000000", 0, 0]
  });
  


  let txnHash = await spells.cast({
    gasPrice: "1000000000000000000",
    nonce: 0,
  });

  console.log(txnHash);
}
ExploringDSA();
