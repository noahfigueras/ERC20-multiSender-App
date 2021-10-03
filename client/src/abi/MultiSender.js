//Multi Sender Contract
const contract = {
    address: '0xc5d956F4Bd1dC5D5975022542665F7Aa255040AF',
    abi: [
            {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address payable[]",
          "name": "addrs",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "multiSender",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }

    ]
}

export default contract;
