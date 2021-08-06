import React, { useState } from 'react';
import './App.css';

function App() {
    
    const [transactions, setTransactions] = useState(3);
    
    function Form() {
        //Add inputs for multiple transactions
        const items = [];

        for (let i = 0; i < transactions; i++){
            items.push(
                <div style={{flexDirection: 'row', padding: '10px'}}>
                    <input value='Address Here' name='address' size='30'/>
                    <input value='amount' name='amount' size='5'/>
                </div>
            );
        }

        return (
            
            <form id="transactions">
                    {items}
                <input type='submit'/>
            </form>
        );
    }

    return ( 
    <div className="App">

        <header className="App-header">
            <h1>Multi sender App</h1>
            <p>
                Send any ERC20 token to multiple users now
            </p>
            <br/>

            <p>ERC20 TOKEN ADDRESS TO SEND </p>
            <input value='ERC20 token address to send' type='text' 
                name="ERC20" size='50'/>
            <br/>
            
            <p style={{marginTop: '20px'}}>Add Recipients Addresses and amount of money to send</p>
            <button style={{margin: '30px'}} onClick = {() => setTransactions(transactions + 1)}>
               | Add more people |
            </button>
            
            <Form/>
        </header>

    </div>
    );
}

export default App;
