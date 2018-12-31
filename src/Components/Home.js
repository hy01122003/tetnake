import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../logo.svg'
import Nav from './Nav';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.name !== '') {
            localStorage.setItem('name', this.state.name);
            this.setState({
                name: ''
            })
        }
    }
    onChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    render() {
        return (
            <div id="Home">
                <Nav page='Home' />
                {
                    localStorage.name !== undefined && 
                    <div id="welcome" className='container'>
                        <div className='row'>
                            <div className='col-md'>
                                <p id="welcome-title">Hi, { localStorage.name }</p>
                                <p class='welcome-body'>Chào mừng bạn đến với web app của tui</p>
                                <p class='welcome-body'>Đây là một game được làm từ Reactjs & Canvas</p>
                                <p class='welcome-body'>Game kết hợp giữa Tetris & Snake</p>   
                                <Link to='/game' className="btn btn-lg my-3 Try" >Try it now</Link>
                            </div>
                            <div className="col-md">
                                <img src={logo} alt='logo' className="App-logo" />
                            </div>
                        </div>
                    </div>
                }
                {
                    localStorage.name === undefined && 
                    <div class="col-4 mx-auto">
                        <form onSubmit={this.onSubmit} class='d-flex flex-row'>
                            <input 
                                id='input-name' 
                                class='mx-3 pl-2' 
                                placeholder="Your name is ...."
                                onChange={this.onChange} />
                            <button 
                                type='submit' 
                                class='btn btn-outline-warning'>
                                Submit
                            </button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Home;