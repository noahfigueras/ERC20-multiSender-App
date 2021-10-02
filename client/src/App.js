import React, { useState } from 'react';
import {ethers} from 'ethers';
import Details from './components/details';

import './App.css';

function App() {
    //Ethers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

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

    const Contract = new ethers.Contract(contract.address, contract.abi, signer);

    //Token Contract
    let tokenContract;
    let tokenDecimals;
    const tokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function balanceOf(address) view returns(uint)",
        "function transfer(address to, uint amount)",
        "function approve(address spender, uint amount) returns(bool)",
        "function decimals() view returns (uint8)"
    ];

    const [erc20, setErc20] = useState('0xa36085f69e2889c224210f603d836748e7dc0088');
    const [recipients, setRecipients] = useState([]);

    //Tx Status
    const [txState, setTxState] = useState(0); 

    function statusBar(state) {
        const style = {
            height: '10px',
            width:'10px',
            borderRadius: '90%',
            border: 'solid 1px',
            backgroundColor: 'white',
            margin: '0 auto'
        }
        if(txState === state) {
            style.backgroundColor = 'blue';
        }
        return style;
    };

    async function updateState() {
        if(txState === 2) {
            //Reset
            setTxState(0);
        } else if(txState === 0){
            setTxState(txState + 1);
            tokenContract = new ethers.Contract(erc20,tokenAbi,signer);
            tokenDecimals = await tokenContract.decimals();
            //Approve amounts
            const amounts = recipients.map(x => Number(x.amount));
            console.log(amounts);
            await tokenContract.approve(contract.address, ethers.utils.parseUnits(amounts.reduce((a, b) => a + b, 0).toString(), tokenDecimals));
        }
    }

    return ( 
    <div className="App">

        <header className="App-header">
            <h1>Multi sender App</h1>
            <p>
                Send any ERC20 token to multiple users now
            </p>

            <div style={{display:'flex'}}>
                <div className='statusBar' style={{padding:'10px'}}>
                    <div style={statusBar(0)}></div>
                    <p>Details</p>
                </div>
                <div className='statusBar' style={{padding:'10px'}}>
                    <div style={statusBar(1)}></div>
                    <p>Approve</p>
                </div>
                <div className='statusBar' style={{padding:'10px'}}>
                    <div style={statusBar(2)}></div>
                    <p>Send</p>
                </div>
            </div>
            {txState === 0 && 
            <Details 
                tokenAddress={erc20} 
                setTokenAddress={erc20 => setErc20(erc20)}
                setRecievers={recipients => setRecipients(recipients)}
            />}
            {txState === 1 &&
            <p>Transaction is being approved...</p>
            }
            <button onClick={updateState}>Continue</button>
        </header>

    </div>
    );
}

export default App;
