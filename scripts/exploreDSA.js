const DSA = require('dsa-connect');

require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY



const dsa = new DSA({
  web3: web3,
  mode: "node",
  privateKey: privateKey
});





async function ExploringDSA(){
    await dsa.build({
      gasPrice: '0',
      from: '0x51571107Cb5c25b3Ef36B714CBAd17F6F900B936'
    })


    let spells =await dsa.Spell()

    spells.add({
      connector: 'compound',
      method: 'deposit',
      args: [
        '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
        '1000000000000000000',
        0,
        0
      ]
    })
    
    let txnHash = await spells.cast();

    console.log(txnHash);
}
ExploringDSA();