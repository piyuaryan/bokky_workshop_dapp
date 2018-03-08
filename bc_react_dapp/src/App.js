import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import http from 'http';
import Web3 from 'web3';

// we're accessing local blockchain
const web3 = new Web3("http://localhost:8646", http);

const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getId",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_fName",
                "type": "string"
            },
            {
                "name": "_age",
                "type": "uint256"
            }
        ],
        "name": "setId",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = "0x1647b1461251a0c6d3e14a227de0f16e36ba80b1";

const IdContract = new web3.eth.Contract(abi, contractAddress);

class App extends Component {

    state = {
        firstName: '',
        age: '',
        data: ['', '']
    };

    _setId = () => {
        console.log("Clicked.", IdContract);

        // IdContract.methods.setId(this.state.firstName, parseInt(this.state.age));

        // Above line wouldn't update the state on blockchain
        // to actually push the changes on Blockchain, we need ethers, account, unlock account, And Signing the transaction.
        // Current test env already has all accounts unlocked

        // So,
        IdContract.methods.setId(this.state.firstName, parseInt(this.state.age))
            .send({from: '0xa00af22d07c87d96eeeb0ed583f8f6ac7812827e'})
            .on('transactionHash', (tx) => console.log('TxHash: ', tx))
            .then(console.log)
            .catch((err) => console.log(err));
    };

    _getId = () => {
        IdContract.methods.getId().call()
            .then(data => this.setState({data: data}))
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">BC-React-Dapp</h1>
                </header>
                <div className="Container">
                    <p> # Set Data # </p>

                    <div className="Row">
                        <div className="Column">
                            <input onChange={(event) => this.setState({firstName: event.target.value})}/>
                            <p>{'Name: ' + this.state.firstName}</p>
                        </div>
                        <div className="Column">
                            <input onChange={(event) => this.setState({age: event.target.value})}/>
                            <p>{'Age: ' + this.state.age}</p>
                        </div>
                    </div>
                    <div className="Row">
                        <button onClick={() => this._setId()}>Set ID</button>
                    </div>

                    <p> # Get Data # </p>
                    <div className="Row">
                        <button onClick={() => this._getId()}>Get ID</button>
                    </div>
                    <div className="Row">
                        <div className="Column">
                            <p>{'Name: ' + this.state.data[0]}</p>
                        </div>
                        <div className="Column">
                            <p>{'Age: ' + this.state.data[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;