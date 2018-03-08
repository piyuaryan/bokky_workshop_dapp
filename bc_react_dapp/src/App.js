import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        firstName: '',
        age: 0
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">BC-React-Dapp</h1>
                </header>
                <div className="Container">
                    <div className="Row">
                        <div className="Column">
                            <input onChange={(event) => this.setState({firstName: event.target.value})}/>
                            <p>{this.state.firstName}</p>
                        </div>
                        <div className="Column">
                            <input onChange={(event) => this.setState({age: event.target.value})}/>
                            <p>{this.state.age}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
