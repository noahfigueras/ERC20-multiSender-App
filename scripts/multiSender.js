const hre = require("hardhat");

async function main() {
  const tokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"; //LINK token Kovan

    //Deploy
    const Contract = await hre.ethers.getContractFactory("MultiSender");
    const contract = await Contract.deploy();
    console.log("Deploying contract ....");

    //Wait until deployment is successful
    await contract.deployed();
    console.log("Contract Deployed with address: ", contract.address);
    
    [owner, transfer1, transfer2, transfer3] = await hre.ethers.getSigners();
    const accounts = [owner, transfer1, transfer2, transfer3];

    //Get Token Contract
    const tokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function balanceOf(address) view returns(uint)",
        "function transfer(address to, uint amount)",
        "function approve(address spender, uint amount) returns(bool)",
        "function decimals() view returns (uint8)"
    ]

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, owner);
    const decimals = await tokenContract.decimals();

    //Get Initial Balances
    let i = 0;
    for (let account of accounts) {
        console.log(
            `Account ${i} Init Balance is: `, 
            ethers.utils.formatUnits(await tokenContract.balanceOf(account.address), decimals),
            await tokenContract.symbol()
        );
        i++;
    }
    
     
    const recipients = [transfer1.address, transfer2.address, transfer3.address];
    const amounts = [5,10,20];
    
    //Approve amounts
    await tokenContract.approve(contract.address, ethers.utils.parseUnits(amounts.reduce((a, b) => a + b, 0).toString(),decimals));
    //Execute Multi transfer
    await contract.multiSender(recipients, amounts, tokenAddress);

    //Get Final Balances
    i = 0;
    for (let account of accounts) {
        console.log(
            `Account ${i} Final Balance is: `, 
            ethers.utils.formatUnits(await tokenContract.balanceOf(account.address),decimals),
            await tokenContract.symbol()
        );
        i++;
    }

}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
