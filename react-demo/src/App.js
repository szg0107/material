import React, {Component} from 'react';
import Nav from "./components/Nav";
import './styles/index.css'

class App extends Component {
    render() {
        return (
            <div className="app">
                {/*<Nav/>*/}
                {/*<Route component={Nav} />*/}
                <Nav/>
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        );
    };
}

export default App;
