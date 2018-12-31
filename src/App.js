import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Components/Home'
import Game from './Components/Game'
import About from './Components/About'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/about' component={About} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
