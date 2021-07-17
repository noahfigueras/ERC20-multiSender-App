require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
task("accounts", "Print the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (let account of accounts) {
        console.log(account.address);
    }
});

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            forking: {
                url: process.env.ALCHEMY_URL_KOVAN,
            },
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
        },
        kovan: {
            url: process.env.ALCHEMY_URL_KOVAN,
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
            gas: "auto"
        }
    }
};
