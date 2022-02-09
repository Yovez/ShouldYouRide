import React, { Component } from 'react'
import DarkModeSwitch from './DarkModeSwitch';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="Header flex flex-wrap justify-center flex-row pb-12 text-2xl">
                <span className="text-4xl">
                    <a href="#" className="no-underline">
                        <img src="logo192.png" className="w-16" alt="Logo" />Should You Ride?
                    </a>
                </span>
                <a href="/about" className="no-underline">About</a>
                <br />
                <DarkModeSwitch />
            </div >
        );
    }
}

export default Header;