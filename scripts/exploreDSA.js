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
  const dsaId = await dsa.getAccounts(address);

  dsa.setInstance(dsaId);

  //const impersonatedAddress = '0x20a2083Db6C9324aEf2fe094ef229E56ffef5A2C';

  // await hre.network.provider.request({
  //   method: "hardhat_impersonateAccount",
  //   params: [impersonatedAddress],
  // });

  // const impersonatedSigner = await ethers.getSigner(impersonatedAddress);

  // await impersonatedSigner.sendTransaction({
  //   to: address,
  //   value: '10000000000000000000'
  // })


  await hre.network.provider.send('hardhat_setBalance', [
    address,
    ethers.utils.parseEther('10.0').toHexString(),
  ])


  await dsa.build({
    gasPrice: "100000000000000000000",
    from: "0x51571107Cb5c25b3Ef36B714CBAd17F6F900B936",
  });

  let spells = await dsa.Spell();

  spells.add({
    connector: "compound",
    method: "deposit",
    args: [
      "0x0000000000000000000000000000000000000000",
      "1000000000000000000",
      0,
      0,
    ],
  });
  spells.add({
    connector: "aave",
    method: "deposit",
    args: [
      "0x0000000000000000000000000000000000000000",
      "1000000000000000000",
      0,
      0,
    ],
  });
  let txnHash = await spells.cast({
    gasPrice: "1000000000000000000",
    nonce: 0,
  });

  console.log(txnHash);
}
ExploringDSA();
