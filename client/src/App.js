import React, { useState } from 'react';
import Details from './components/details.js'

import './App.css';

function App() {
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
        if(txState == state) {
            style.backgroundColor = 'blue';
        }
        return style;
    };

    function updateState() {
        if(txState == 2) {
            //Reset
            setTxState(0);
        } else {
            setTxState(txState + 1);
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
            {txState === 0 && <Details/>}
            <button onClick={updateState}>Continue</button>
        </header>

    </div>
    );
}

export default App;
