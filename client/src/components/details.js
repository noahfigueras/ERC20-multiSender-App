import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

function Details(props) {

    function getContent(e) {
        const maxLines = e.doc.lineCount();
        props.setRecievers([]);
        
        // Convert to json
        for(let i=0; i<maxLines; i++) {
            let line = e.doc.getLine(i);
            let [addr, amount] = line.split(',');
            props.setRecievers(oldArr => [...oldArr, {address: String(addr), amount: amount}]);
        }
    }

    return(
        <div>
            <p>ERC20 TOKEN ADDRESS TO SEND </p>
            <input 
            onChange={ e => props.setTokenAddress(e.target.value) }
            value={props.tokenAddress} 
            type='text' 
            name="ERC20" 
            size='50' 
            />
            <br/>
            
            <p style={{marginTop: '20px'}}>Add Recipients Addresses and amount of money to send</p>
            <div style={{height: '200px'}}>
                <CodeMirror
                      value= '0x6308F1c6f283583C8bf8E31Da793B87718b051eD, 10'
                      onChange= {(e) => {getContent(e)}}
                      style={{width:'50% !important'}}
                      options={{
                        theme: 'monokai',
                        keyMap: 'sublime',
                        lineNumbers: true,
                        mode: 'javascript',
                      }}
                />
            </div>
        </div>
    );
}

export default Details;
